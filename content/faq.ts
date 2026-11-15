/**
 * FAQ item type. The homepage questions live in content/home.ts (faq), the partner questions in
 * content/partner.ts. Short, honest, no legal advice; intervals come from the risk assessment.
 */
export type FaqItem = {
  id: string;
  question: string;
  answer: string[];
};
