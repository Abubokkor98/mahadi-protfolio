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
    id: "grandmother-paternal",
    name: "Grandmother",
    relationship: "Grandmother (Paternal)",
    photo: "/images/family/grandmother_abstract.png",
    birthYear: 1950,
    age: 75,
    funFact: "Best storyteller in the family",
    generation: 1,
  },
  {
    id: "grandfather-paternal",
    name: "Grandfather",
    relationship: "Grandfather (Paternal)",
    photo: "/images/family/grandfather_abstract.png",
    birthYear: 1948,
    age: 77,
    funFact: "Loves gardening and teaching history",
    generation: 1,
  },

  // Parents - Generation 2
  {
    id: "mother",
    name: "Mahamuda Akter",
    relationship: "Mother",
    photo: "/images/family/mother_abstract.png",
    age: 42,
    occupation: "Teacher",
    funFact: "Makes the best homemade treats",
    generation: 2,
  },
  {
    id: "father",
    name: "Obaidur Rahman",
    relationship: "Father",
    photo: "/images/family/father_abstract.png",
    age: 45,
    occupation: "Engineer",
    funFact: "Can fix anything around the house",
    parentIds: ["grandmother-paternal", "grandfather-paternal"],
    generation: 2,
  },

  // Children - Generation 3
  {
    id: "sister",
    name: "Rayana Akter",
    relationship: "Sister",
    photo: "/images/family/family_sister_1766417512323.png",
    age: 15,
    grade: "Class 10",
    funFact: "Loves to annoy me!",
    parentIds: ["mother", "father"],
    generation: 3,
  },
  {
    id: "mahadi",
    name: "Mahadi Rahman",
    relationship: "Me",
    photo: "/images/mahadi.jpeg",
    age: 12,
    grade: "Class 8",
    funFact: "Future doctor!",
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
