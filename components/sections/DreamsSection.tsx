"use client";

import { motion } from "framer-motion";
import { dreams } from "@/lib/data/dreams";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Stethoscope,
  GraduationCap,
  Laptop,
  Heart,
  Globe,
  Sparkles,
} from "lucide-react";

const iconMap: Record<string, any> = {
  Stethoscope,
  GraduationCap,
  Laptop,
  Heart,
  Globe,
  Sparkles,
};

function getDreamIcon(iconName: string) {
  const Icon = iconMap[iconName] || Sparkles;
  return <Icon className="h-8 w-8" />;
}

function getCategoryGradient(category: string) {
  const gradients = {
    career: "from-blue-500 to-cyan-500",
    education: "from-purple-500 to-pink-500",
    personal: "from-orange-500 to-yellow-500",
    impact: "from-green-500 to-emerald-500",
  };
  return (
    gradients[category as keyof typeof gradients] ||
    "from-primary to-primary/70"
  );
}

export default function DreamsSection() {
  return (
    <section id="dreams" className="py-20">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            My Dreams & Aspirations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every great journey starts with a dream. Here's where I'm headed and
            what I hope to achieve
          </p>
        </motion.div>

        {/* Dreams Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {dreams.map((dream, index) => (
            <motion.div
              key={dream.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <Card className="h-full hover:shadow-2xl transition-all overflow-hidden group">
                {/* Gradient Header */}
                <div
                  className={`bg-gradient-to-r ${getCategoryGradient(
                    dream.category
                  )} p-6 text-white`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    {getDreamIcon(dream.icon)}
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white border-white/30"
                    >
                      {dream.category.charAt(0).toUpperCase() +
                        dream.category.slice(1)}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-white">
                    {dream.title}
                  </CardTitle>
                </div>

                <CardContent className="p-6 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {dream.description}
                  </p>

                  {/* Timeline */}
                  <div className="flex items-center gap-2 text-sm">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="font-medium">Timeline:</span>
                    <span className="text-muted-foreground">
                      {dream.timeline}
                    </span>
                  </div>

                  {/* Steps */}
                  {dream.steps && dream.steps.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">
                        Steps to achieve:
                      </p>
                      <ul className="space-y-1.5">
                        {dream.steps.map((step, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-muted-foreground flex items-start gap-2"
                          >
                            <span className="text-primary mt-1">•</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <Card className="max-w-3xl mx-auto bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-3">🌟 The Journey Ahead</h3>
              <p className="text-lg text-muted-foreground">
                "The future belongs to those who believe in the beauty of their
                dreams."
                <br />
                <span className="text-sm">- Eleanor Roosevelt</span>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
