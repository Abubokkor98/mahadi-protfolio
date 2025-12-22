export interface Dream {
  id: string;
  category: "career" | "education" | "personal" | "impact";
  title: string;
  description: string;
  icon: string; // Lucide icon name
  timeline: string;
  steps?: string[];
}

export const dreams: Dream[] = [
  {
    id: "doctor",
    category: "career",
    title: "Become a Doctor",
    description:
      "I want to become a doctor to help people stay healthy and save lives. Medicine fascinates me, and I love learning about the human body.",
    icon: "Stethoscope",
    timeline: "2030 and beyond",
    steps: [
      "Excel in Science and Biology",
      "Complete medical college",
      "Specialize in a field I love",
      "Help people in my community",
    ],
  },
  {
    id: "education",
    category: "education",
    title: "Study at a Top University",
    description:
      "Dream of getting admission to a prestigious medical university with a scholarship.",
    icon: "GraduationCap",
    timeline: "2026-2030",
    steps: [
      "Maintain excellent grades",
      "Participate in science competitions",
      "Prepare for entrance exams",
      "Apply for scholarships",
    ],
  },
  {
    id: "technology",
    category: "personal",
    title: "Master Technology",
    description:
      "Want to combine my medical dreams with technology - maybe create health apps or use AI in medicine.",
    icon: "Laptop",
    timeline: "Ongoing",
    steps: [
      "Learn programming languages",
      "Build simple health-related apps",
      "Understand AI and its applications",
      "Innovate in medical technology",
    ],
  },
  {
    id: "community",
    category: "impact",
    title: "Help My Community",
    description:
      "Want to provide free medical camps and health education to people who cannot afford healthcare.",
    icon: "Heart",
    timeline: "Future goal",
    steps: [
      "Volunteer at local health camps",
      "Learn about public health",
      "Organize awareness programs",
      "Make healthcare accessible",
    ],
  },
  {
    id: "world-travel",
    category: "personal",
    title: "Travel the World",
    description:
      "Dream of visiting different countries, experiencing new cultures, and maybe working with international health organizations.",
    icon: "Globe",
    timeline: "2030s",
    steps: [
      "Learn new languages",
      "Save money for travels",
      "Work with WHO or similar organizations",
      "Experience different healthcare systems",
    ],
  },
  {
    id: "excellence",
    category: "personal",
    title: "Be a Well-Rounded Person",
    description:
      "Not just academics - want to be good at sports, arts, and help others become better versions of themselves.",
    icon: "Sparkles",
    timeline: "Lifelong journey",
    steps: [
      "Balance studies with hobbies",
      "Stay physically fit",
      "Maintain friendships",
      "Never stop learning",
    ],
  },
];
