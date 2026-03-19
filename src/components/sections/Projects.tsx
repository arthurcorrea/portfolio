"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
// Importando Lucide Icons
import {
  ExternalLink,
  Lock,
  Smartphone,
  Globe,
  Map,
  ShoppingCart,
} from "lucide-react";

const PROJECTS_DATA = [
  { id: "correamoveis", link: "https://correamoveis.com", icon: ShoppingCart },
  { id: "fibron", link: "https://fibron.com.br", icon: Globe },
  { id: "versamaps", link: null, icon: Map },
  { id: "morarlegal", link: null, icon: Smartphone },
];

export default function Projects() {
  const t = useTranslations("Projects");

  return (
    <section
      id="projects"
      className="w-full py-20 bg-[#0f172a] text-white px-6"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-cyan-400"
        >
          {t("title")}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {PROJECTS_DATA.map((project, index) => {
            const Icon = project.icon;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-blue-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-slate-800 rounded-lg text-blue-400 group-hover:text-cyan-400 transition-colors">
                      <Icon size={24} />
                    </div>

                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 hover:text-white transition-colors p-1"
                      >
                        <ExternalLink size={20} />
                      </a>
                    ) : (
                      <div
                        className="flex items-center gap-2 text-slate-600 cursor-help"
                        title={t("noLink")}
                      >
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                          {t("noLink")}
                        </span>
                        <Lock size={16} />
                      </div>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {t(`items.${project.id}.title`)}
                  </h3>

                  <p className="text-slate-400 mb-6 leading-relaxed">
                    {t(`items.${project.id}.description`)}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {(t.raw(`items.${project.id}.tags`) as string[]).map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-900/20 text-blue-300 border border-blue-500/10 rounded text-[11px] font-mono"
                      >
                        {tag}
                      </span>
                    ),
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
