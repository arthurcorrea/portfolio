"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function Experience() {
  const t = useTranslations("Experience");

  const jobKeys = ["versa", "fibron"] as const;

  return (
    <section
      id="experience"
      className="w-full py-20 bg-[#020617] text-white px-6"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-16 text-center text-cyan-400"
        >
          {t("title")}
        </motion.h2>

        <div className="space-y-12">
          {jobKeys.map((key, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 border-l-2 border-slate-800 hover:border-blue-500 transition-colors group"
            >
              {/* Marcador na Timeline */}
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-800 group-hover:bg-blue-500 transition-colors" />

              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {t(`jobs.${key}.role`)}
                  </h3>
                  <p className="text-lg text-blue-400 font-medium">
                    {t(`jobs.${key}.company`)}
                  </p>
                </div>
                <div className="text-sm text-slate-500 mt-1 md:mt-0 text-right">
                  <span className="block font-mono">
                    {t(`jobs.${key}.period`)}
                  </span>
                  <span>{t(`jobs.${key}.location`)}</span>
                </div>
              </div>

              <ul className="list-none space-y-3">
                {(t.raw(`jobs.${key}.description`) as string[]).map(
                  (item, i) => (
                    <li
                      key={i}
                      className="text-slate-400 flex gap-3 leading-relaxed"
                    >
                      <span className="text-cyan-500 mt-1">▹</span>
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
