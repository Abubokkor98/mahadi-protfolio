"use client";

import { motion } from "framer-motion";
import { hobbies } from "@/lib/data/hobbies";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Gamepad2,
  BookOpen,
  Trophy,
  Music,
  MessageCircle,
  Activity,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Gamepad2,
  BookOpen,
  Trophy,
  Music,
  MessageCircle,
  Activity,
};

function getHobbyIcon(iconName: string) {
  const Icon = iconMap[iconName] || BookOpen;
  return <Icon className="h-8 w-8" />;
}

function getCategoryColor(category: string) {
  const colors = {
    creative: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
    sports: "bg-green-500/10 text-green-700 dark:text-green-400",
    technology: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    academic: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
    social: "bg-pink-500/10 text-pink-700 dark:text-pink-400",
  };
  return colors[category as keyof typeof colors] || "bg-primary/10";
}

export default function HobbiesSection() {
  return (
    <section id="hobbies" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            What Makes Me Happy
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            When I&apos;m not studying, you&apos;ll find me exploring these
            passions and interests
          </p>
        </motion.div>

        {/* Hobbies Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {hobbies.map((hobby, index) => (
            <motion.div
              key={hobby.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <Card className="h-full hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl ${getCategoryColor(
                        hobby.category
                      )}`}
                    >
                      {getHobbyIcon(hobby.icon)}
                    </div>
                    <Badge variant="outline">Since {hobby.sinceYear}</Badge>
                  </div>
                  <CardTitle className="text-xl">{hobby.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {hobby.description}
                  </p>

                  {/* Category Badge */}
                  <Badge
                    className={getCategoryColor(hobby.category)}
                    variant="secondary"
                  >
                    {hobby.category.charAt(0).toUpperCase() +
                      hobby.category.slice(1)}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
