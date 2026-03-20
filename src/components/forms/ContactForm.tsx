"use client";

import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle, Rocket } from "lucide-react";
import { contactSchema, ContactFormData } from "./validations/contact";

const RocketThrustParticles = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      angle: Math.random() * 45 + 135,
      distance: 15 + Math.random() * 15,
      delay: i * 0.1,
    }));
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center -z-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0.2],
            x: -p.distance * 0.8,
            y: p.distance * 0.8,
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeOut",
            delay: p.delay,
          }}
          className="absolute h-1 w-1 rounded-full bg-primary shadow-[0_0_8px_white]"
        />
      ))}
    </div>
  );
};

export function ContactForm() {
  const t = useTranslations("Contact.form");
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const sendEmail = async () => {
    if (!formRef.current) return;
    setStatus("sending");

    try {
      await emailjs.sendForm(
        // @ts-expect-error type
        process.env.NEXT_PUBLIC_EMAIL_SERVICE,
        process.env.NEXT_PUBLIC_EMAIL_TEMPLATE,
        formRef.current,
        // @ts-expect-error type
        { publicKey: NEXT_PUBLIC_EMAIL_API_KEY },
      );

      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("FAILED...", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <div className="relative min-h-[400px]">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
          >
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 border border-primary/20">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-2xl font-black mb-2">{t("success_title")}</h3>
            <p className="text-muted-foreground">{t("success_msg")}</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={handleSubmit(sendEmail)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-5"
          >
            <div className="space-y-1">
              <input
                {...register("user_name")}
                name="user_name"
                placeholder={t("name_placeholder")}
                className={`w-full bg-secondary/15 border ${errors.user_name ? "border-red-500/50" : "border-border/60"} rounded-2xl px-6 py-4 outline-hidden focus:border-primary/50 transition-all placeholder:text-muted-foreground/40 font-medium`}
              />
              {errors.user_name && (
                <span className="flex items-center gap-1 text-[10px] text-red-400 ml-4 font-black tracking-widest">
                  <AlertCircle size={10} />{" "}
                  {t(`errors.${errors.user_name.message}`)}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <input
                {...register("user_email")}
                name="user_email"
                placeholder={t("email_placeholder")}
                className={`w-full bg-secondary/15 border ${errors.user_email ? "border-red-500/50" : "border-border/80"} rounded-2xl px-6 py-4 outline-hidden focus:border-primary/50 transition-all placeholder:text-muted-foreground/40 font-medium`}
              />
              {errors.user_email && (
                <span className="flex items-center gap-1 text-[10px] text-red-400 ml-4 font-black tracking-widest">
                  <AlertCircle size={10} />{" "}
                  {t(`errors.${errors.user_email.message}`)}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <textarea
                {...register("message")}
                name="message"
                rows={5}
                placeholder={t("message_placeholder")}
                className={`w-full bg-secondary/15 border ${errors.message ? "border-red-500/50" : "border-border/80"} rounded-2xl px-6 py-4 outline-hidden focus:border-primary/50 transition-all placeholder:text-muted-foreground/40 resize-none font-medium`}
              />
              {errors.message && (
                <span className="flex items-center gap-1 text-[10px] text-red-400 ml-4 font-black tracking-widest">
                  <AlertCircle size={10} />{" "}
                  {t(`errors.${errors.message.message}`)}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="group relative w-full py-5 cursor-pointer bg-primary/70 text-white font-black rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 overflow-hidden"
            >
              {status === "sending" ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <div className="relative flex items-center justify-center gap-3">
                  <span className="uppercase tracking-[0.2em] text-xs transition-colors group-hover:text-white">
                    {t("submit_btn")}
                  </span>

                  <div className="relative w-5 h-5 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <RocketThrustParticles />
                    </div>

                    <Rocket
                      size={18}
                      className="text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500 will-change-transform z-10"
                    />

                    <div className="absolute inset-0 bg-primary/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  </div>
                </div>
              )}
            </button>

            {status === "error" && (
              <p className="text-center text-[10px] text-red-400 font-black tracking-widest">
                {t("error_msg")}
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
