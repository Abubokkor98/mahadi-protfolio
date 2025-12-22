export interface Hobby {
  id: string;
  name: string;
  icon: string; // Lucide icon name
  description: string;
  skillLevel: number; // 1-100
  sinceYear: number;
  category: "creative" | "sports" | "technology" | "academic";
}

export const hobbies: Hobby[] = [
  {
    id: "gaming",
    name: "Gaming",
    icon: "Gamepad2",
    description:
      "Love playing strategy and adventure games. Minecraft and educational games are my favorites!",
    skillLevel: 85,
    sinceYear: 2020,
    category: "technology",
  },
  {
    id: "reading",
    name: "Reading",
    icon: "BookOpen",
    description:
      "Enjoy reading science fiction, mystery novels, and books about space exploration.",
    skillLevel: 90,
    sinceYear: 2018,
    category: "academic",
  },
  {
    id: "drawing",
    name: "Drawing",
    icon: "Palette",
    description:
      "Creating digital art and sketching my favorite characters and nature scenes.",
    skillLevel: 70,
    sinceYear: 2021,
    category: "creative",
  },
  {
    id: "sports",
    name: "Cricket",
    icon: "Trophy",
    description:
      "Playing cricket with friends and following international matches. Dream of playing for the school team!",
    skillLevel: 75,
    sinceYear: 2019,
    category: "sports",
  },
  {
    id: "coding",
    name: "Coding",
    icon: "Code2",
    description:
      "Learning to code simple programs and games. Exploring Python and web development.",
    skillLevel: 60,
    sinceYear: 2023,
    category: "technology",
  },
  {
    id: "music",
    name: "Music",
    icon: "Music",
    description:
      "Listening to various genres and learning to play keyboard in my free time.",
    skillLevel: 55,
    sinceYear: 2022,
    category: "creative",
  },
];
