"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SKILLS_CONFIG } from "@/src/lib/constants/skills-config";
import SkillCard from "../cards/SkillCard";

export default function About() {
  const t = useTranslations("About");

  return (
    <section
      id="about"
      className="relative w-full py-32 bg-background px-6 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-primary font-mono text-sm font-bold tracking-[0.2em] uppercase mb-4 block">
            Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t("description")}
          </p>
        </motion.div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none opacity-50" />

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ perspective: "1500px" }}
        >
          {Object.entries(SKILLS_CONFIG).map(([group, data], idx) => (
            <motion.div
              key={group}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
            >
              <SkillCard groupKey={group} data={data} t={t} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
