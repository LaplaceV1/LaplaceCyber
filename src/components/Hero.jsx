import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="h-[55vh] flex items-center justify-center pt-6">
      <div className="text-center max-w-2xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold neon-title"
        >
          Laplace / Security Researcher
        </motion.h1>

        <p className="mt-4 text-gray-300">
          Cyberpunk tools hub — IG, TikTok, Facebook downloader. No redirect.
        </p>
      </div>
    </section>
  );
}
