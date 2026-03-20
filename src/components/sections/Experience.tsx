"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, Calendar, MapPin, ChevronRight } from "lucide-react";
import { useRef } from "react";
import ExperienceDecorator from "../_partials/ExperienceDecorator";

export default function Experience() {
  const t = useTranslations("Experience");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const jobKeys = ["versa", "fibron"];

  return (
    <section
      id="experience"
      className="relative w-full py-32 bg-background px-6 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[250px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <span className="text-primary font-mono text-sm font-bold tracking-[0.2em] uppercase mb-4 block">
            {t("subtitle")}
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            {t("title")}
          </h2>
        </motion.div>

        <div className="relative" ref={containerRef}>
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-border/40 md:-translate-x-1/2 rounded-full" />

          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-6 md:left-1/2 top-0 w-[2px] bg-linear-to-b from-primary/80 via-primary/60 to-primary/20 md:-translate-x-1/2 rounded-full z-10 origin-top shadow-[0_0_15px_rgba(var(--primary),0.5)]"
          />
          <div className="space-y-12 md:space-y-24">
            {jobKeys.map((key, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={key}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isLeft ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  <ExperienceDecorator
                    index={index}
                    isLeft={isLeft}
                    progress={scrollYProgress}
                    jobKeys={jobKeys}
                  />

                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="absolute left-6 md:left-1/2 w-5 h-5 bg-background border-4 border-primary rounded-full md:-translate-x-1/2 shadow-[0_0_15px_var(--primary)] z-20"
                    style={
                      {
                        "--primary": "hsl(var(--primary) / 0.6)",
                      } as React.CSSProperties
                    }
                  />

                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      duration: 0.6,
                      delay: 0.1,
                      type: "spring",
                      stiffness: 70,
                    }}
                    className={`w-full md:w-[45%] pl-8 md:pl-0 ${
                      isLeft ? "md:pr-12 lg:md:pr-8" : "md:pl-12 lg:md:pl-8"
                    }`}
                  >
                    <div className="group relative rounded-3xl border border-border/40 bg-secondary/5 p-8 transition-all duration-500 hover:border-primary/40 hover:bg-secondary/10 hover:shadow-[0_0_30px_hsl(var(--primary)/0.1)]">
                      <div className="absolute top-7 -left-3 md:hidden w-6 h-6 rotate-45 border-b border-l border-border/40 bg-background group-hover:border-primary/40 transition-colors z-10" />
                      <div
                        className={`hidden md:block absolute top-7 w-6 h-6 rotate-45 border-border/40 bg-background group-hover:border-primary/40 transition-colors z-10 ${
                          isLeft
                            ? "-right-3 border-t border-r"
                            : "-left-3 border-b border-l"
                        }`}
                      />

                      <div className="flex flex-col gap-4 mb-6">
                        <div className="flex flex-wrap items-center justify-between gap-y-3">
                          <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {t(`jobs.${key}.role`)}
                          </h3>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold border border-primary/20">
                            <Briefcase size={14} />
                            {t(`jobs.${key}.company`)}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground font-medium">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={16} className="text-primary/70" />
                            <span>{t(`jobs.${key}.period`)}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin size={16} className="text-primary/70" />
                            <span>{t(`jobs.${key}.location`)}</span>
                          </div>
                        </div>
                      </div>

                      <ul className="space-y-4 mt-8">
                        {(t.raw(`jobs.${key}.description`) as string[]).map(
                          (item, i) => (
                            <li
                              key={i}
                              className="flex gap-4 text-muted-foreground leading-relaxed group/li"
                            >
                              <span className="mt-1 flex shrink-0 h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover/li:bg-primary group-hover/li:text-primary-foreground">
                                <ChevronRight size={12} strokeWidth={3} />
                              </span>
                              <span className="transition-colors group-hover/li:text-foreground/90">
                                {item}
                              </span>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
