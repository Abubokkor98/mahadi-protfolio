"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { photos } from "@/lib/data/photos";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Image as ImageIcon } from "lucide-react";

export default function GalleryPreviewSection() {
  // Get first 6 photos for preview
  const previewPhotos = photos.slice(0, 6);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const handleImageError = (id: string) => {
    setFailedImages((prev) => new Set(prev).add(id));
  };

  return (
    <section id="gallery" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Memories & Moments
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A glimpse into my life through photos - family gatherings, fun times
            with cousins, and personal adventures
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-12">
          {previewPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="relative"
            >
              <Card className="h-full p-0 overflow-hidden cursor-pointer hover:shadow-xl transition-shadow group border-0 bg-background/50 backdrop-blur-sm">
                <div className="relative aspect-[4/5] bg-muted overflow-hidden">
                  {failedImages.has(photo.id) ? (
                    // Fallback View
                    <div className="absolute inset-0 bg-muted/50 flex flex-col items-center justify-center p-4">
                      <div className="bg-background rounded-full p-3 mb-2 shadow-sm">
                        <ImageIcon className="h-6 w-6 text-muted-foreground/50" />
                      </div>
                      <p className="text-xs font-medium text-muted-foreground text-center">
                        Coming Soon
                      </p>
                      <Badge
                        variant="secondary"
                        className="mt-2 text-[10px] capitalize opacity-70"
                      >
                        {photo.category}
                      </Badge>
                    </div>
                  ) : (
                    // Real Image
                    <>
                      <Image
                        src={photo.src}
                        alt={photo.caption || "Gallery preview"}
                        fill
                        className="w-full h-full object-cover transition-opacity duration-300"
                        onError={() => handleImageError(photo.id)}
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <p className="text-white text-sm font-medium truncate">
                          {photo.caption}
                        </p>
                        <p className="text-white/80 text-xs capitalize">
                          {photo.category}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Button size="lg" asChild>
            <Link href="/gallery" className="gap-2">
              View Full Gallery
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            {photos.length} photos across{" "}
            {new Set(photos.map((p) => p.category)).size} categories
          </p>
        </motion.div>
      </div>
    </section>
  );
}
