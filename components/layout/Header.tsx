"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  Home,
  Users,
  GraduationCap,
  Palette,
  Sparkles,
  Image as ImageIcon,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const navLinks = [
  { href: "/#hero", label: "Home", icon: Home, isHash: true },
  { href: "/#family", label: "Family", icon: Users, isHash: true },
  { href: "/#school", label: "School", icon: GraduationCap, isHash: true },
  { href: "/#hobbies", label: "Hobbies", icon: Palette, isHash: true },
  { href: "/#dreams", label: "Dreams", icon: Sparkles, isHash: true },
  { href: "/#gallery", label: "Gallery", icon: ImageIcon, isHash: true },
];

// github icon
function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const scrollToSection = (href: string) => {
    if (href.startsWith("/#")) {
      // If we're on the home page, scroll directly
      if (pathname === "/") {
        const id = href.substring(2);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setIsOpen(false);
      } else {
        // If we're on a different page, navigate to home page with hash
        // The browser will automatically scroll to the section after navigation
        router.push(href);
      }
    }
  };

  const isActive = (href: string) => {
    if (href === "/gallery") {
      return pathname === href;
    }
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-bold text-lg">
              M
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/70 transition-all">
              Mahadi
            </span>
          </div>
        </Link>

        {/* Desktop Navigation - from lg breakpoint */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const LinkIcon = link.icon;
            return link.isHash ? (
              <Button
                key={link.href}
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection(link.href)}
                className="gap-2"
              >
                <LinkIcon className="h-4 w-4" />
                {link.label}
              </Button>
            ) : (
              <Button
                key={link.href}
                variant={isActive(link.href) ? "secondary" : "ghost"}
                size="sm"
                asChild
                className="gap-2"
              >
                <Link href={link.href}>
                  <LinkIcon className="h-4 w-4" />
                  {link.label}
                </Link>
              </Button>
            );
          })}

          <Separator orientation="vertical" className="mx-2 h-6" />
          <ThemeToggle />
        </nav>

        {/* Mobile & Tablet Navigation - below lg */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-full">
              <SheetHeader>
                <SheetTitle className="flex items-center justify-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-bold">
                    M
                  </div>
                  <span>Mahadi&apos;s World</span>
                </SheetTitle>
                <SheetDescription className="text-center">
                  Navigate through my personal website
                </SheetDescription>
              </SheetHeader>

              <Separator className="my-4" />

              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const LinkIcon = link.icon;
                  return link.isHash ? (
                    <Button
                      key={link.href}
                      variant="ghost"
                      className="justify-center gap-3 h-12"
                      onClick={() => scrollToSection(link.href)}
                    >
                      <LinkIcon className="h-5 w-5" />
                      <span className="text-base">{link.label}</span>
                    </Button>
                  ) : (
                    <Button
                      key={link.href}
                      variant={isActive(link.href) ? "secondary" : "ghost"}
                      className="justify-center gap-3 h-12"
                      asChild
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href={link.href}>
                        <LinkIcon className="h-5 w-5" />
                        <span className="text-base">{link.label}</span>
                      </Link>
                    </Button>
                  );
                })}
              </nav>

              <Separator className="my-4" />

              <div className="space-y-2 text-sm text-muted-foreground text-center">
                <p>© 2024 Mahadi</p>
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                  Made with
                  <Heart className="h-4 w-4 text-red-500 fill-red-500" /> by
                  <Link
                    href="https://github.com/Abubokkor98"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    Nana
                    <GithubIcon className="h-4 w-4" />
                  </Link>
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
