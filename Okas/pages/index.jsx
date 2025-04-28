import Layout from "../components/Layout";
import HeroSection from "../components/Homepage/HeroSection";
import WhyToChoose from "../components/Homepage/WhyToChoose";
import CTA from "../components/Homepage/CTA";
import CTA2 from "../components/Homepage/CTA2";
import BuySellRent from "../components/Homepage/BuySellRent";
import PropertyListing from "../components/Homepage/PropertyListing";
import AppraisalBenefits from "../components/Homepage/AppraisalBenefits";
import Head from "next/head";
import Review from "../components/Homepage/Review";
export default function Home() {
  const fullUrl =
  (typeof window !== "undefined" && window.location.href) || null;

  return (
    <Layout>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([{
              "@context": "https://schema.org",
              "@type": "Corporation",
              name: "Okas Property Group",
              alternateName: "Okas Property Group Melbourne",
              url: "https://okaspropertygroup.com.au/",
              logo: "https://okas.vercel.app/_next/static/image/public/assets/images/logo.eb7d1fc0937b81c4978b86ac966d0124.png",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "03 8390 0699",
                  contactType: "customer service",
                  areaServed: "AU",
                  availableLanguage: ["en", "Hindi"],
                },
                {
                  "@type": "ContactPoint",
                  telephone: "03 8390 0699",
                  contactType: "sales",
                  areaServed: "AU",
                  availableLanguage: ["en", "Hindi"],
                },
              ],
              sameAs: [
                "https://www.facebook.com/okaspropertygroup",
                "",
                "https://www.instagram.com/okaspropertygroup/",
                "https://www.youtube.com/channel/UCzTRelsBbcR_EgaGWbmF2-g",
                "https://www.linkedin.com/company/okas-property-group",
              ],
            }]),
          }}
        />
        <title>Okas Property Group - Real Estate Agency Melbourne</title>
        <meta
          property="og:title"
          content="Okas Property Group - Real Estate Agency Melbourne"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={fullUrl} />
        <meta
          property="og:description"
          content="Okas Property Group Is Local Real Estate Agency Having Experience In Buying , Selling And Renting House And Land. Our Expert Can Help You With All Your Real Estate Needs."
        />
        <meta
          property="description"
          content="Okas Property Group Is Local Real Estate Agency Having Experience In Buying , Selling And Renting House And Land. Our Expert Can Help You With All Your Real Estate Needs."
        />
        <meta
          property="og:image"
          content="https://okaspropertygroup.com.au/assets/images/link_preview.jpg"
        />
      </Head>
      <HeroSection />
      <BuySellRent />
      <PropertyListing />
      <Review />
      <WhyToChoose backgroundImage="/assets/images/why-choose-bg.png" />
      <CTA backgroundImage="/assets/images/quickly-contact-bg.jpg" />
      <AppraisalBenefits />
      <CTA2 />
    </Layout>
  );
}
