import { Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto pt-8 md:pt-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-3">About This Site</h3>
            <p className="text-sm text-muted-foreground">
              A personal website showcasing my journey, dreams, and the
              wonderful family that supports me every day.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="#family"
                  className="hover:text-foreground transition-colors"
                >
                  Family Tree
                </a>
              </li>
              <li>
                <a
                  href="#dreams"
                  className="hover:text-foreground transition-colors"
                >
                  My Dreams
                </a>
              </li>
              <li>
                <a
                  href="/gallery"
                  className="hover:text-foreground transition-colors"
                >
                  Photo Gallery
                </a>
              </li>
            </ul>
          </div>

          {/* Humorous Status */}
          <div>
            <h3 className="text-lg font-semibold mb-3">System Status</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Brain Capacity: Loading...</li>
              <li>Gaming Skills: 110%</li>
              <li>Homework: Error 404</li>
              <li>Motivation: Powered by Chicken meat</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 py-6 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © {currentYear} Mahadi. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> by
            <Link
              href="https://github.com/Abubokkor98"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Nana
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
