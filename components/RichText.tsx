import Image from "next/image";
import { type BlockNode, type InlineNode, type ListItemNode } from "@/lib/strapi";
import { theme as t } from "@/components/theme";

// ── Inline nodes ──────────────────────────────────────────────────────────────

function renderInline(nodes: InlineNode[]): React.ReactNode {
  return nodes.map((node, i) => {
    let el: React.ReactNode = node.text;
    if (node.bold) el = <strong key={i}>{el}</strong>;
    if (node.italic) el = <em key={i}>{el}</em>;
    if (node.underline) el = <u key={i}>{el}</u>;
    if (node.code)
      el = (
        <code
          key={i}
          style={{
            fontFamily: "monospace",
            background: t.surfaceAlt,
            padding: "2px 5px",
            borderRadius: 4,
          }}
        >
          {el}
        </code>
      );
    return <span key={i}>{el}</span>;
  });
}

// ── List item ─────────────────────────────────────────────────────────────────

function renderListItem(node: ListItemNode, i: number): React.ReactNode {
  return (
    <li
      key={i}
      style={{
        fontSize: 17,
        lineHeight: 1.65,
        color: t.inkSoft,
        paddingLeft: 20,
        position: "relative",
      }}
    >
      <span
        style={{
          position: "absolute",
          left: 0,
          top: "0.55em",
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: t.primary,
          display: "block",
        }}
        aria-hidden="true"
      />
      {renderInline(node.children)}
    </li>
  );
}

// ── Block ─────────────────────────────────────────────────────────────────────

function renderBlock(block: BlockNode, idx: number): React.ReactNode {
  switch (block.type) {
    case "heading": {
      const text = block.children.map((c) => c.text).join("");
      const id = text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      if (block.level === 2) {
        return (
          <h2
            key={idx}
            id={id}
            style={{
              fontFamily: t.fontDisplay,
              fontSize: "var(--fs-h2-md)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              margin: "2.5em 0 0.75em",
              color: t.ink,
            }}
          >
            {renderInline(block.children)}
          </h2>
        );
      }
      return (
        <h3
          key={idx}
          id={id}
          style={{
            fontFamily: t.fontDisplay,
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            margin: "2em 0 0.5em",
            color: t.ink,
          }}
        >
          {renderInline(block.children)}
        </h3>
      );
    }
    case "quote":
      return (
        <blockquote
          key={idx}
          style={{
            borderLeft: `3px solid ${t.primary}`,
            paddingLeft: 24,
            margin: "2em 0",
            color: t.inkSoft,
          }}
        >
          <p
            style={{
              fontFamily: t.fontDisplay,
              fontSize: 20,
              fontWeight: 400,
              lineHeight: 1.5,
              letterSpacing: "-0.015em",
              fontStyle: "italic",
              margin: 0,
            }}
          >
            {renderInline(block.children)}
          </p>
        </blockquote>
      );
    case "list":
      return (
        <ul
          key={idx}
          style={{
            paddingLeft: 0,
            listStyle: "none",
            margin: "1.5em 0",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {block.children.map((item, i) => renderListItem(item, i))}
        </ul>
      );
    case "image":
      return (
        <figure key={idx} style={{ margin: "2em 0" }}>
          <Image
            src={block.image.url}
            alt={block.image.alternativeText ?? ""}
            width={block.image.width}
            height={block.image.height}
            style={{ width: "100%", height: "auto", borderRadius: 8 }}
          />
        </figure>
      );
    case "code":
      return (
        <pre
          key={idx}
          style={{
            background: t.surfaceAlt,
            border: `1px solid ${t.line}`,
            borderRadius: 8,
            padding: "16px 20px",
            overflowX: "auto",
            margin: "1.5em 0",
            fontSize: 14,
            lineHeight: 1.6,
          }}
        >
          <code style={{ fontFamily: "monospace" }}>
            {block.children.map((c) => c.text).join("")}
          </code>
        </pre>
      );
    default:
      return (
        <p
          key={idx}
          style={{
            fontSize: 17,
            lineHeight: 1.75,
            color: t.inkSoft,
            margin: "1.25em 0",
          }}
        >
          {renderInline(
            (block as { type: "paragraph"; children: InlineNode[] }).children
          )}
        </p>
      );
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

interface RichTextProps {
  blocks: BlockNode[] | null | undefined;
  className?: string;
}

/**
 * Renders Strapi Blocks rich-text content as HTML.
 * Shared between the blog article page and the industry hero intro.
 */
export function RichText({ blocks, className }: RichTextProps) {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) return null;
  return (
    <div className={className}>
      {blocks.map((block, idx) => renderBlock(block, idx))}
    </div>
  );
}
