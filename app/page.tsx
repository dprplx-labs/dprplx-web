import IntroSequence from "@/app/components/IntroSequence";
import Nav from "@/app/components/Nav";
import Hero from "@/app/components/Hero";
import Work from "@/app/components/Work";
import WhyItWorks from "@/app/components/WhyItWorks";
import Contact from "@/app/components/Contact";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <IntroSequence>
      <Nav />
      <main>
        <Hero
          eyebrow="AGENCY · EST. 2026"
          line1="We rebuild how"
          line2="businesses work."
          subhead="dprplx helps your business operate in the age of agents — leaner, clearer, and built to run itself."
        />
        <Work />
        <WhyItWorks />
        <Contact />
      </main>
      <Footer />
    </IntroSequence>
  );
}
