export interface TimelineEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  category: "academic" | "achievement" | "milestone" | "future";
  icon?: string;
  highlights?: string[];
}

export const timeline: TimelineEvent[] = [
  {
    id: "start-primary",
    year: 2019,
    title: "Started Primary School",
    description:
      "My journey began! First day at school was exciting and a little scary.",
    category: "milestone",
    icon: "School",
    highlights: [
      "Made my first school friends",
      "Discovered my love for science",
      "Participated in annual day celebrations",
    ],
  },
  {
    id: "middle-school",
    year: 2022,
    title: "Entered Middle School",
    description:
      "Moved to middle school and started learning more advanced subjects.",
    category: "academic",
    icon: "BookOpen",
    highlights: [
      "Joined the school science club",
      "Won first prize in drawing competition",
      "Started learning computer basics",
    ],
  },
  {
    id: "coding-journey",
    year: 2023,
    title: "Discovered Coding",
    description: "Started my coding journey and fell in love with technology!",
    category: "achievement",
    icon: "Code",
    highlights: [
      "Built my first simple program",
      "Participated in school coding club",
      "Created a basic calculator",
    ],
  },
  {
    id: "class-7",
    year: 2024,
    title: "Class 7 Journey",
    description:
      "An amazing year filled with learning, growth, and new experiences.",
    category: "academic",
    icon: "Award",
    highlights: [
      "Excelled in science and mathematics",
      "Made wonderful friendships",
      "Decided to pursue medicine as a career",
      "Participated in inter-school sports",
    ],
  },
  {
    id: "results-waiting",
    year: 2025,
    title: "Awaiting Class 7 Results",
    description:
      "Currently waiting for my Class 7 final results. Excited and hopeful!",
    category: "milestone",
    icon: "Clock",
    highlights: [
      "Completed all exams successfully",
      "Confident about good results",
      "Preparing for Class 8",
      "Reading ahead for next year's subjects",
    ],
  },
  {
    id: "class-8",
    year: 2026,
    title: "Looking Forward to Class 8",
    description:
      "Ready to take on new challenges and opportunities in Class 8!",
    category: "future",
    icon: "Rocket",
    highlights: [
      "Will start in January 2026",
      "More advanced science topics",
      "Aiming for top grades",
      "One step closer to my doctor dream",
    ],
  },
  {
    id: "future-goals",
    year: 2030,
    title: "Future Aspirations",
    description:
      "Working towards my dream of becoming a doctor and helping others.",
    category: "future",
    icon: "Target",
    highlights: [
      "Complete high school with excellence",
      "Get into medical college",
      "Make my family proud",
      "Make a positive impact on society",
    ],
  },
];
