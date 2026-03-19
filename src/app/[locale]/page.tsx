import { useTranslations } from "next-intl";
import Hero from "@/src/components/sections/Hero";
import About from "@/src/components/sections/About";
import Experience from "@/src/components/sections/Experience";
import Education from "@/src/components/sections/Education";
import Projects from "@/src/components/sections/Projects";
import Contact from "@/src/components/sections/Contact";
import Navbar from "@/src/components/layout/Navbar";

export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Navbar />

      <Hero />
      <About />
      <Experience />
      <Education />
      <Projects />
      <Contact />
    </main>
  );
}
