export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  photo: string;
  birthYear?: number;
  age?: number;
  occupation?: string;
  grade?: string;
  funFact?: string;
  parentIds?: string[];
  generation: number; // 1 = grandparents, 2 = parents, 3 = children
}

export const familyMembers: FamilyMember[] = [
  // Grandparents - Generation 1
  {
    id: "grandmother-maternal",
    name: "Grandmother",
    relationship: "Grandmother (Maternal)",
    photo: "/images/family/family_grandmother_1766417535284.png",
    birthYear: 1950,
    age: 75,
    funFact: "Best storyteller in the family",
    generation: 1,
  },
  {
    id: "grandfather-maternal",
    name: "Grandfather",
    relationship: "Grandfather (Maternal)",
    photo: "/images/family/family_grandfather_1766417555919.png",
    birthYear: 1948,
    age: 77,
    funFact: "Loves gardening and teaching history",
    generation: 1,
  },

  // Parents - Generation 2
  {
    id: "mother",
    name: "Mother",
    relationship: "Mother",
    photo: "/images/family/family_mother_1766417490979.png",
    age: 42,
    occupation: "Teacher",
    funFact: "Makes the best homemade treats",
    parentIds: ["grandmother-maternal", "grandfather-maternal"],
    generation: 2,
  },
  {
    id: "father",
    name: "Father",
    relationship: "Father",
    photo: "/images/family/family_father_1766417471662.png",
    age: 45,
    occupation: "Engineer",
    funFact: "Can fix anything around the house",
    generation: 2,
  },

  // Children - Generation 3
  {
    id: "sister",
    name: "Sister",
    relationship: "Sister",
    photo: "/images/family/family_sister_1766417512323.png",
    age: 15,
    grade: "Class 10",
    funFact: "Loves painting and music",
    parentIds: ["mother", "father"],
    generation: 3,
  },
  {
    id: "mahadi",
    name: "Mahadi",
    relationship: "Me",
    photo: "/images/mahadi.png",
    age: 12,
    grade: "Class 7 → Class 8",
    funFact: "Future doctor and tech enthusiast!",
    parentIds: ["mother", "father"],
    generation: 3,
  },
];

// Helper function to get family members by generation
export function getMembersByGeneration(generation: number): FamilyMember[] {
  return familyMembers.filter((member) => member.generation === generation);
}

// Helper function to get children of a parent
export function getChildren(parentId: string): FamilyMember[] {
  return familyMembers.filter((member) => member.parentIds?.includes(parentId));
}
