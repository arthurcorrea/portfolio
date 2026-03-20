"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Lock, ArrowUpRight } from "lucide-react";
import {
  Project,
  PROJECTS_DATA,
  TAG_CONFIG,
} from "@/src/lib/constants/skills-config";

const ProjectPlaceholder = ({ project }: { project: Project }) => {
  const MainIcon = project.icon;

  return (
    <div className="relative w-full h-full bg-secondary/10 flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px), 
            linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute w-40 h-40 bg-primary/20 blur-[60px] rounded-full"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="relative z-10 p-6 rounded-3xl bg-background/40 backdrop-blur-xl border border-primary/20 text-primary shadow-2xl group-hover:scale-110 group-hover:bg-primary/40 group-hover:text-white transition-all duration-500"
      >
        <MainIcon size={48} strokeWidth={1} />
      </motion.div>
    </div>
  );
};

export default function Projects() {
  const t = useTranslations("Projects");

  return (
    <section
      id="projects"
      className="relative w-full py-32 bg-background px-6 overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
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

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {PROJECTS_DATA.map((project, index) => {
            const Icon = project.icon;
            const tags = t.raw(`items.${project.id}.tags`) as string[];

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 60,
                }}
                className="group relative flex flex-col rounded-[2.5rem] border border-border/40 bg-secondary/5 overflow-hidden hover:border-primary/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.1)] transition-all duration-700"
              >
                <div className="relative h-64 w-full overflow-hidden bg-secondary/20">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={t(`items.${project.id}.title`)}
                      className="w-full h-full object-cover grayscale-[0.8] opacity-70 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                    />
                  ) : (
                    <ProjectPlaceholder project={project} />
                  )}

                  <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />

                  <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
                    {project.image && (
                      <div className="p-3 bg-background/50 backdrop-blur-md border border-white/10 rounded-2xl text-primary shadow-lg group-hover:bg-primary group-hover:text-white transition-all duration-500">
                        <Icon size={24} strokeWidth={1.5} />
                      </div>
                    )}

                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-background/40 backdrop-blur-md border border-white/10 rounded-full text-foreground/80 hover:text-white hover:bg-primary/80 transition-all duration-300"
                      >
                        <ArrowUpRight size={16} />
                      </a>
                    ) : (
                      <div className="flex items-center gap-2 px-4 py-2 bg-background/40 backdrop-blur-md border border-white/5 rounded-full text-muted-foreground cursor-default">
                        <Lock size={14} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative z-10 flex flex-col flex-1 p-8 pt-4">
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {t(`items.${project.id}.title`)}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed mb-8 flex-1 text-[1.05rem]">
                    {t(`items.${project.id}.description`)}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-auto">
                    {tags.map((tag, tagIndex) => {
                      const config = TAG_CONFIG[tag];
                      const TagIcon = config?.icon;
                      const floatDelay = tagIndex * 0.8 + index * 0.2;

                      return (
                        <motion.span
                          key={tag}
                          animate={{ y: [0, -6, 0] }}
                          transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "linear",
                            delay: floatDelay,
                          }}
                          style={
                            {
                              willChange: "transform",
                              "--skill-color":
                                config?.color || "var(--primary)",
                            } as React.CSSProperties
                          }
                          className="group/tag flex items-center gap-3 px-4 py-2 rounded-full border border-primary/20 bg-background/80 backdrop-blur-md shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                        >
                          {TagIcon && (
                            <TagIcon
                              size={18}
                              className="text-muted-foreground transition-colors duration-300 group-hover/tag:text-[var(--skill-color)]"
                            />
                          )}

                          <span className="text-[11px] font-black tracking-widest text-foreground/80 transition-colors duration-300 group-hover/tag:text-primary">
                            {tag}
                          </span>
                        </motion.span>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
