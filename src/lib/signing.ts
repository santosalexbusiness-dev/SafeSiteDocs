/**
 * Per-document-type signing layout. Decides whether a document is signed by a
 * roster (toolbox talks / sign-in sheets / JHA crews) or by named signature
 * blocks (acknowledgments, forms, permits, approvals), and what header fields
 * to capture. Documents that aren't signed (indexes, tags, signs) return "none".
 */
export type SignKind = "roster" | "blocks" | "none";

export type SignConfig = {
  kind: SignKind;
  rosterLabel?: string;
  blocks?: string[];
  header: { id: string; label: string; default?: string }[];
};

export function getSignConfig(documentType: string, title: string): SignConfig {
  const topic = title.replace(/^Toolbox Talk:\s*/i, "");

  switch (documentType) {
    case "Toolbox Talk":
      return {
        kind: "roster",
        rosterLabel: "Attendees",
        header: [
          { id: "topic", label: "Topic", default: topic },
          { id: "date", label: "Date" },
          { id: "supervisor", label: "Supervisor / Presenter" },
          { id: "location", label: "Location / Jobsite" },
        ],
      };
    case "JHA/JSA":
      return {
        kind: "roster",
        rosterLabel: "Crew sign-on",
        header: [
          { id: "task", label: "Task / Job" },
          { id: "location", label: "Location" },
          { id: "date", label: "Date" },
          { id: "competent", label: "Competent person" },
        ],
      };
    case "Log":
      return {
        kind: "roster",
        rosterLabel: "Sign-in",
        header: [
          { id: "subject", label: "Subject", default: topic },
          { id: "date", label: "Date" },
          { id: "location", label: "Location" },
        ],
      };
    case "Acknowledgment":
      return { kind: "blocks", blocks: ["Employee", "Supervisor"], header: [{ id: "date", label: "Date" }] };
    case "Checklist":
      return {
        kind: "blocks",
        blocks: ["Inspected by", "Reviewed by"],
        header: [{ id: "area", label: "Area / Location" }, { id: "date", label: "Date" }],
      };
    case "Form":
      return {
        kind: "blocks",
        blocks: ["Completed by", "Reviewed by"],
        header: [{ id: "location", label: "Location / Project" }, { id: "date", label: "Date" }],
      };
    case "Permit":
      return { kind: "blocks", blocks: ["Authorized by"], header: [{ id: "permit", label: "Permit #" }, { id: "date", label: "Date" }] };
    case "Designation":
      return { kind: "blocks", blocks: ["Designated by", "Designated person"], header: [{ id: "date", label: "Date" }] };
    case "Minutes":
      return { kind: "blocks", blocks: ["Recorded by", "Approved by"], header: [{ id: "date", label: "Date" }] };
    case "Statement":
      return { kind: "blocks", blocks: ["Witness", "Received by"], header: [{ id: "date", label: "Date" }] };
    case "Report":
      return { kind: "blocks", blocks: ["Reported by", "Supervisor"], header: [{ id: "date", label: "Date" }] };
    case "Manual":
    case "Program":
    case "Plan":
    case "Procedure":
    case "Policy":
      return { kind: "blocks", blocks: ["Prepared by", "Approved by"], header: [{ id: "date", label: "Date" }] };
    case "Index":
    case "Tag":
    case "Sign":
      return { kind: "none", header: [] };
    default:
      return { kind: "blocks", blocks: ["Completed by"], header: [{ id: "date", label: "Date" }] };
  }
}
