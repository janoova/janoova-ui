"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/wrappers/ThemeProvider";
import styles from "./BlockGallery.module.css";

const labels = { hero: "Heroes", feature: "Features", content: "Content", cta: "Calls to action", faq: "FAQs", partner: "Partners", stats: "Statistics", testimonial: "Testimonials", team: "Team", feed: "Article feeds" };

export default function BlockGallery({ blocks, previews }) {
  const [category, setCategory] = useState("all");
  const [previewMessage, setPreviewMessage] = useState("");
  const { isDark, toggleTheme } = useTheme();
  const categories = Object.keys(labels).filter((key) => blocks.some((block) => block.category === key));

  return (
    <main
      id="main-content"
      className={styles.gallery}
      onSubmitCapture={(event) => {
        event.preventDefault();
        event.stopPropagation();
        setPreviewMessage("This is a layout preview. No enquiry has been sent.");
      }}
      onClickCapture={(event) => {
        if (event.target.closest("a")) event.preventDefault();
      }}
    >
      <header className={styles.topbar}>
        <div className="container py-4">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h1 className="u__h2 mb-0">Janoova Block Library</h1>
            <button type="button" className={styles.utility} onClick={toggleTheme} aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}>{isDark ? <Sun size={18} /> : <Moon size={18} />}</button>
          </div>
          <div className={styles.categories} role="group" aria-label="Filter blocks by category">
            {["all", ...categories].map((key) => (
              <button type="button" key={key} aria-pressed={category === key} className={category === key ? styles.activeFilter : styles.filter} onClick={() => setCategory(key)}>
                {key === "all" ? "All blocks" : labels[key]} <span>{key === "all" ? blocks.length : blocks.filter((block) => block.category === key).length}</span>
              </button>
            ))}
          </div>
        </div>
      </header>
      {previewMessage && <p role="status" className="container py-3">{previewMessage}</p>}
      {blocks.map((block, index) => (
        <section key={block.id} aria-label={block.id} hidden={category !== "all" && block.category !== category}>
          <div className={styles.blockLabel}><div className="container py-3"><h2 className="u__h6 mb-0">{block.id}</h2></div></div>
          {previews[index]}
        </section>
      ))}
    </main>
  );
}
