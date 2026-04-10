import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { Resend } from "resend";
import clientConfig from "@/sanity/config/clientConfig";

const sanityWriteClient = createClient({
  ...clientConfig,
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { formData, formTitle, notificationEmail, fieldLabels = {}, recaptchaToken } = body;

    // Honeypot check — bots fill this field, humans don't
    if (formData._honeypot) {
      return NextResponse.json({ success: true });
    }

    // reCAPTCHA v3 verification
    if (recaptchaToken) {
      const settings = await sanityWriteClient.fetch(
        `*[_type == "site_settings"][0]{ recaptcha_secret_key, recaptcha_min_score }`
      );
      const secretKey = settings?.recaptcha_secret_key;
      const minScore = settings?.recaptcha_min_score ?? 0.3;
      if (secretKey) {
        const verifyRes = await fetch(
          `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`,
          { method: "POST" }
        );
        const verifyData = await verifyRes.json();
        if (!verifyData.success || verifyData.score < minScore) {
          return NextResponse.json(
            { success: false, error: "reCAPTCHA verification failed" },
            { status: 400 }
          );
        }
      }
    }

    // Build field list excluding internal fields
    const internalFields = ["_honeypot", "page_url"];
    const fields = Object.entries(formData)
      .filter(([key]) => !internalFields.includes(key))
      .map(([name, value]) => ({
        _key: name,
        name,
        value: Array.isArray(value)
          ? value.map((v) => (typeof v === "object" ? v.label ?? v.value : v)).join(", ")
          : typeof value === "object" && value !== null
          ? value.label ?? value.value ?? JSON.stringify(value)
          : String(value ?? ""),
      }));

    const submittedAt = new Date().toISOString();

    // Store in Sanity
    await sanityWriteClient.create({
      _type: "formSubmission",
      form_title: formTitle || "Form Submission",
      notification_email: notificationEmail,
      page_url: formData.page_url || "",
      submitted_at: submittedAt,
      fields,
    });

    // Build email HTML using labels where available, falling back to field name
    const fieldsHtml = fields
      .map((f) => {
        const label = fieldLabels[f.name] || f.name;
        return `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;color:#555;width:35%;vertical-align:top">${label}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#333;vertical-align:top">${f.value}</td>
        </tr>`;
      })
      .join("");

    const submittedAtCT = new Date(submittedAt).toLocaleString("en-US", {
      timeZone: "America/Chicago",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const emailHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <div style="margin-bottom:20px;padding-bottom:16px;border-bottom:2px solid #eee">
          <img src="https://cdn.sanity.io/images/l0za69l5/production/bca4ca7fbdfc8fffb71861187884056a822530a1-1925x1926.png" alt="Janoova" width="36" height="36" style="border-radius:8px;display:inline-block;vertical-align:middle;margin-right:12px" />
          <span style="font-size:15px;font-weight:600;color:#333;line-height:38px;vertical-align:middle">Janoova Forms</span>
        </div>
        <h2 style="color:#333;margin-top:0;margin-bottom:12px">New Form Submission</h2>
        <p style="color:#666;margin-bottom:20px">
          <strong>Form:</strong> ${formTitle || "—"}<br/>
          <strong>Page:</strong> ${formData.page_url || "—"}<br/>
          <strong>Submitted:</strong> ${submittedAtCT} CT
        </p>
        <table style="width:100%;border-collapse:collapse;border:1px solid #eee;border-radius:8px;overflow:hidden">
          ${fieldsHtml}
        </table>
        <p style="color:#aaa;font-size:12px;margin-top:24px">Sent by Janoova Forms</p>
      </div>
    `;

    // Support comma-separated notification emails
    const recipients = notificationEmail
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);

    // Send email via Resend
    await resend.emails.send({
      from: "Janoova Forms <forms@janoova.com>",
      to: recipients,
      subject: `New submission: ${formTitle || "Form"}`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Form submission error:", err);
    return NextResponse.json(
      { success: false, error: "Submission failed" },
      { status: 500 }
    );
  }
}
