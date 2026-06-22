"use client";

/**
 * Dev-only Agentation wrapper.
 *
 * Agentation is a visual-feedback / annotation tool for AI coding agents.
 * It requires DOM access and must run client-side only, so we load it via
 * `next/dynamic` with `ssr: false`. The outer component is also gated by
 * `process.env.NODE_ENV === "development"` so it never ships to production.
 *
 * Docs: https://www.agentation.com/install
 */
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import the Agentation component, client-only.
const Agentation = dynamic(
  () => import("agentation").then((mod) => mod.Agentation),
  {
    ssr: false,
    // Avoid loading anything on the server.
    loading: () => null,
  }
);

export function AgentationDev() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable in development. This double-guards the layout-level
    // NODE_ENV check and is resilient to accidental misuse of this component.
    if (process.env.NODE_ENV === "development") {
      setEnabled(true);
    }
  }, []);

  if (!enabled) return null;

  return (
    <Agentation
      // Optional: point at a local MCP server if you want real-time
      // annotation syncing with your AI agent. Leave undefined for
      // basic standalone use.
      // endpoint="http://localhost:4747"
      // onSessionCreated={(sessionId) => console.log("Agentation session:", sessionId)}
    />
  );
}
