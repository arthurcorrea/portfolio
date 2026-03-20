"use client";

import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import {
  GraduationCap,
  Calendar,
  Users,
  MessageSquare,
  Lightbulb,
  Sparkles,
  Target,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const Meteor = () => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setKey((prev) => prev + 1), 2000);
    return () => clearInterval(interval);
  }, []);

  const config = useMemo(
    () => ({
      top: Math.random() * 30 + "%",
      left: Math.random() * 80 + 10 + "%",
      duration: 1.5 + Math.random() * 0.8,
    }),
    [key],
  );

  return (
    <AnimatePresence>
      <motion.div
        key={key}
        initial={{ x: 0, y: 0, opacity: 0 }}
        animate={{ x: -500, y: 500, opacity: [0, 1, 0] }}
        transition={{ duration: config.duration, ease: "linear" }}
        style={{
          position: "absolute",
          top: config.top,
          left: config.left,
          pointerEvents: "none",
        }}
      >
        <div className="relative h-[2px] w-[2px] rounded-full bg-white shadow-[0_0_10px_2px_#a855f7]">
          <div
            className="absolute top-1/2 left-0 h-[1px] w-[120px] -translate-y-1/2 bg-linear-to-r from-primary via-primary/20 to-transparent"
            style={{ transform: "rotate(315deg)", transformOrigin: "left" }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function Education() {
  const t = useTranslations("Education");

  const softSkills = useMemo(
    () => [
      { key: "communication", icon: MessageSquare, delay: 0 },
      { key: "problemSolving", icon: Lightbulb, delay: 0.5 },
      { key: "teamwork", icon: Users, delay: 0.8 },
      { key: "adaptability", icon: Sparkles, delay: 1.5 },
      { key: "results", icon: Target, delay: 0.3 },
    ],
    [],
  );

  return (
    <section
      id="education"
      className="relative w-full py-32 bg-background px-6 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="absolute inset-0 z-0">
        <Meteor />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-primary font-mono text-sm font-bold tracking-[0.2em] uppercase mb-4 block">
            {t("subtitle")}
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            {t("title")}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring", stiffness: 70 }}
          className="grid lg:grid-cols-[1fr_400px] gap-16 items-center group relative rounded-3xl border border-border/40 bg-secondary/5 p-8 md:p-12 transition-all duration-500 hover:border-primary/40 hover:bg-secondary/10 hover:shadow-[0_0_40px_hsl(var(--primary)/0.05)]"
        >
          <div>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-8 border border-primary/20 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
              <GraduationCap size={32} />
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-4">
              {t("degree")}
            </h3>
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
              <span className="text-primary/90 font-mono font-bold uppercase tracking-wider">
                {t("uni")}
              </span>
              <div className="flex items-center gap-2 text-sm">
                <Calendar size={16} />
                <span>{t("period")}</span>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed text-justify text-lg max-w-2xl">
              {t("description")}
            </p>
          </div>

          <div className="relative flex flex-col justify-center gap-6 py-4 min-h-[400px]">
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
              viewBox="0 0 400 400"
              fill="none"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M 320 30 L 80 110 L 320 190 L 80 270 L 320 350"
                stroke="url(#grad)"
                strokeWidth="2"
                strokeDasharray="12 8"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 4.5, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop
                    offset="0%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity="0.8"
                  />
                  <stop
                    offset="100%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity="0.2"
                  />
                </linearGradient>
              </defs>
            </svg>

            {softSkills.map((skill, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  animate={{ y: [0, -6, 0] }}
                  style={{ willChange: "transform" }}
                  className={`relative flex w-full ${isEven ? "justify-end" : "justify-start"} z-10`}
                >
                  <motion.div
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: skill.delay,
                    }}
                    className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-primary/20 bg-background/80 backdrop-blur-md shadow-lg hover:border-primary/50 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/60 hover:text-white transition-colors">
                      <skill.icon size={16} />
                    </div>
                    <span className="text-sm font-semibold text-foreground/90 whitespace-nowrap">
                      {t(`skills.${skill.key}`)}
                    </span>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
