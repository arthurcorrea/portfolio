"use client";

import { useTranslations } from "next-intl";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiLaravel,
  SiPhp,
  SiPostgresql,
  SiDocker,
  SiLinux,
  SiSqlite,
  SiMongodb,
  SiRedis,
} from "react-icons/si";
import { FaAws, FaPowerOff } from "react-icons/fa";
import {
  TbApi,
  TbBrandReactNative,
  TbCloudDataConnection,
} from "react-icons/tb";
import { FaGitAlt } from "react-icons/fa";
import { Terminal, Layout, Server, Smartphone } from "lucide-react";

// Configuração técnica (Ícones e Cores)
const SKILLS_CONFIG = {
  web: {
    icon: Layout,
    items: [
      { id: "react", Icon: SiReact, brand: "#06B6D4" },
      { id: "nextjs", Icon: SiNextdotjs, brand: "#A855F7" },
      { id: "typescript", Icon: SiTypescript, brand: "#3178C6" },
      { id: "tailwind", Icon: SiTailwindcss, brand: "#06B6D4" },
    ],
  },
  mobile: {
    icon: Smartphone,
    items: [
      { id: "reactnative", Icon: TbBrandReactNative, brand: "#61DAFB" },
      { id: "offline", Icon: FaPowerOff, brand: "#FA3D20" },
      { id: "sqlite", Icon: SiSqlite, brand: "#003B57" },
      { id: "sync", Icon: TbCloudDataConnection, brand: "#A855F7" },
    ],
  },
  backend: {
    icon: Server,
    items: [
      { id: "nodejs", Icon: SiNodedotjs, brand: "#339933" },
      { id: "laravel", Icon: SiLaravel, brand: "#FF2D20" },
      { id: "postgres", Icon: SiPostgresql, brand: "#4169E1" },
      { id: "mongodb", Icon: SiMongodb, brand: "#339933" },
    ],
  },
  devops: {
    icon: Terminal,
    items: [
      { id: "docker", Icon: SiDocker, brand: "#2496ED" },
      { id: "aws", Icon: FaAws, brand: "#FF9900" },
      { id: "redisrabbitmq", Icon: SiRedis, brand: "#F05032" },
      { id: "git", Icon: FaGitAlt, brand: "#F05032" },
    ],
  },
};

function SkillCard({
  groupKey,
  data,
  t,
}: {
  groupKey: string;
  data: any;
  t: any;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    x.set(mouseXPos / width - 0.5);
    y.set(mouseYPos / height - 0.5);

    setSpotlight({ x: mouseXPos, y: mouseYPos, opacity: 1 });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  };

  const GroupIcon = data.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full rounded-2xl border border-primary/30 bg-secondary/10 p-8 shadow-xl transition-colors duration-500 hover:border-primary/50 hover:bg-secondary/20"
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(400px circle at ${spotlight.x}px ${spotlight.y}px, hsl(var(--primary) / 0.15), transparent 80%)`,
        }}
      />

      <div style={{ transform: "translateZ(30px)" }} className="relative z-10">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <GroupIcon size={18} />
          </div>
          <h3 className="text-sm font-bold tracking-widest text-foreground uppercase">
            {t(`skillGroups.${groupKey}`)}
          </h3>
        </div>

        <ul className="space-y-4">
          {data.items.map((skill: any) => (
            <li
              key={skill.id}
              className="group relative flex items-center gap-4 cursor-default"
              style={{ "--skill-color": skill.brand } as React.CSSProperties}
            >
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border/50 bg-background transition-all duration-300 group-hover:scale-110 group-hover:border-[var(--skill-color)] group-hover:shadow-[0_0_15px_var(--skill-color)]">
                <skill.Icon
                  size={18}
                  className="text-muted-foreground transition-colors duration-300 group-hover:text-[var(--skill-color)]"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                  {t(`skills.${skill.id}.name`)}
                </span>
                {/* <span className="text-xs text-muted-foreground leading-relaxed group-hover:text-foreground/70 transition-colors">
                  {t(`skills.${skill.id}.desc`)}
                </span> */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

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
