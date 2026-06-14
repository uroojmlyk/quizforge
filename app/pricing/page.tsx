


// app/pricing/page.tsx
import type { Metadata } from "next";
import PricingClient from "./PricingClient";
// ✅ Metadata with full SEO optimization
export const metadata: Metadata = {
  title: "AI Quiz Maker Pricing Plans for Teachers, Schools & Businesses | QuizForge",
  description: "Explore QuizForge pricing plans. Free AI quiz maker for teachers, Pro features with auto grading and analytics, and Team plans for schools and businesses. Start free.",
  keywords: [
    "AI quiz maker pricing",
    "quiz platform cost for teachers",
    "online quiz tool price comparison",
    "quiz maker pricing",
    "auto grading quiz pricing",
    "create quizzes online free",
    "quiz platform for teachers"
  ],
  alternates: {
    canonical: "https://quizforge-web.vercel.app/pricing",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "AI Quiz Maker Pricing Plans for Teachers & Schools | QuizForge",
    description: "Compare free and paid plans of QuizForge. Start creating quizzes with AI today. Free plan available with unlimited quizzes.",
    url: "https://quizforge-web.vercel.app/pricing",
    type: "website",
    siteName: "QuizForge",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "QuizForge Pricing Plans" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Quiz Maker Pricing Plans | QuizForge",
    description: "Compare free and paid plans of QuizForge. Start creating quizzes with AI today.",
    images: ["/og-image.png"],
  },
};

// ✅ FAQ Schema for Rich Results
const faqItems = [
  { q: 'Do participants need to create an account?', a: 'No. Participants just click the link and take the quiz no sign-up, no app download needed.' },
  { q: 'Can I try Pro for free?', a: 'Yes! Pro comes with a 14-day free trial. No credit card required to start.' },
  { q: 'What happens to my quizzes if I downgrade?', a: 'Your quizzes and results are preserved. Only your ability to create new ones beyond the free limit is paused.' },
  { q: 'Is my data safe?', a: 'Yes. QuizForge uses bank-level encryption and never sells your data. You own everything you create.' },
  { q: 'Can I switch plans anytime?', a: 'Absolutely. Upgrade or downgrade at any time. Changes take effect immediately.' },
  { q: 'Do you offer educational discounts?', a: 'Yes! Contact our sales team for special pricing for schools and non-profits.' },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": f.a
    }
  }))
};

// ✅ Pricing Schema with featureList and AggregateOffer
const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "QuizForge",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  description: "AI-powered quiz maker for teachers and businesses with auto grading and analytics.",
  featureList: [
    "AI quiz generator",
    "Auto grading system",
    "Live analytics dashboard",
    "Anti-cheat controls",
    "Export reports",
    "Class management"
  ],
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "0",
    highPrice: "29",
    priceCurrency: "USD",
    offerCount: "3",
    offers: [
      {
        "@type": "Offer",
        name: "Free Plan",
        price: "0",
        priceCurrency: "USD",
        description: "Perfect for individual teachers. Unlimited quizzes with basic analytics.",
      },
      {
        "@type": "Offer",
        name: "Pro Plan",
        price: "9",
        priceCurrency: "USD",
        description: "For power users. AI quiz generator, auto grading, live analytics, and more.",
      },
      {
        "@type": "Offer",
        name: "Team Plan",
        price: "29",
        priceCurrency: "USD",
        description: "For schools and businesses. Custom branding, SSO, audit logs, and dedicated support.",
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "1250",
  },
};

export default function Page() {
  return (
    <>
      <script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        id="pricing-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
      />
      <PricingClient />
    </>
  );
}