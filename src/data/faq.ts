/** FAQ content. Rendered on /faq and emitted as FAQPage JSON-LD for SEO. */
export type FaqItem = { question: string; answer: string; group: string };

export const faqs: FaqItem[] = [
  {
    group: "Getting started",
    question: "What's the difference between the Library and the Custom Safety Binder?",
    answer:
      "The Safety Document Library is a monthly subscription that gives you access to editable templates, toolbox talks, checklists, and forms you manage yourself. The Custom Safety Binder is a one-time, done-for-you service: you fill out an intake form and we build a binder customized with your company information and the forms that fit your work.",
  },
  {
    group: "Getting started",
    question: "Do I need both?",
    answer:
      "No. Many owners start with the Library to handle paperwork themselves. Others prefer the Custom Binder so it's built for them. You can also add the Library to a custom package if you want ongoing updates.",
  },
  {
    group: "Documents",
    question: "What formats do the documents come in?",
    answer:
      "Most documents are provided as editable Microsoft Word (DOCX) files and clean PDFs. Some logs and matrices are provided as Excel (XLSX) so you can sort and track easily.",
  },
  {
    group: "Documents",
    question: "Can I edit the documents and add my company name?",
    answer:
      "Yes. The templates are built to be edited. You can add your company name, logo, and adjust the content to match your work and your worksite.",
  },
  {
    group: "Documents",
    question: "How often is the library updated?",
    answer:
      "We add and refresh documents regularly. Starter plans receive monthly updates; Pro plans get priority updates and more industry-specific forms.",
  },
  {
    group: "Compliance",
    question: "Are these documents OSHA compliant?",
    answer:
      "These are general safety-document templates and educational resources. They are not legal advice and do not guarantee OSHA compliance or prevent citations, penalties, or injuries. You remain responsible for evaluating your worksite, training employees, keeping records, and meeting federal, state, and local requirements. Consult a qualified safety or legal professional when needed.",
  },
  {
    group: "Compliance",
    question: "Will this prevent fines or citations?",
    answer:
      "No tool can promise that. Well-organized, site-appropriate paperwork can help you stay prepared, but compliance depends on your actual worksite conditions, training, and practices — which are your responsibility.",
  },
  {
    group: "Custom Binder",
    question: "How long does a custom binder take?",
    answer:
      "Timelines depend on the package and how quickly we receive your intake details. After you submit the intake form, we'll confirm scope and provide an estimated delivery window.",
  },
  {
    group: "Custom Binder",
    question: "What do you need from me?",
    answer:
      "Just your intake form: your trade, the type of work you perform, the hazards and equipment involved, your crew size, and the states you operate in. The more detail you provide, the better the fit.",
  },
  {
    group: "Billing",
    question: "Can I cancel the subscription?",
    answer:
      "Yes. The Library is month-to-month and you can cancel anytime from your billing settings. You keep access through the end of your billing period.",
  },
  {
    group: "Billing",
    question: "Is the Custom Binder a subscription?",
    answer:
      "No. The Custom Safety Binder packages are one-time services. The Premium Safety System includes three months of document updates, and you can optionally add the Library separately.",
  },
];

export const faqGroups = Array.from(new Set(faqs.map((f) => f.group)));
