"use client";

import { useTranslations } from "next-intl";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function Hero() {
  const t = useTranslations("Hero");
  const roles = t.raw("roles") as string[];

  const [roleIndex, setRoleIndex] = useState(0);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    roles[roleIndex].slice(0, latest),
  );

  useEffect(() => {
    const controls = animate(count, roles[roleIndex].length, {
      type: "tween",
      duration: 1.5,
      ease: "easeInOut",
      onComplete: () => {
        setTimeout(() => {
          count.set(0);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 2000);
      },
    });
    return controls.stop;
  }, [roleIndex, count, roles]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const btnRef = useRef<HTMLAnchorElement>(null);
  const [btnMousePos, setBtnMousePos] = useState({ x: 0, y: 0 });
  const handleBtnMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setBtnMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen flex flex-col justify-center py-32 items-center bg-background text-foreground overflow-hidden px-6"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary) / 0.08), transparent 80%)`,
        }}
      />

      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.2)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.2)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-4xl"
      >
        <p className="text-primary font-mono mb-4 text-sm md:text-base font-semibold tracking-wide uppercase">
          {t("greeting")}
        </p>

        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 tracking-tighter text-foreground drop-shadow-sm">
          {t("name")}
        </h1>

        <div className="text-2xl md:text-4xl lg:text-4xl font-semibold text-foreground/80 mb-8 h-14 flex items-center justify-center">
          <motion.span>{displayText}</motion.span>
          <motion.span
            variants={{
              blinking: {
                opacity: [0, 1, 0],
                transition: { duration: 0.8, repeat: Infinity },
              },
            }}
            animate="blinking"
            className="inline-block ml-1 md:ml-2 w-1 md:w-1.5 h-8 md:h-12 bg-primary rounded-full shadow-[0_0_8px_hsl(var(--primary))]"
          />
        </div>

        <p className="text-base md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          {t("description")}
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <motion.a
            ref={btnRef}
            href="#projects"
            onMouseMove={handleBtnMouseMove}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg px-8 py-4 font-bold tracking-wide text-foreground bg-primary/90 shadow-lg outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            <span
              className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: `radial-gradient(120px circle at ${btnMousePos.x}px ${btnMousePos.y}px, hsl(var(--foreground) / 0.3), transparent 100%)`,
              }}
            />
            <span className="relative z-10">{t("ctaProjects")}</span>
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative px-8 py-4 rounded-lg font-bold tracking-wide text-muted-foreground border border-border/80 bg-transparent transition-all duration-300 hover:text-primary hover:border-primary/50 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            {t("ctaContact")}
          </motion.a>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground opacity-60 pointer-events-none"
      >
        <div className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex justify-center p-1">
          <motion.div className="w-1.5 h-2.5 bg-muted-foreground/80 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
