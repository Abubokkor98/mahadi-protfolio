"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { getPhotosByCategory, type Photo } from "@/lib/data/photos";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  X,
  ImageIcon,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | Photo["category"]
  >("all");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [loadingImages, setLoadingImages] = useState<Set<string>>(
    new Set() // Start empty, let images handle their own loading state visually or just show them
  );
  const [isZoomed, setIsZoomed] = useState(false);

  const filteredPhotos = getPhotosByCategory(selectedCategory);

  const handleImageError = (id: string) => {
    setFailedImages((prev) => new Set(prev).add(id));
    // Also remove from loading state if it fails
    setLoadingImages((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleImageLoad = (id: string) => {
    setLoadingImages((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  // Navigation functions for lightbox
  const navigatePhoto = useCallback(
    (direction: "next" | "prev") => {
      if (!selectedPhoto) return;

      const currentIndex = filteredPhotos.findIndex(
        (p) => p.id === selectedPhoto.id
      );
      let newIndex;

      if (direction === "next") {
        newIndex = (currentIndex + 1) % filteredPhotos.length;
      } else {
        newIndex =
          (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
      }

      setSelectedPhoto(filteredPhotos[newIndex]);
      setIsZoomed(false); // Reset zoom when navigating
    },
    [selectedPhoto, filteredPhotos]
  );

  const getCurrentPhotoIndex = () => {
    if (!selectedPhoto) return 0;
    return filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!selectedPhoto) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        navigatePhoto("prev");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        navigatePhoto("next");
      } else if (e.key === "Escape") {
        setSelectedPhoto(null);
        setIsZoomed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhoto, filteredPhotos, navigatePhoto]);

  return (
    <div className="min-h-screen py-8 sm:py-12 bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="rounded-full"
            >
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Photo Gallery
            </h1>
          </div>
          <p className="text-muted-foreground mt-2 text-center">
            Cherished moments and memories with family and friends
          </p>
        </div>

        {/* Filter Tabs */}
        <Tabs
          defaultValue="all"
          value={selectedCategory}
          onValueChange={(value) =>
            setSelectedCategory(value as typeof selectedCategory)
          }
          className="mb-8"
        >
          <TabsList className="grid w-full max-w-md grid-cols-4 mx-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="family">Family</TabsTrigger>
            <TabsTrigger value="cousins">Cousins</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Photo Count */}
        <div className="flex justify-center items-center mb-6">
          <p className="text-sm text-muted-foreground">
            {filteredPhotos.length}{" "}
            {filteredPhotos.length === 1 ? "photo" : "photos"}
          </p>
        </div>

        {/* Masonry Grid */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                }}
                className="break-inside-avoid mb-4"
              >
                <Card
                  className="p-0 overflow-hidden cursor-pointer hover:shadow-xl transition-all group border-0 bg-background/50 backdrop-blur-sm"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <div className="relative aspect-4/5 bg-muted overflow-hidden">
                    {/* Loading Spinner */}
                    {loadingImages.has(photo.id) &&
                      !failedImages.has(photo.id) && (
                        <div className="absolute inset-0 flex items-center justify-center z-10 bg-muted/50">
                          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        </div>
                      )}

                    {failedImages.has(photo.id) ? (
                      // Fallback View
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/50 p-6 text-center">
                        <div className="bg-background rounded-full p-4 mb-3 shadow-sm">
                          <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
                        </div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Photo Coming Soon
                        </p>
                        <Badge
                          variant="secondary"
                          className="mt-2 capitalize text-xs opacity-70"
                        >
                          {photo.category}
                        </Badge>
                      </div>
                    ) : (
                      // Real Image
                      <>
                        <Image
                          src={photo.src}
                          alt={photo.caption || "Gallery photo"}
                          fill
                          className={`w-full h-full object-cover transition-opacity duration-300`}
                          onError={() => handleImageError(photo.id)}
                          onLoad={() => handleImageLoad(photo.id)}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          priority={index < 4} // Prioritize first few images
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                          <p className="text-white font-medium truncate">
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
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-20 bg-muted/20 rounded-3xl">
            <div className="bg-background inline-flex p-4 rounded-full mb-4">
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium text-foreground">
              No photos found
            </p>
            <p className="text-muted-foreground">
              Check back later for new memories!
            </p>
          </div>
        )}
      </div>

      {/* Enhanced Lightbox Dialog */}
      <Dialog
        open={!!selectedPhoto}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedPhoto(null);
            setIsZoomed(false);
          }
        }}
      >
        <DialogContent
          className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 overflow-hidden bg-black/95 backdrop-blur-xl border-none"
          showCloseButton={false}
        >
          {selectedPhoto && (
            <div
              className="relative w-full h-full flex items-center justify-center"
              role="dialog"
              aria-modal="true"
              aria-label="Photo viewer"
            >
              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all"
                onClick={() => {
                  setSelectedPhoto(null);
                  setIsZoomed(false);
                }}
                aria-label="Close lightbox"
              >
                <X className="h-5 w-5" />
              </Button>

              {/* Photo Counter */}
              <div className="absolute top-4 left-4 z-50 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-medium">
                {getCurrentPhotoIndex() + 1} / {filteredPhotos.length}
              </div>

              {/* Zoom Toggle Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-20 z-50 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all"
                onClick={() => setIsZoomed(!isZoomed)}
                aria-label={isZoomed ? "Zoom out" : "Zoom in"}
              >
                {isZoomed ? (
                  <ZoomOut className="h-5 w-5" />
                ) : (
                  <ZoomIn className="h-5 w-5" />
                )}
              </Button>

              {/* Previous Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md h-12 w-12 transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => navigatePhoto("prev")}
                disabled={filteredPhotos.length <= 1}
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              {/* Next Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md h-12 w-12 transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => navigatePhoto("next")}
                disabled={filteredPhotos.length <= 1}
                aria-label="Next photo"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              {/* Main Image Container */}
              <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-8 md:p-12">
                {failedImages.has(selectedPhoto.id) ? (
                  <div className="text-center p-8">
                    <ImageIcon className="h-16 w-16 mx-auto text-white/30 mb-4" />
                    <p className="text-white/70">Image not available</p>
                  </div>
                ) : (
                  <motion.div
                    key={selectedPhoto.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className={`relative w-full h-full ${
                      isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                    }`}
                    onClick={() => setIsZoomed(!isZoomed)}
                  >
                    <Image
                      src={selectedPhoto.src}
                      alt={selectedPhoto.caption || "Gallery photo"}
                      fill
                      className={`transition-all duration-300 ${
                        isZoomed
                          ? "object-cover hover:scale-110"
                          : "object-contain"
                      }`}
                      priority
                      sizes="95vw"
                    />
                  </motion.div>
                )}
              </div>

              {/* Info Overlay - Bottom */}
              <div className="absolute bottom-0 left-0 right-0 z-40 bg-linear-to-t from-black/80 via-black/50 to-transparent backdrop-blur-sm p-6 sm:p-8">
                <div className="max-w-4xl mx-auto space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white border-white/30 capitalize backdrop-blur-md"
                    >
                      {selectedPhoto.category}
                    </Badge>
                    {selectedPhoto.date && (
                      <div className="flex items-center gap-2 text-white/80 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span>{selectedPhoto.date}</span>
                      </div>
                    )}
                  </div>

                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
                    {selectedPhoto.caption || "Untitled Photo"}
                  </h2>

                  {/* Keyboard Shortcuts Hint */}
                  <p className="text-white/60 text-xs sm:text-sm hidden sm:block">
                    Use{" "}
                    <kbd className="px-2 py-1 bg-white/10 rounded text-white/80">
                      ←
                    </kbd>{" "}
                    <kbd className="px-2 py-1 bg-white/10 rounded text-white/80">
                      →
                    </kbd>{" "}
                    to navigate •{" "}
                    <kbd className="px-2 py-1 bg-white/10 rounded text-white/80">
                      ESC
                    </kbd>{" "}
                    to close
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
