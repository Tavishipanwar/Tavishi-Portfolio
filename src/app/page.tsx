"use client";

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import ProductGame from "@/components/ProductGame";
import Process from "@/components/Process";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PageTitle from "@/components/PageTitle";
import EasterEggs from "@/components/EasterEggs";
import ChatAssistant from "@/components/ChatAssistant";

export default function Home() {
  return (
    <>
      <PageTitle />
      <Navigation />
      <EasterEggs />
      <main>
        <Hero />
        <About />
        <Projects />
        <ProductGame />
        <Process />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ChatAssistant />
    </>
  );
}
