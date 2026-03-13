import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Architect Web Studio — Custom Web Design & Development | DFW, TX",
  description:
    "Custom websites engineered to convert. Architect Web Studio designs and builds high-performance websites for businesses in Dallas-Fort Worth and beyond. Fast load times, SEO-optimized, no templates.",
  keywords: [
    "web design Dallas",
    "web developer Fort Worth",
    "custom website design DFW",
    "business website developer Texas",
    "web development Dallas-Fort Worth",
    "small business website design",
    "e-commerce website developer",
    "SEO web design Texas",
    "responsive web design",
    "Architect Web Studio",
    "Next.js developer",
    "landing page design DFW",
    "website redesign Dallas",
    "local business website",
    "professional web developer",
  ],
  authors: [{ name: "Architect Web Studio" }],
  creator: "Architect Web Studio",
  publisher: "Architect Web Studio",
  openGraph: {
    title: "Architect Web Studio — Custom Web Design & Development",
    description:
      "Your website should be your best salesperson. We design and build custom websites that look stunning, load fast, and convert visitors into paying customers.",
    type: "website",
    locale: "en_US",
    siteName: "Architect Web Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Architect Web Studio — Custom Web Design & Development",
    description:
      "Custom websites engineered to convert. High-performance web design and development for businesses in DFW, TX.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: "https://marcelish.github.io/webdev/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Architect Web Studio",
  description: "Custom web design and development studio building high-performance websites for businesses. SEO-optimized, responsive, and engineered to convert visitors into customers.",
  url: "https://marcelish.github.io/webdev/",
  telephone: "+19367039030",
  email: "SalazarHMarcel@gmail.com",
  founder: {
    "@type": "Person",
    name: "Marcel Salazar",
    jobTitle: "Founder & Lead Developer",
    sameAs: ["https://www.linkedin.com/in/marcelhsalazar/", "https://github.com/marcelish"],
  },
  address: { "@type": "PostalAddress", addressLocality: "Dallas-Fort Worth", addressRegion: "TX", addressCountry: "US" },
  areaServed: [
    { "@type": "City", name: "Dallas" },
    { "@type": "City", name: "Fort Worth" },
    { "@type": "City", name: "Arlington" },
    { "@type": "City", name: "Plano" },
    { "@type": "City", name: "Irving" },
    { "@type": "Place", name: "Dallas-Fort Worth Metroplex" },
  ],
  priceRange: "$$ - $$$",
  serviceType: ["Custom Web Design", "Web Development", "Search Engine Optimization", "E-Commerce Development", "Landing Page Design", "Website Redesign", "Website Maintenance"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web Design Packages",
    itemListElement: [
      { "@type": "Offer", name: "Starter Package", price: "2500", priceCurrency: "USD", description: "Up to 5 pages, responsive design, basic SEO, 2-week delivery" },
      { "@type": "Offer", name: "Business Package", price: "5500", priceCurrency: "USD", description: "Up to 12 pages, premium design, advanced SEO, CMS, 4-week delivery" },
      { "@type": "Offer", name: "Premium Package", price: "9000", priceCurrency: "USD", description: "Unlimited pages, bespoke design, custom features, e-commerce, 6-8 week delivery" },
    ],
  },
  sameAs: ["https://www.linkedin.com/in/marcelhsalazar/", "https://github.com/marcelish"],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "47", bestRating: "5", worstRating: "1" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
