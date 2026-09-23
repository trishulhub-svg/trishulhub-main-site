/**
 * Content shared between the Services page (a client component) and the server
 * route that emits FAQPage structured data.
 *
 * It lives outside the client component on purpose: values exported from a
 * `'use client'` module become client references on the server, so the page
 * cannot read them as plain data.
 */

export type ServiceFaq = { q: string; a: string }

export const SERVICES_FAQ: readonly ServiceFaq[] = [
  {
    q: 'How long does a typical project take?',
    a: 'A focused marketing website usually ships in 2–4 weeks. A custom dashboard or internal tool runs 4–8 weeks depending on scope, and mobile apps typically 6–12 weeks. You get a milestone plan before any work starts.',
  },
  {
    q: 'How is pricing structured?',
    a: 'We quote a fixed price per milestone, so you always know the cost before the next phase begins. Projects start at £1,500; larger platforms are quoted after a short discovery call.',
  },
  {
    q: 'Do you work with existing codebases?',
    a: 'Yes. We regularly take over Next.js, React, Node and serverless codebases — starting with a short audit so you know exactly what state things are in before committing.',
  },
  {
    q: 'Who owns the code and the data?',
    a: 'You do, entirely. Repositories are transferred to your organisation and we document the infrastructure so any competent team can pick it up later.',
  },
  {
    q: 'How do we communicate during the project?',
    a: 'A shared WhatsApp thread or Slack channel plus a short weekly call. You will see progress on a staging link rather than waiting for a big-bang reveal.',
  },
]
