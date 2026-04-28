import Nav from "@/app/components/Nav";
import Hero from "@/app/components/Hero";
import Philosophy from "@/app/components/Philosophy";
import Portfolio from "@/app/components/Portfolio";
import Contact from "@/app/components/Contact";
import Footer from "@/app/components/Footer";
import IntroSequence from "@/app/components/IntroSequence";

export default function Home() {
  return (
    <IntroSequence>
      <Nav />
      <main>
        <Hero />
        <Philosophy />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </IntroSequence>
  );
}
