"use client";

import { motion } from "framer-motion";
import { dreams } from "@/lib/data/dreams";
import { Badge } from "@/components/ui/badge";
import {
  Stethoscope,
  GraduationCap,
  Heart,
  Globe,
  Sparkles,
  CheckCircle2,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Stethoscope,
  GraduationCap,
  Heart,
  Globe,
  Sparkles,
};

function getDreamIcon(iconName: string) {
  const Icon = iconMap[iconName] || Sparkles;
  return <Icon className="h-6 w-6" />;
}

export default function DreamsSection() {
  const getCategoryColor = (category: string) => {
    const colors = {
      career: "text-blue-500",
      education: "text-purple-500",
      personal: "text-orange-500",
      impact: "text-green-500",
    };
    return colors[category as keyof typeof colors] || "text-primary";
  };

  return (
    <section id="dreams" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 space-y-4 text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            My Aspirations
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            The milestones I&apos;m working towards and the impact I want to
            create.
          </p>
          <div className="h-1 w-20 bg-primary rounded-full mt-6" />
        </motion.div>

        {/* Dreams List */}
        <div className="space-y-16">
          {dreams.map((dream, index) => (
            <motion.div
              key={dream.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group"
            >
              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                {/* Left Column: Timeline & Icon */}
                <div className="md:w-1/4 shrink-0 flex flex-row md:flex-col items-center md:items-start gap-4">
                  <div
                    className={`p-3 rounded-2xl bg-muted group-hover:bg-primary/5 transition-colors ${getCategoryColor(
                      dream.category
                    )}`}
                  >
                    {getDreamIcon(dream.icon)}
                  </div>
                  <Badge variant="outline" className="px-3 py-1 text-sm">
                    {dream.timeline}
                  </Badge>
                </div>

                {/* Right Column: Content */}
                <div className="md:w-3/4 space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`text-xs font-bold uppercase tracking-wider ${getCategoryColor(
                          dream.category
                        )}`}
                      >
                        {dream.category}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {dream.title}
                    </h3>
                  </div>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {dream.description}
                  </p>

                  {/* Steps List */}
                  {dream.steps && dream.steps.length > 0 && (
                    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 pt-2">
                      {dream.steps.map((step, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 text-muted-foreground/90 group/step"
                        >
                          <CheckCircle2 className="h-5 w-5 text-primary/40 group-hover/step:text-primary mt-0.5 shrink-0 transition-colors" />
                          <span className="text-base">{step}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Divider (except last item) */}
              {index !== dreams.length - 1 && (
                <div className="h-px bg-border/50  mt-16 w-full" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
