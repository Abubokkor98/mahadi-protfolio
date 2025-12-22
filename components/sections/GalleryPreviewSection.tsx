"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { photos } from "@/lib/data/photos";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Image as ImageIcon } from "lucide-react";

export default function GalleryPreviewSection() {
  // Get first 6 photos for preview
  const previewPhotos = photos.slice(0, 6);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
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

        {/* Photo Grid Preview */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-12">
          {previewPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              className="relative aspect-square"
            >
              <Card className="h-full overflow-hidden cursor-pointer hover:shadow-xl transition-shadow group">
                {/* Placeholder - users will add real images */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center p-4">
                  <div className="text-center">
                    <ImageIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground opacity-50" />
                    <p className="text-xs font-medium text-muted-foreground line-clamp-2">
                      {photo.caption}
                    </p>
                    <Badge
                      variant="secondary"
                      className="mt-2 text-xs capitalize"
                    >
                      {photo.category}
                    </Badge>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <p className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                    View in Gallery
                  </p>
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
