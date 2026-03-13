import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Architect Web Studio — Custom Web Design & Development | DFW, TX",
  description:
    "Custom websites engineered to convert. Architect Web Studio designs and builds high-performance websites for businesses in Dallas-Fort Worth and beyond. Fast load times, SEO-optimized, no templates.",
  keywords: [
    "web design Dallas", "web developer Fort Worth", "custom website design DFW",
    "business website developer Texas", "web development Dallas-Fort Worth",
    "small business website design", "e-commerce website developer",
    "SEO web design Texas", "responsive web design", "Architect Web Studio",
    "Next.js developer", "landing page design DFW", "website redesign Dallas",
  ],
  authors: [{ name: "Architect Web Studio" }],
  creator: "Architect Web Studio",
  publisher: "Architect Web Studio",
  openGraph: {
    title: "Architect Web Studio — Custom Web Design & Development",
    description: "Your website should be your best salesperson. We design and build custom websites that look stunning, load fast, and convert visitors into paying customers.",
    type: "website", locale: "en_US", siteName: "Architect Web Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Architect Web Studio — Custom Web Design & Development",
    description: "Custom websites engineered to convert. High-performance web design and development for businesses in DFW, TX.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://marcelish.github.io/webdev/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Architect Web Studio",
  description: "Custom web design and development studio building high-performance websites for businesses.",
  url: "https://marcelish.github.io/webdev/",
  telephone: "+19367039030",
  email: "SalazarHMarcel@gmail.com",
  founder: { "@type": "Person", name: "Marcel Salazar", jobTitle: "Founder & Lead Developer" },
  address: { "@type": "PostalAddress", addressLocality: "Dallas-Fort Worth", addressRegion: "TX", addressCountry: "US" },
  areaServed: [
    { "@type": "City", name: "Dallas" }, { "@type": "City", name: "Fort Worth" },
    { "@type": "City", name: "Arlington" }, { "@type": "City", name: "Plano" },
  ],
  priceRange: "$$ - $$$",
  serviceType: ["Custom Web Design", "Web Development", "SEO", "E-Commerce Development"],
  hasOfferCatalog: {
    "@type": "OfferCatalog", name: "Web Design Packages",
    itemListElement: [
      { "@type": "Offer", name: "Starter", price: "2500", priceCurrency: "USD" },
      { "@type": "Offer", name: "Business", price: "5500", priceCurrency: "USD" },
      { "@type": "Offer", name: "Premium", price: "9000", priceCurrency: "USD" },
    ],
  },
  sameAs: ["https://www.linkedin.com/in/marcelhsalazar/", "https://github.com/marcelish"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Geist+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
