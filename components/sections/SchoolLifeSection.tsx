"use client";

import { motion } from "framer-motion";
import { timeline } from "@/lib/data/timeline";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Clock,
  Rocket,
  Award,
  BookOpen,
  Code,
  School,
  Target,
} from "lucide-react";

const iconMap: Record<string, any> = {
  School,
  BookOpen,
  Code,
  Award,
  Clock,
  Rocket,
  Target,
};

function getTimelineIcon(iconName?: string) {
  if (iconName && iconMap[iconName]) {
    const Icon = iconMap[iconName];
    return <Icon className="h-5 w-5" />;
  }
  return <Check className="h-5 w-5" />;
}

function getCategoryColor(category: string) {
  const colors = {
    academic: "bg-blue-500",
    achievement: "bg-green-500",
    milestone: "bg-purple-500",
    future: "bg-orange-500",
  };
  return colors[category as keyof typeof colors] || "bg-primary";
}

export default function SchoolLifeSection() {
  return (
    <section id="school" className="py-20">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            My Academic Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From my first day at school to my dreams of the future, here's my
            story of growth and learning
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border hidden sm:block" />

            {/* Timeline events */}
            <div className="space-y-12">
              {timeline.map((event, index) => {
                const isLeft = index % 2 === 0;
                const categoryColor = getCategoryColor(event.category);

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className={`relative flex items-center ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    } gap-8`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 hidden sm:flex">
                      <div
                        className={`${categoryColor} rounded-full p-2 text-white shadow-lg`}
                      >
                        {getTimelineIcon(event.icon)}
                      </div>
                    </div>

                    {/* Content */}
                    <div
                      className={`flex-1 ${
                        isLeft ? "md:text-right md:pr-16" : "md:pl-16"
                      }`}
                    >
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          {/* Year badge */}
                          <Badge className="mb-3" variant="outline">
                            {event.year}
                          </Badge>

                          {/* Title */}
                          <h3 className="text-xl font-bold mb-2">
                            {event.title}
                          </h3>

                          {/* Category */}
                          <p className="text-sm text-muted-foreground capitalize mb-3">
                            {event.category.replace("-", " ")}
                          </p>

                          {/* Description */}
                          <p className="text-muted-foreground mb-4">
                            {event.description}
                          </p>

                          {/* Highlights */}
                          {event.highlights && event.highlights.length > 0 && (
                            <ul
                              className={`space-y-2 text-sm ${
                                isLeft ? "md:text-right" : ""
                              }`}
                            >
                              {event.highlights.map((highlight, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2"
                                >
                                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </CardContent>
                      </Card>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
