// import type { Metadata } from "next";
// import { Toaster } from 'react-hot-toast';
// import "./globals.css";

// export const metadata: Metadata = {
//   title: "Ficer",
//   description: "Professional Quiz Platform — Create, share, and track quizzes.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className="antialiased">
//         <Toaster
//           position="top-right"
//           reverseOrder={false}
//           gutter={10}
//           containerStyle={{ top: 16, right: 16 }}
//           toastOptions={{
//             duration: 3500,
//             style: {
//               background: '#0e0e18',
//               color: 'rgba(255,255,255,0.88)',
//               border: '1px solid rgba(255,255,255,0.08)',
//               borderRadius: '14px',
//               fontSize: '13px',
//               fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif",
//               fontWeight: '500',
//               padding: '12px 16px',
//               boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
//               maxWidth: '360px',
//             },
//             success: {
//               duration: 3500,
//               iconTheme: { primary: '#34d399', secondary: '#0a1410' },
//               style: {
//                 background: '#0a1410',
//                 border: '1px solid rgba(52,211,153,0.25)',
//               },
//             },
//             error: {
//               duration: 4500,
//               iconTheme: { primary: '#f87171', secondary: '#140a0a' },
//               style: {
//                 background: '#140a0a',
//                 border: '1px solid rgba(239,68,68,0.25)',
//               },
//             },
//             loading: {
//               style: {
//                 background: '#0e0e18',
//                 border: '1px solid rgba(255,255,255,0.08)',
//                 color: 'rgba(255,255,255,0.6)',
//               },
//             },
//           }}
//         />
//         {children}
//       </body>
//     </html>
//   );
// }






// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Toaster as SonnerToaster } from 'sonner';
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080810",
};

// Organization Schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "QuizForge",
  url: "https://quizforge.com",
  description: "Create online quizzes with AI. Platform for teachers and educators.",
  sameAs: ["https://twitter.com/quizforge"],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://quizforge.com"),
  title: {
    default: "QuizForge: Create Online Quizzes with AI",
    template: "%s | QuizForge",
  },
  description: "Create interactive quizzes with AI. Free online quiz maker for teachers and educators. Get real-time results and analytics.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "QuizForge: Create Online Quizzes with AI",
    description: "Free quiz maker for teachers. AI-powered assessments with real-time results.",
    url: "https://quizforge.com",
    siteName: "QuizForge",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "QuizForge: Create Online Quizzes with AI",
    description: "Free quiz maker for teachers. AI-powered assessments.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="antialiased">
        {/* ✅ Professional Sonner Toaster */}
        <SonnerToaster
          position="top-right"
          expand={false}
          richColors
          closeButton
          toastOptions={{
            style: {
              background: '#0e0e18',
              border: '1px solid rgba(52,211,153,0.2)',
              color: 'rgba(255,255,255,0.88)',
              borderRadius: '12px',
              fontSize: '13px',
              fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif",
              padding: '12px 16px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            },
            className: 'toast-custom',
          }}
        />
        {children}
      </body>
    </html>
  );
}