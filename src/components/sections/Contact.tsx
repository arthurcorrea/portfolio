"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Mail,
  Linkedin,
  Github,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";

export default function Contact() {
  const t = useTranslations("Contact");
  const hero = useTranslations("Hero");

  const contactLinks = [
    {
      id: "email",
      icon: Mail,
      label: t("links.email"),
      value: "arthurcorrea321321@gmail.com",
      href: "mailto:arthurcorrea321321@gmail.com",
      color: "hover:text-red-400",
    },
    {
      id: "linkedin",
      icon: Linkedin,
      label: t("links.linkedin"),
      value: "Arthur Vinícius Corrêa",
      href: "https://linkedin.com/in/arthur-vinícius-corrêa-626b04187",
      color: "hover:text-blue-400",
    },
    {
      id: "github",
      icon: Github,
      label: t("links.github"),
      value: "arthurcorrea",
      href: "https://github.com/arthurcorrea",
      color: "hover:text-slate-200",
    },
    {
      id: "whatsapp",
      icon: MessageCircle,
      label: t("links.whatsapp"),
      value: "(33) 98751-0777",
      href: "https://wa.me/5533987510777",
      color: "hover:text-green-400",
    },
  ];

  return (
    <footer
      id="contact"
      className="relative w-full py-24 bg-[#020617] overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactLinks.map((link, idx) => (
            <motion.a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className={`flex flex-col p-6 bg-slate-900/40 border border-slate-800 rounded-2xl transition-all duration-300 group ${link.color} hover:border-blue-500/30 hover:bg-slate-900/80`}
            >
              <div className="flex justify-between items-start mb-4">
                <link.icon
                  className="text-slate-400 group-hover:text-inherit transition-colors"
                  size={28}
                />
                <ArrowUpRight
                  className="text-slate-600 group-hover:text-slate-400 transition-colors"
                  size={18}
                />
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                {link.id}
              </span>
              <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                {link.label}
              </span>
            </motion.a>
          ))}
        </div>

        <div className="mt-24 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-white font-bold text-lg">
              Arthur Vinícius Corrêa
            </span>
            <span className="text-slate-500 text-sm italic">{t("role")}</span>
          </div>

          <p className="text-slate-600 text-xs font-mono text-center md:text-right">
            {t("copy")} <br />
            &copy; {new Date().getFullYear()} • Bom Jesus do Galho, MG
          </p>
        </div>
      </div>
    </footer>
  );
}
