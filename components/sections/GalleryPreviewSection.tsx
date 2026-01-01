"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { photos } from "@/lib/data/photos";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

export default function GalleryPreviewSection() {
  const previewPhotos = photos.slice(0, 7);
  const [activeIndex, setActiveIndex] = useState(3); // Center card is active
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const handleImageError = (id: string) => {
    setFailedImages((prev) => new Set(prev).add(id));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % previewPhotos.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + previewPhotos.length) % previewPhotos.length
    );
  };

  // Calculate position relative to active card
  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const normalizedDiff = (diff + previewPhotos.length) % previewPhotos.length;
    const position =
      normalizedDiff > previewPhotos.length / 2
        ? normalizedDiff - previewPhotos.length
        : normalizedDiff;

    // Center card (active)
    if (position === 0) {
      return {
        x: 0,
        y: 0,
        scale: 1,
        rotateY: 0,
        z: 400,
        opacity: 1,
        zIndex: 50,
      };
    }

    // Cards to the right
    if (position > 0) {
      const offset = Math.min(position, 3);
      return {
        x: 200 + (offset - 1) * 80,
        y: offset * 20,
        scale: 1 - offset * 0.15,
        rotateY: -25 - offset * 5,
        z: -offset * 100,
        opacity: Math.max(0.3, 1 - offset * 0.25),
        zIndex: 50 - offset,
      };
    }

    // Cards to the left
    const offset = Math.min(Math.abs(position), 3);
    return {
      x: -200 - (offset - 1) * 80,
      y: offset * 20,
      scale: 1 - offset * 0.15,
      rotateY: 25 + offset * 5,
      z: -offset * 100,
      opacity: Math.max(0.3, 1 - offset * 0.25),
      zIndex: 50 - offset,
    };
  };

  return (
    <section id="gallery" className="relative py-20 overflow-hidden">
      {/* Premium background */}
      <div className="absolute inset-0 bg-linear-to-b from-muted/30 via-background to-muted/20" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 bg-linear-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
            Memories & Moments
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A glimpse into my life through photos - family gatherings, fun times
            with cousins, and personal adventures
          </p>
        </motion.div>

        {/* 3D Stacked Carousel */}
        <div className="relative h-[500px] md:h-[600px] mb-16">
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              perspective: "2000px",
              perspectiveOrigin: "center center",
            }}
          >
            <AnimatePresence mode="sync">
              {previewPhotos.map((photo, index) => {
                const style = getCardStyle(index);
                const isActive = index === activeIndex;

                return (
                  <motion.div
                    key={photo.id}
                    className={`absolute ${
                      isActive
                        ? "cursor-grab active:cursor-grabbing"
                        : "cursor-pointer"
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{
                      x: style.x,
                      y: style.y,
                      scale: style.scale,
                      rotateY: style.rotateY,
                      z: style.z,
                      opacity: style.opacity,
                      zIndex: style.zIndex,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                      mass: 1,
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                    onClick={() => setActiveIndex(index)}
                    whileHover={isActive ? { scale: style.scale * 1.02 } : {}}
                    drag={isActive ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(e, { offset }) => {
                      const swipeThreshold = 50;
                      if (offset.x < -swipeThreshold) {
                        handleNext();
                      } else if (offset.x > swipeThreshold) {
                        handlePrev();
                      }
                    }}
                  >
                    {/* Card Container */}
                    <div
                      className={`
                        w-[280px] h-[380px] sm:w-[320px] sm:h-[420px] md:w-[380px] md:h-[500px]
                        rounded-2xl overflow-hidden
                        border-2 transition-all duration-300
                        ${
                          isActive
                            ? "border-primary/50 shadow-2xl shadow-primary/20"
                            : "border-white/10 shadow-xl"
                        }
                        bg-linear-to-br from-background/90 via-background/70 to-background/50
                        backdrop-blur-xl
                      `}
                    >
                      {/* Image */}
                      {!failedImages.has(photo.id) ? (
                        <>
                          <div className="relative w-full h-full">
                            <Image
                              src={photo.src}
                              alt={photo.caption || "Gallery photo"}
                              fill
                              className="object-cover"
                              onError={() => handleImageError(photo.id)}
                              sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 380px"
                              priority={index < 4}
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                              <Badge
                                variant="secondary"
                                className="mb-3 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs"
                              >
                                {photo.category}
                              </Badge>
                              <p className="text-white font-semibold text-base line-clamp-2 drop-shadow-lg">
                                {photo.caption}
                              </p>
                            </div>

                            {/* Active indicator */}
                            {isActive && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-4 right-4 w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/50"
                              />
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-linear-to-br from-muted/50 to-muted/30">
                          <div className="bg-background/80 backdrop-blur-sm rounded-full p-4 mb-3 shadow-lg border border-white/10">
                            <Sparkles className="h-8 w-8 text-primary/60" />
                          </div>
                          <p className="text-sm font-semibold text-muted-foreground">
                            Coming Soon
                          </p>
                          <Badge variant="secondary" className="mt-2 text-xs">
                            {photo.category}
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* 3D Depth Effect - Shadow */}
                    <div
                      className="absolute inset-0 rounded-2xl bg-black/20 blur-xl -z-10"
                      style={{ transform: "translateZ(-50px)" }}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Desktop Navigation Arrows - Inside carousel, side positioned */}
          <Button
            size="icon"
            variant="outline"
            onClick={handlePrev}
            className="hidden xl:flex absolute left-[10%] lg:left-[15%] top-1/2 -translate-y-1/2 z-100 rounded-full bg-background/80 backdrop-blur-md border-white/20 hover:bg-background/90 hover:border-primary/30 hover:scale-110 transition-all shadow-xl w-14 h-14 p-0 items-center justify-center"
          >
            <ChevronLeft className="h-7 w-7" />
          </Button>

          <Button
            size="icon"
            variant="outline"
            onClick={handleNext}
            className="hidden xl:flex absolute right-[10%] lg:right-[15%] top-1/2 -translate-y-1/2 z-100 rounded-full bg-background/80 backdrop-blur-md border-white/20 hover:bg-background/90 hover:border-primary/30 hover:scale-110 transition-all shadow-xl w-14 h-14 p-0 items-center justify-center"
          >
            <ChevronRight className="h-7 w-7" />
          </Button>
        </div>

        {/* Mobile Navigation Arrows - Below carousel */}
        <div className="flex xl:hidden items-center justify-center gap-8 -mt-8 mb-8">
          <Button
            size="icon"
            variant="outline"
            onClick={handlePrev}
            className="rounded-full bg-background/80 backdrop-blur-md border-white/20 hover:bg-background/90 hover:border-primary/30 hover:scale-110 transition-all shadow-xl w-12 h-12 p-0"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            size="icon"
            variant="outline"
            onClick={handleNext}
            className="rounded-full bg-background/80 backdrop-blur-md border-white/20 hover:bg-background/90 hover:border-primary/30 hover:scale-110 transition-all shadow-xl w-12 h-12 p-0"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              asChild
              className="gap-2 shadow-md shadow-primary/20 transition-shadow"
            >
              <Link href="/gallery">
                View Full Gallery
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.p
            className="text-sm text-muted-foreground mt-6 font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            {photos.length} photos across{" "}
            {new Set(photos.map((p) => p.category)).size} categories
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
