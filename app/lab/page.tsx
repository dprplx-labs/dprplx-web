import type { Metadata } from "next";
import IntroSequence from "@/app/components/IntroSequence";
import Nav from "@/app/components/Nav";
import Hero from "@/app/components/Hero";
import Philosophy from "@/app/components/Philosophy";
import Portfolio from "@/app/components/Portfolio";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "dprplx Lab — Software distilled to its essence",
  description:
    "A focused portfolio of software products, each built by dprplx. Each one shaped by a single principle: the beauty of simplicity.",
};

export default function Lab() {
  return (
    <IntroSequence>
      <Nav />
      <main>
        <Hero
          eyebrow="PORTFOLIO CO. · EST. 2026"
          line1="Software distilled"
          line2="to its essence."
          subhead="dprplx builds a focused portfolio of software products. Each one shaped by a single principle: the beauty of simplicity."
        />
        <Philosophy />
        <Portfolio />
      </main>
      <Footer />
    </IntroSequence>
  );
}
