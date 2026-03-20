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
import { ContactForm } from "../forms/ContactForm";

export default function Contact() {
  const t = useTranslations("Contact");

  const contactLinks = [
    {
      id: "linkedin",
      icon: Linkedin,
      label: "LinkedIn",
      value: "Arthur Vinícius Corrêa",
      href: "https://linkedin.com/in/arthur-vinícius-corrêa-626b04187",
      color: "text-blue-400",
    },
    {
      id: "github",
      icon: Github,
      label: "GitHub",
      value: "arthurcorrea",
      href: "https://github.com/arthurcorrea",
      color: "text-slate-200",
    },
    {
      id: "whatsapp",
      icon: MessageCircle,
      label: "WhatsApp",
      value: "(33) 98751-0777",
      href: "https://wa.me/5533987510777",
      color: "text-green-400",
    },
  ];

  return (
    <footer
      id="contact"
      className="relative w-full py-32 bg-background overflow-hidden px-6"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-[1fr_450px] gap-20 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="text-primary font-mono text-sm font-bold tracking-[0.2em] uppercase mb-4 block">
                {t("badge")}
              </span>
              <h2 className="text-5xl md:text-6xl font-black tracking-tight text-foreground mb-6 leading-tight">
                {t("title")}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                {t("subtitle")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {contactLinks.map((link, idx) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group flex flex-col p-5 bg-secondary/5 rounded-lg border border-border/40 transition-all duration-500 hover:border-primary/40 hover:bg-secondary/10 hover:shadow-[0_0_40px_hsl(var(--primary)/0.05)]"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div
                      className={`p-2 rounded-xl bg-background border border-border/40 ${link.color} group-hover:scale-110 transition-transform`}
                    >
                      <link.icon size={20} />
                    </div>
                    <ArrowUpRight
                      className="text-muted-foreground group-hover:text-primary transition-colors"
                      size={18}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">
                    {link.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-primary/5 blur-[80px] rounded-full pointer-events-none opacity-50" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-secondary/5 border border-primary/10 p-8 md:p-10 rounded-[3rem] backdrop-blur-sm relative overflow-hidden"
          >
            {/* <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 blur-[50px] rounded-full -mr-16 -mt-16" /> */}
            {/* <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] rounded-full -mr-10 -mt-10" /> */}
            <ContactForm />
          </motion.div>
        </div>

        {/* Footer Copyright */}
        <div className="mt-32 pt-12 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-foreground font-black text-xl tracking-tighter italic">
              Arthur Vinícius Corrêa
            </span>
            <span className="text-muted-foreground text-xs font-medium uppercase tracking-[0.2em]">
              {t("role")}
            </span>
          </div>

          <p className="text-muted-foreground text-[11px] font-mono text-center md:text-right leading-relaxed opacity-60">
            {t("copy")} <br />
            &copy; {new Date().getFullYear()} • Bom Jesus do Galho, MG, Brasil
          </p>
        </div>
      </div>
    </footer>
  );
}
