"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Ghost, Home, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdf4ff] dark:bg-background p-4 text-center overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200/40 rounded-full blur-3xl -z-10"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl -z-10"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-lg mx-auto"
      >
        {/* Icon Animation */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mx-auto w-24 h-24 bg-white dark:bg-card rounded-3xl shadow-xl flex items-center justify-center mb-8 border border-purple-100 dark:border-border"
        >
          <Ghost className="w-12 h-12 text-purple-500" />
        </motion.div>

        {/* Text Content */}
        <h1 className="text-8xl font-bold bg-clip-text text-transparent bg-linear-to-r from-purple-600 to-pink-500 mb-2">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8 text-lg">
          Oops! It seems like this page has drifted into the magical void.
          Let&apos;s get you back to familiar territory.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            asChild
            size="lg"
            className="rounded-full px-8 bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20 transition-all hover:scale-105"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Return Home
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-8 border-purple-200 dark:border-border hover:bg-purple-50 dark:hover:bg-muted transition-all hover:scale-105"
          >
            <Link href="/gallery" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Visit Gallery
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
