"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function Education() {
  const t = useTranslations("Education");

  return (
    <section
      id="education"
      className="w-full py-20 bg-[#020617] text-white px-6"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-cyan-400"
        >
          {t("title")}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-linear-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-blue-500/20 relative overflow-hidden group"
        >
          {/* Badge de Destaque */}
          <div className="absolute top-0 right-0 bg-blue-600 px-4 py-1 text-xs font-bold uppercase tracking-tighter">
            Distinction
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">
                {t("degree")}
              </h3>
              <p className="text-blue-400 font-medium text-lg mb-1">
                {t("uni")}
              </p>
              <p className="text-slate-500 font-mono text-sm mb-4">
                {t("period")}
              </p>
              <p className="text-slate-400 leading-relaxed max-w-xl">
                {t("description")}
              </p>
            </div>

            <div className="w-full md:w-48 flex flex-col items-center justify-center p-6 bg-slate-900/50 rounded-xl border border-slate-700">
              <span className="text-sm text-slate-500 mb-1 uppercase text-center leading-tight">
                {t("scoreLabel")}
              </span>
              <span className="text-5xl font-black text-cyan-400">
                {t("scoreValue")}
              </span>

              {/* Mini barra de progresso */}
              <div className="w-full bg-slate-700 h-1.5 rounded-full mt-4 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "97%" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-full bg-cyan-400"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
