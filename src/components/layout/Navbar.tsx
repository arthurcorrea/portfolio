"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "@/src/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { GhostButton, IconButton, PrimaryButton } from "../ui/buttons";

interface NavLink {
  label: string;
  href: string;
}

function scrollTo(href: string) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function NavItem({
  link,
  active,
  onClick,
}: {
  link: NavLink;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <a
      href={link.href}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      aria-current={active ? "page" : undefined}
      className={`relative px-1 py-0.5 text-sm font-medium tracking-wide transition-colors duration-200 group outline-none
        ${active ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
    >
      <span>{link.label}</span>

      <span
        className={`absolute -bottom-0.5 left-0 h-px w-full origin-left rounded-full bg-primary transition-transform duration-300 
          ${active ? "scale-x-100" : "scale-x-0"}`}
        aria-hidden
      />

      {!active && (
        <span
          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 rounded-full bg-primary/40 transition-transform duration-300 group-hover:scale-x-100"
          aria-hidden
        />
      )}
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const locale = useLocale();
  const t = useTranslations("Navigation");
  const router = useRouter();
  const pathname = usePathname();

  const NAV_LINKS: NavLink[] = [
    { label: t("about"), href: "#about" },
    { label: t("experience"), href: "#experience" },
    { label: t("education"), href: "#education" },
    { label: t("projects"), href: "#projects" },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      const ids = NAV_LINKS.map((l) => l.href.slice(1)).reverse();
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  if (!mounted) return null;

  const toggleLanguage = () => {
    const nextLocale = locale === "pt" ? "en" : "pt";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <header
      role="banner"
      ref={menuRef}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300
        ${
          scrolled
            ? "bg-background/85 border-b border-border/80 shadow-lg shadow-black/20 backdrop-blur-md"
            : "bg-transparent border-b border-transparent shadow-none"
        }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="group flex items-center gap-px font-mono text-base font-bold tracking-tight text-foreground outline-none"
          aria-label="Voltar ao topo"
        >
          <span className="text-primary transition-colors duration-200 group-hover:text-primary/80">
            {"<"}
          </span>
          <span className="transition-colors duration-200 group-hover:text-primary">
            Arthur
          </span>
          <span className="text-primary transition-colors duration-200 group-hover:text-primary/80">
            {"/>"}
          </span>
        </a>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-7 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <NavItem
              key={link.href}
              link={link}
              active={activeSection === link.href.slice(1)}
              onClick={() => scrollTo(link.href)}
            />
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <GhostButton onClick={toggleLanguage} className="gap-2">
            <Globe size={14} />
            {locale.toUpperCase()}
          </GhostButton>

          <PrimaryButton glow onClick={() => scrollTo("#contact")}>
            Contato
          </PrimaryButton>
        </div>

        <div className="md:hidden">
          <IconButton
            onClick={() => setMenuOpen((v) => !v)}
            label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.15 }}
                className="flex"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.span>
            </AnimatePresence>
          </IconButton>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden bg-background/97 border-b border-border backdrop-blur-xl"
          >
            <nav
              aria-label="Navegação mobile"
              className="flex flex-col px-6 pb-6 pt-4"
            >
              {NAV_LINKS.map((link, i) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollTo(link.href);
                        setMenuOpen(false);
                      }}
                      className={`flex items-center border-b border-border/50 py-4 text-sm font-medium tracking-wide transition-colors duration-500
                        ${isActive ? "text-primary" : "text-foreground/80 hover:text-primary"}`}
                    >
                      {isActive && (
                        <span
                          className="mr-3 h-1.5 w-1.5 rounded-full bg-primary animate-pulse"
                          aria-hidden
                        />
                      )}
                      {link.label}
                    </a>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: NAV_LINKS.length * 0.04 + 0.05 }}
                className="mt-5 flex gap-3"
              >
                <GhostButton className="flex-1 gap-2 border border-border/40">
                  <Globe size={13} aria-hidden />
                  {locale.toUpperCase()}
                </GhostButton>
                <PrimaryButton
                  className="flex-1"
                  onClick={() => {
                    scrollTo("#contact");
                    setMenuOpen(false);
                  }}
                >
                  Contato
                </PrimaryButton>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
