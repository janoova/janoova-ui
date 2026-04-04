"use client";

import { useState, useMemo } from "react";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const CT_LOCALE_OPTS = {
  timeZone: "America/Chicago",
  dateStyle: "medium",
  timeStyle: "short",
};

function formatCT(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-US", CT_LOCALE_OPTS) + " CT";
}

function getFieldValue(fields, ...keys) {
  for (const key of keys) {
    const match = fields?.find((f) =>
      f.name.toLowerCase().includes(key.toLowerCase())
    );
    if (match?.value) return match.value;
  }
  return null;
}

function humanize(name) {
  return name.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function FormSubmissionsClient({ submissions }) {
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState({ from: undefined, to: undefined });
  const [formFilter, setFormFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const formNames = useMemo(() => {
    const names = [
      ...new Set(submissions.map((s) => s.form_title).filter(Boolean)),
    ];
    return names.sort();
  }, [submissions]);

  const today = new Date();

  const filtered = useMemo(() => {
    const terms = search.toLowerCase().split(/\s+/).filter(Boolean);
    const { from, to } = dateRange;

    return submissions.filter((s) => {
      if (formFilter !== "all" && s.form_title !== formFilter) return false;

      const submittedAt = new Date(s.submitted_at);
      if (from) {
        const fromStart = new Date(from);
        fromStart.setHours(0, 0, 0, 0);
        if (submittedAt < fromStart) return false;
      }
      if (to) {
        const toEnd = new Date(to);
        toEnd.setHours(23, 59, 59, 999);
        if (submittedAt > toEnd) return false;
      }

      if (terms.length === 0) return true;

      // Combine all field values + form title + page url into one searchable string
      // Every term must appear somewhere — handles "John Doe" across separate fields
      const haystack = [
        s.form_title,
        s.page_url,
        ...(s.fields?.map((f) => f.value) ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return terms.every((term) => haystack.includes(term));
    });
  }, [submissions, search, dateRange, formFilter]);

  return (
    <div className="min-h-screen p-6 md:p-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Form Submissions
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          {filtered.length} of {submissions.length} submission
          {submissions.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <Input
          placeholder="Search by name, email, any field…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-72"
        />

        {/* Quick-select pills */}
        {[
          { label: "Last 7 days", days: 7 },
          { label: "Last 30 days", days: 30 },
          { label: "Last 90 days", days: 90 },
        ].map(({ label, days }) => {
          const from = new Date(today);
          from.setDate(from.getDate() - days);
          const isActive =
            dateRange.from?.toDateString() === from.toDateString() &&
            dateRange.to?.toDateString() === today.toDateString();
          return (
            <button
              key={days}
              onClick={() => setDateRange({ from, to: new Date(today) })}
              className={cn(
                "text-xs px-3 py-1 rounded-full border transition-colors whitespace-nowrap",
                isActive
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-border hover:border-foreground hover:text-foreground"
              )}
            >
              {label}
            </button>
          );
        })}

        {/* Calendar range picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-56 justify-start text-left font-normal",
                !dateRange.from && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "MMM d, yyyy")} —{" "}
                    {format(dateRange.to, "MMM d, yyyy")}
                  </>
                ) : (
                  format(dateRange.from, "MMM d, yyyy")
                )
              ) : (
                <span>Filter by date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={(range) =>
                setDateRange(range ?? { from: undefined, to: undefined })
              }
              disabled={{ after: today }}
              numberOfMonths={2}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {dateRange.from && (
          <button
            onClick={() => setDateRange({ from: undefined, to: undefined })}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2 whitespace-nowrap"
          >
            Clear
          </button>
        )}
        {formNames.length > 1 && (
          <Select value={formFilter} onValueChange={setFormFilter}>
            <SelectTrigger className="w-52">
              <SelectValue placeholder="All forms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All forms</SelectItem>
              {formNames.map((name) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-48">Date</TableHead>
              <TableHead>Form</TableHead>
              <TableHead className="hidden md:table-cell">Name</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden lg:table-cell">Page</TableHead>
              <TableHead className="w-16"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground py-12"
                >
                  No submissions found.
                </TableCell>
              </TableRow>
            )}
            {filtered.map((s) => {
              const name = getFieldValue(s.fields, "name", "full_name");
              const firstName = getFieldValue(s.fields, "first_name");
              const lastName = getFieldValue(s.fields, "last_name");
              const displayName =
                name ||
                (firstName || lastName
                  ? [firstName, lastName].filter(Boolean).join(" ")
                  : null);
              const email = getFieldValue(s.fields, "email");
              let pageLabel = "—";
              try {
                pageLabel = s.page_url ? new URL(s.page_url).pathname : "—";
              } catch (_) {}

              return (
                <TableRow
                  key={s._id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => setSelected(s)}
                >
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {formatCT(s.submitted_at)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{s.form_title || "—"}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm">
                    {displayName || "—"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm">
                    {email || "—"}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                    {pageLabel}
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-primary underline underline-offset-2">
                      View
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Card */}
          <div
            className="relative z-10 w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-start justify-between p-6 pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {selected.form_title || "Submission"}
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  {formatCT(selected.submitted_at)}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="rounded-md p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors ml-4 shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            {/* Meta */}
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 text-sm text-gray-600">
              <span className="font-medium text-gray-800">Page: </span>
              {selected.page_url || "—"}
            </div>

            {/* Fields */}
            <div className="divide-y divide-gray-100">
              {selected.fields?.map((f) => (
                <div key={f.name} className="flex gap-4 px-6 py-3.5">
                  <span className="w-36 shrink-0 text-sm font-medium text-gray-500">
                    {humanize(f.name)}
                  </span>
                  <span className="text-sm text-gray-900 break-all">
                    {f.value || "—"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
