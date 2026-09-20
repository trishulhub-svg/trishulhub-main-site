"use client";

/**
 * Agentation — live wrapper.
 *
 * Visual-feedback / annotation tool for AI coding agents.
 * Renders in BOTH development AND production, so the marker is available
 * on the live site. Component requires DOM access so it is loaded via
 * `next/dynamic` with `ssr: false`.
 *
 * Docs: https://www.agentation.com/install
 */
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/**
 * Agentation is an annotation widget for the OWNER (used to send page
 * feedback to the coding agent). Its floating settings panel is wider than a
 * phone viewport and had no place in front of real visitors.
 *
 * It now loads only when the URL carries `?agent=1` (or `#agent`), so the
 * owner can still annotate the live site while visitors never see it:
 *   https://trishulhub.com/?agent=1
 */
const Agentation = dynamic(
  () => import("agentation").then((mod) => mod.Agentation),
  {
    ssr: false,
    loading: () => null,
  }
);

export function AgentationLive() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setEnabled(params.get("agent") === "1" || window.location.hash === "#agent");
  }, []);

  if (!enabled) return null;

  return (
    <Agentation
      // Optional: point at a remote MCP server if you want real-time
      // annotation syncing with your AI agent. Leave undefined for
      // basic standalone use.
      // endpoint="http://localhost:4747"
      // onSessionCreated={(sessionId) => console.log("Agentation session:", sessionId)}
    />
  );
}
