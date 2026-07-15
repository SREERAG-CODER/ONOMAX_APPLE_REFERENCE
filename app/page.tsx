import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DinerExperience from "@/components/DinerExperience";
import RobotsThinking from "@/components/RobotsThinking";
import BusinessIntelligence from "@/components/BusinessIntelligence";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

export default function Home() {
  return (
    <Providers>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <DinerExperience />
        <RobotsThinking />
        <BusinessIntelligence />
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </Providers>
  );
}