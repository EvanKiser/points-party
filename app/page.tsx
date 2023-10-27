import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
// import FAQ from "@/components/FAQ";
import Testimonials3 from "@/components/Testimonials3";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Testimonials3 />
        <Pricing />
        {/* <FAQ /> */}
        <CTA />
        <Footer />
      </main>
    </>
  );
}
