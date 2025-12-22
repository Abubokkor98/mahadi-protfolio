export interface Photo {
  id: string;
  src: string;
  category: "personal" | "family" | "cousins";
  caption?: string;
  date?: string;
}

export const photos: Photo[] = [
  // Personal photos
  {
    id: "personal-1",
    src: "/images/gallery/personal/1.jpg",
    category: "personal",
    caption: "Just being me!",
    date: "2024-10-15",
  },
  {
    id: "personal-2",
    src: "/images/gallery/personal/2.jpg",
    category: "personal",
    caption: "My favorite spot",
    date: "2024-09-20",
  },
  {
    id: "personal-3",
    src: "/images/gallery/personal/3.jpg",
    category: "personal",
    caption: "School day",
    date: "2024-08-10",
  },
  {
    id: "personal-4",
    src: "/images/gallery/personal/4.jpg",
    category: "personal",
    caption: "Weekend vibes",
    date: "2024-07-05",
  },
  {
    id: "personal-5",
    src: "/images/gallery/personal/5.jpg",
    category: "personal",
    caption: "Study time",
    date: "2024-06-15",
  },
  {
    id: "personal-6",
    src: "/images/gallery/personal/6.jpg",
    category: "personal",
    caption: "Having fun!",
    date: "2024-11-01",
  },
  {
    id: "personal-7",
    src: "/images/gallery/personal/7.jpg",
    category: "personal",
    caption: "New haircut!",
    date: "2024-10-22",
  },

  // Family photos
  {
    id: "family-1",
    src: "/images/gallery/family/1.jpg",
    category: "family",
    caption: "Family dinner celebration",
    date: "2024-12-01",
  },
  {
    id: "family-2",
    src: "/images/gallery/family/2.jpg",
    category: "family",
    caption: "With mom and dad",
    date: "2024-11-15",
  },
  {
    id: "family-3",
    src: "/images/gallery/family/3.jpg",
    category: "family",
    caption: "Birthday party!",
    date: "2024-06-15",
  },
  {
    id: "family-4",
    src: "/images/gallery/family/4.jpg",
    category: "family",
    caption: "Weekend family time",
    date: "2024-09-10",
  },
  {
    id: "family-5",
    src: "/images/gallery/family/5.jpg",
    category: "family",
    caption: "Vacation memories",
    date: "2024-08-20",
  },
  {
    id: "family-6",
    src: "/images/gallery/family/6.jpg",
    category: "family",
    caption: "Grandparents visit",
    date: "2024-07-12",
  },
  {
    id: "family-7",
    src: "/images/gallery/family/7.jpg",
    category: "family",
    caption: "Family picnic",
    date: "2024-10-05",
  },
  {
    id: "family-8",
    src: "/images/gallery/family/8.jpg",
    category: "family",
    caption: "Special occasion",
    date: "2024-11-20",
  },

  // Cousins photos
  {
    id: "cousins-1",
    src: "/images/gallery/cousins/1.jpg",
    category: "cousins",
    caption: "Fun with cousins!",
    date: "2024-12-10",
  },
  {
    id: "cousins-2",
    src: "/images/gallery/cousins/2.jpg",
    category: "cousins",
    caption: "Gaming together",
    date: "2024-11-05",
  },
  {
    id: "cousins-3",
    src: "/images/gallery/cousins/3.jpg",
    category: "cousins",
    caption: "Cricket match",
    date: "2024-10-18",
  },
  {
    id: "cousins-4",
    src: "/images/gallery/cousins/4.jpg",
    category: "cousins",
    caption: "Festival celebrations",
    date: "2024-09-25",
  },
  {
    id: "cousins-5",
    src: "/images/gallery/cousins/5.jpg",
    category: "cousins",
    caption: "Outdoor adventures",
    date: "2024-08-30",
  },
  {
    id: "cousins-6",
    src: "/images/gallery/cousins/6.jpg",
    category: "cousins",
    caption: "Group photo",
    date: "2024-07-22",
  },
];

// Helper function to get photos by category
export function getPhotosByCategory(
  category: "all" | Photo["category"]
): Photo[] {
  if (category === "all") {
    return photos;
  }
  return photos.filter((photo) => photo.category === category);
}
