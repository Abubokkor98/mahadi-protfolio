"use client";

import { motion } from "framer-motion";
import {
  familyMembers,
  getMembersByGeneration,
} from "@/lib/data/familyMembers";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MousePointerClick } from "lucide-react";

interface FamilyMemberCardProps {
  member: (typeof familyMembers)[0];
  index: number;
}

function FamilyMemberCard({ member, index }: FamilyMemberCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: index * 0.1,
            duration: 0.5,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2, ease: "easeOut" },
          }}
          className="cursor-pointer relative z-10"
        >
          <Card className="overflow-hidden hover:shadow-xl transition-all border-2 hover:border-primary/50 w-32 sm:w-44 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center space-y-2">
              <div className="relative mx-auto">
                <Avatar className="h-20 w-20 sm:h-24 sm:w-24 mx-auto border-4 border-background shadow-md">
                  <AvatarImage
                    src={member.photo}
                    alt={member.name}
                    className="object-cover"
                  />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
                {member.id === "mahadi" && (
                  <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-primary text-[10px] px-2 h-5">
                    Me!
                  </Badge>
                )}
              </div>

              <div className="pt-2">
                <h3 className="font-bold text-sm sm:text-base leading-tight">
                  {member.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {member.relationship}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-20 w-20 border-4 border-primary/20">
              <AvatarImage src={member.photo} alt={member.name} />
              <AvatarFallback>{member.name[0]}</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <DialogTitle className="text-2xl">{member.name}</DialogTitle>
              <DialogDescription className="text-base">
                {member.relationship}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {member.age && (
              <div className="bg-muted/50 p-3 rounded-lg">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Age
                </span>
                <p className="font-semibold">{member.age} years</p>
              </div>
            )}
            {member.birthYear && (
              <div className="bg-muted/50 p-3 rounded-lg">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Born
                </span>
                <p className="font-semibold">{member.birthYear}</p>
              </div>
            )}
          </div>

          {(member.occupation || member.grade) && (
            <div className="bg-muted/50 p-3 rounded-lg">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {member.occupation ? "Occupation" : "Grade"}
              </span>
              <p className="font-semibold">
                {member.occupation || member.grade}
              </p>
            </div>
          )}

          {member.funFact && (
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
              <span className="text-xs font-medium text-primary uppercase tracking-wider flex items-center gap-2 mb-1">
                <span className="text-lg">✨</span> Fun Fact
              </span>
              <p className="text-sm italic text-foreground/80 leading-relaxed">
                &ldquo;{member.funFact}&rdquo;
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function FamilyTreeSection() {
  const generation1 = getMembersByGeneration(1); // Grandparents
  const generation2 = getMembersByGeneration(2); // Parents
  const generation3 = getMembersByGeneration(3); // Children

  const mother = generation2.find((m) => m.id === "mother");
  const father = generation2.find((m) => m.id === "father");

  return (
    <section id="family" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            My Family Tree
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The amazing people who shaped who I am today
          </p>
        </motion.div>

        {/* Vertical Family Tree Layout */}
        <div className="flex flex-col items-center">
          {/* Level 1: Grandparents */}
          <div className="relative">
            <div className="flex justify-center gap-6 sm:gap-12">
              {generation1.map((member, idx) => (
                <FamilyMemberCard key={member.id} member={member} index={idx} />
              ))}
            </div>
            {/* Connector from Grandparents to Mother */}
            {/* We position this relative to the whole block, focused on Mother's side */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-px h-8 bg-border" />
          </div>

          <div className="h-8" />

          {/* Level 2: Parents */}
          <div className="relative">
            <div className="flex justify-center items-center gap-2 sm:gap-8">
              {mother && <FamilyMemberCard member={mother} index={2} />}

              <div className="flex flex-col items-center px-2">
                <Heart className="text-red-500 fill-red-500 w-6 h-6 animate-pulse" />
                <div className="w-8 sm:w-12 h-px bg-border mt-2" />
              </div>

              {father && <FamilyMemberCard member={father} index={3} />}
            </div>

            {/* Connector to Children (Centralized under the couple) */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-10 flex flex-col items-center">
              <div className="w-px h-10 bg-border" />
              {/* Horizontal bracket */}
              <div className="w-48 sm:w-64 h-px bg-border relative">
                <div className="absolute left-0 top-0 w-px h-4 bg-border display-none" />{" "}
                {/* Dynamic endpoints handled by children */}
              </div>
            </div>
          </div>

          <div className="h-10" />

          {/* Level 3: Children */}
          <div className="flex justify-center gap-6 sm:gap-24 pt-4 relative">
            {/* Decorators for connection endpoints */}
            <div className="absolute top-0 left-1/2 -translate-x-[50%] w-[9.5rem] sm:w-[17rem] flex justify-between">
              <div className="w-px h-6 bg-border" /> {/* Left child drop */}
              <div className="w-px h-6 bg-border" /> {/* Right child drop */}
            </div>

            {generation3.map((member, idx) => (
              <FamilyMemberCard
                key={member.id}
                member={member}
                index={idx + 4}
              />
            ))}
          </div>

          {/* Interactive Hint */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-center justify-center gap-2 mt-12"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <MousePointerClick className="h-5 w-5 text-primary" />
            </motion.div>
            <p className="text-sm font-medium text-primary">
              Click on anyone to discover what they&apos;re into!
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
