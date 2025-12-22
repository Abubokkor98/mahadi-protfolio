"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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

interface FamilyMemberCardProps {
  member: (typeof familyMembers)[0];
  index: number;
}

function FamilyMemberCard({ member, index }: FamilyMemberCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="cursor-pointer"
        >
          <Card className="overflow-hidden hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center space-y-3">
              <Avatar className="h-24 w-24 mx-auto border-4 border-primary/20">
                <AvatarImage src={member.photo} alt={member.name} />
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>

              <div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {member.relationship}
                </p>
              </div>

              {member.id === "mahadi" && (
                <Badge className="bg-primary">That's Me!</Badge>
              )}
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
            <div>
              <DialogTitle className="text-2xl">{member.name}</DialogTitle>
              <DialogDescription className="text-base">
                {member.relationship}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {member.age && (
            <div>
              <span className="text-sm font-medium text-muted-foreground">
                Age:
              </span>
              <p className="text-base">{member.age} years old</p>
            </div>
          )}

          {member.birthYear && (
            <div>
              <span className="text-sm font-medium text-muted-foreground">
                Birth Year:
              </span>
              <p className="text-base">{member.birthYear}</p>
            </div>
          )}

          {member.occupation && (
            <div>
              <span className="text-sm font-medium text-muted-foreground">
                Occupation:
              </span>
              <p className="text-base">{member.occupation}</p>
            </div>
          )}

          {member.grade && (
            <div>
              <span className="text-sm font-medium text-muted-foreground">
                Grade:
              </span>
              <p className="text-base">{member.grade}</p>
            </div>
          )}

          {member.funFact && (
            <div>
              <span className="text-sm font-medium text-muted-foreground">
                Fun Fact:
              </span>
              <p className="text-base italic">{member.funFact}</p>
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

  return (
    <section id="family" className="py-20 bg-muted/30">
      <div className="container px-4">
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
            The amazing people who shaped who I am today and support my dreams
            every day
          </p>
        </motion.div>

        {/* Family Tree Visualization */}
        <div className="max-w-6xl mx-auto">
          {/* Generation 1: Grandparents */}
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex justify-center gap-8 sm:gap-16 flex-wrap"
            >
              {generation1.map((member, index) => (
                <div key={member.id} className="w-40">
                  <FamilyMemberCard member={member} index={index} />
                </div>
              ))}
            </motion.div>

            {/* Connecting lines to parents */}
            <div className="relative h-16 hidden md:block">
              <svg
                className="absolute inset-0 w-full h-full"
                style={{ pointerEvents: "none" }}
              >
                {/* Vertical line down from grandparents */}
                <line
                  x1="50%"
                  y1="0"
                  x2="50%"
                  y2="100%"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-border"
                />
              </svg>
            </div>
          </div>

          {/* Generation 2: Parents */}
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex justify-center gap-8 sm:gap-16 flex-wrap"
            >
              {generation2.map((member, index) => (
                <div key={member.id} className="w-40">
                  <FamilyMemberCard member={member} index={index + 2} />
                </div>
              ))}
            </motion.div>

            {/* Connecting lines to children */}
            <div className="relative h-16 hidden md:block">
              <svg
                className="absolute inset-0 w-full h-full"
                style={{ pointerEvents: "none" }}
              >
                {/* Horizontal line connecting parents */}
                <line
                  x1="35%"
                  y1="0"
                  x2="65%"
                  y2="0"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-border"
                />
                {/* Vertical line down */}
                <line
                  x1="50%"
                  y1="0"
                  x2="50%"
                  y2="100%"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-border"
                />
              </svg>
            </div>
          </div>

          {/* Generation 3: Children */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex justify-center gap-8 sm:gap-16 flex-wrap"
            >
              {generation3.map((member, index) => (
                <div key={member.id} className="w-40">
                  <FamilyMemberCard member={member} index={index + 4} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Mobile-friendly list view hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center text-sm text-muted-foreground mt-12 md:hidden"
        >
          💡 Tap on any family member to learn more about them
        </motion.p>
      </div>
    </section>
  );
}
