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

// Dynamically import the Agentation component, client-only.
const Agentation = dynamic(
  () => import("agentation").then((mod) => mod.Agentation),
  {
    ssr: false,
    loading: () => null,
  }
);

export function AgentationLive() {
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
