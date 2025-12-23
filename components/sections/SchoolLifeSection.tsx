"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { timeline } from "@/lib/data/timeline";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  Clock,
  Rocket,
  Award,
  BookOpen,
  School,
  Target,
  Trophy,
  Baby,
  ArrowUpRight,
  Calendar,
  Sparkles,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  School,
  BookOpen,
  Award,
  Clock,
  Rocket,
  Target,
  Trophy,
  Baby,
  ArrowUpRight,
};

function getTimelineIcon(iconName?: string) {
  if (iconName && iconMap[iconName]) {
    return iconMap[iconName];
  }
  return CheckCircle2;
}

function getCategoryStyles(category: string) {
  const styles = {
    academic: {
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/20",
      accent:
        "bg-linear-to-br from-zinc-700 via-zinc-800 to-zinc-900 dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-300",
      iconColor: "text-zinc-100 dark:text-zinc-900",
    },
    achievement: {
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/20",
      accent:
        "bg-linear-to-br from-zinc-700 via-zinc-800 to-zinc-900 dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-300",
      iconColor: "text-zinc-100 dark:text-zinc-900",
    },
    milestone: {
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/20",
      accent:
        "bg-linear-to-br from-zinc-700 via-zinc-800 to-zinc-900 dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-300",
      iconColor: "text-zinc-100 dark:text-zinc-900",
    },
    future: {
      color: "text-muted-foreground",
      bg: "bg-muted",
      border: "border-border",
      accent:
        "bg-linear-to-br from-zinc-600 via-zinc-700 to-zinc-800 dark:from-zinc-200 dark:via-zinc-300 dark:to-zinc-400",
      iconColor: "text-zinc-100 dark:text-zinc-900",
    },
  };
  return styles[category as keyof typeof styles] || styles.academic;
}

export default function SchoolLifeSection() {
  return (
    <section id="school" className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">My Journey</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Academic Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From childhood dreams to future aspirations
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-7xl mx-auto space-y-24 md:space-y-32">
          {timeline.map((event, index) => {
            const styles = getCategoryStyles(event.category);
            const Icon = getTimelineIcon(event.icon);
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                {/* Mobile/Tablet: Stacked Layout */}
                <div className="block lg:hidden space-y-6">
                  {/* Image */}
                  {event.image && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="relative aspect-16/10 rounded-2xl overflow-hidden"
                    >
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                    </motion.div>
                  )}

                  {/* Content */}
                  <div className="space-y-6">
                    {/* Icon & Year */}
                    <div className="flex items-center gap-4">
                      <div
                        className={`${styles.accent} ${styles.iconColor} rounded-full p-3 shadow-lg ring-2 ring-background`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <Badge
                        variant="outline"
                        className="text-base px-4 py-1.5"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        {event.year}
                      </Badge>
                    </div>

                    {/* Title & Category */}
                    <div className="space-y-3">
                      <h3 className="text-3xl sm:text-4xl font-bold">
                        {event.title}
                      </h3>
                      <Badge
                        className={`${styles.bg} ${styles.color} ${styles.border}`}
                      >
                        {event.category.charAt(0).toUpperCase() +
                          event.category.slice(1)}
                      </Badge>
                    </div>

                    {/* Description */}
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>

                    {/* Highlights */}
                    {event.highlights && event.highlights.length > 0 && (
                      <div className="pt-4 space-y-3">
                        {event.highlights.map((highlight, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <CheckCircle2
                              className={`w-5 h-5 ${styles.color} shrink-0 mt-0.5`}
                            />
                            <span className="text-foreground/90">
                              {highlight}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Desktop: Alternating Layout */}
                <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
                  {/* Image Side */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className={`${
                      isEven ? "lg:order-1" : "lg:order-2"
                    } relative`}
                  >
                    {event.image ? (
                      <div className="relative aspect-4/3 rounded-3xl overflow-hidden group">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

                        {/* Floating year badge */}
                        <div className="absolute bottom-6 right-6">
                          <div className="px-6 py-3 rounded-full bg-background/90 backdrop-blur-sm border-2 border-primary/20">
                            <span className="text-2xl font-bold">
                              {event.year}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`aspect-4/3 rounded-3xl ${styles.bg} flex items-center justify-center`}
                      >
                        <Icon
                          className={`w-24 h-24 ${styles.color} opacity-20`}
                        />
                      </div>
                    )}
                  </motion.div>

                  {/* Content Side */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className={`${
                      isEven ? "lg:order-2" : "lg:order-1"
                    } space-y-8`}
                  >
                    {/* Icon & Badge */}
                    <div className="flex items-center gap-4">
                      <div
                        className={`${styles.accent} ${styles.iconColor} rounded-2xl p-4 shadow-2xl ring-2 ring-background/50`}
                      >
                        <Icon className="w-8 h-8" />
                      </div>
                      <Badge
                        className={`${styles.bg} ${styles.color} ${styles.border} text-sm px-4 py-2`}
                      >
                        {event.category.charAt(0).toUpperCase() +
                          event.category.slice(1)}
                      </Badge>
                    </div>

                    {/* Title */}
                    <div className="space-y-4">
                      {!event.image && (
                        <Badge
                          variant="outline"
                          className="text-base px-4 py-1.5"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          {event.year}
                        </Badge>
                      )}
                      <h3 className="text-4xl lg:text-5xl font-bold leading-tight">
                        {event.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-xl text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>

                    {/* Highlights */}
                    {event.highlights && event.highlights.length > 0 && (
                      <>
                        <Separator />
                        <div className="space-y-4">
                          {event.highlights.map((highlight, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-start gap-4"
                            >
                              <CheckCircle2
                                className={`w-6 h-6 ${styles.color} shrink-0 mt-0.5`}
                              />
                              <span className="text-lg text-foreground/90">
                                {highlight}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </>
                    )}
                  </motion.div>
                </div>

                {/* Decorative line separator */}
                {index < timeline.length - 1 && (
                  <div className="mt-16 md:mt-24">
                    <Separator className="max-w-xs mx-auto opacity-30" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
