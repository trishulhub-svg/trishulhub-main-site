/**
 * Opening the chat widget from anywhere.
 *
 * The widget itself is loaded lazily (≈72KB), so other components must not
 * import from it just to trigger it — that would drag the whole module into
 * their bundles. They import this tiny module instead and the widget listens
 * for the event.
 */
export const CHAT_OPEN_EVENT = 'trishulhub:open-chat'

/** Ask the chat widget to open. Safe to call during SSR (no-op). */
export function openChatWidget(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(CHAT_OPEN_EVENT))
}
