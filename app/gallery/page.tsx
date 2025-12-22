"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { photos, getPhotosByCategory, type Photo } from "@/lib/data/photos";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | Photo["category"]
  >("all");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const filteredPhotos = getPhotosByCategory(selectedCategory);

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="container px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Photo Gallery
            </h1>
            <p className="text-muted-foreground mt-2">
              Cherished moments and memories with family and friends
            </p>
          </div>
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
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="family">Family</TabsTrigger>
            <TabsTrigger value="cousins">Cousins</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Photo Count */}
        <div className="flex justify-between items-center mb-6">
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
                  className="overflow-hidden cursor-pointer hover:shadow-xl transition-all group"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <div className="relative aspect-square bg-muted">
                    {/* Placeholder - users will add real images */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                      <div className="text-center p-6">
                        <p className="text-sm font-medium text-muted-foreground mb-2">
                          {photo.caption}
                        </p>
                        <Badge variant="secondary" className="capitalize">
                          {photo.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                      <p className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                        View Photo
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">
              No photos in this category yet.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox Dialog */}
      <Dialog
        open={!!selectedPhoto}
        onOpenChange={() => setSelectedPhoto(null)}
      >
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {selectedPhoto && (
            <div className="relative">
              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur"
                onClick={() => setSelectedPhoto(null)}
              >
                <X className="h-5 w-5" />
              </Button>

              {/* Image placeholder */}
              <div className="relative aspect-square bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center min-h-[400px]">
                <div className="text-center p-8">
                  <h3 className="text-2xl font-bold mb-2">
                    {selectedPhoto.caption}
                  </h3>
                  <Badge variant="secondary" className="capitalize mb-4">
                    {selectedPhoto.category}
                  </Badge>
                  {selectedPhoto.date && (
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(selectedPhoto.date).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Photo info */}
              <div className="p-6 bg-background">
                <h2 className="text-xl font-semibold mb-2">
                  {selectedPhoto.caption}
                </h2>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <Badge variant="outline" className="capitalize">
                    {selectedPhoto.category}
                  </Badge>
                  {selectedPhoto.date && (
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(selectedPhoto.date).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
