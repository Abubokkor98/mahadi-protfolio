# Mahadi's World

![Project Banner](/public/images/bannerPreview.png)

[![Live Demo](https://img.shields.io/badge/Live-Demo-2ea44f?style=for-the-badge&logo=vercel)](https://iammahadi.vercel.app/)

## Introduction

Welcome to **Mahadi's World**, a bespoke personal portfolio website meticulously crafted for my cousin, Mahadi. As his Nana (he calls me), I undertook this project to provide him with a digital space that not only showcases his academic journey and personal aspirations but also serves as a canvas for his memories.

The story behind this website is quite special. When Mahadi asked me for his own website, I knew I wanted to create something extraordinary, but I also wanted to explore the future of coding. **I did not write a single line of code myself.** Instead, the moment he asked, Google's "Antigravity" agent came to mind. I built this entire project simply by giving commands to the Antigravity agent, guiding it to bring my vision to life. It's a testament to how human creativity and AI collaboration can build something beautiful.

The primary objective of this application is to capture the essence of Mahadi's vibrant personality and his curiosity, his dreams of becoming a doctor, and his strong family bonds. It is designed to be more than just a static webpage; it is an interactive narrative of his life, built with modern web technologies to ensure a premium and engaging user experience.

## Design Philosophy: The "Magical Lofi" Aesthetic

The visual identity of this project is rooted in a **"Magical Lofi"** design language. We moved away from generic web aesthetics to create something truly unique and soothing.

- **Color Palette**: The application utilises a sophisticated palette dominated by **Pale Lavender (`#fdf4ff`)** as the background, accented with soft purples (`#c084fc`) and gentle pinks (`#f472b6`). This creates a calm, dreamy atmosphere.
- **Typography**: To complement the visual theme, we employed **Dancing Script** for headers to add a touch of personal, handwritten warmth, and **Quicksand** for body text to ensure readability with a modern, friendly character.
- **Visual Elements**: The interface features glassmorphism effects, soft shadows, and rounded corners, contributing to a "premium" and cohesive look. Micro-animations and smooth transitions bring the interface to life without overwhelming the user.

## Technology Stack

This project is engineered using a robust, modern stack to ensure performance, scalability, and maintainability:

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router) - For server-side rendering and static site generation.
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Ensuring type safety and code reliability.
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - For utility-first, responsive styling.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - Powering the smooth enter/exit animations and interactive gestures.
- **Components**: [Shadcn UI](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/) - Providing accessible, unstyled primitives for our custom design system.
- **Icons**: [Lucide React](https://lucide.dev/) - For consistent, clean iconography.

## Key Features

### 1. Hero Section

The landing experience captures attention immediately with a dynamic introduction. It features smoothly animating text that highlights Mahadi's current academic status and future ambitions. A "Scroll to Explore" indicator gently guides users to discover more.

### 2. Family Tree

A central pillar of Mahadi's life is his family. This interactive section visualises his lineage across three generations.

- **Interactive Cards**: Users can click on family members to reveal detailed modal dialogs containing personal facts, occupations, and fun anecdotes.
- **Visual Hierarchy**: A custom SVG-based connector system visually links grandparents, parents, and children, reinforcing the family structure.

### 3. Academic Journey (School Life)

This section chronicles Mahadi's educational milestones.

- **Timeline View**: A responsive timeline layout that alternates content for desktop users while remaining linear for mobile devices.
- **Categorisation**: Events are distinctively categorised (e.g., Academic, Achievement) with colour-coded badges and icons for quick visual scanning.

### 4. Hobbies & Interests

Showcasing what makes Mahadi happy outside of school.

- **Grid Layout**: A clean grid displays various hobbies, from gaming to reading.
- **Detail Cards**: Each hobby card includes the year he started the activity and a brief description, providing depth to his personal profile.

### 5. Dreams & Aspirations

A forward-looking section detailing his goals.

- **Step-by-Step Progress**: Dreams are broken down into actionable steps, showing that big goals are achieved through consistent effort.
- **Visual Indicators**: Specific icons represent different types of goals (Career, Education, Personal), making the section visually distinct.

### 6. Photo Gallery

A dedicated space for memories.

- **Masonry Layout**: Photos are arranged in an organic, masonry-style grid that handles images of varying aspect ratios elegantly.
- **Immersive Lightbox**: Clicking a photo opens a full-screen, immersive lightbox with zoom capabilities, keyboard navigation, and detailed captions.
- **Categorisation**: Users can filter photos by categories (Family, Personal, Cousins) to find specific memories easily.

## Getting Started

To set up this project locally, follow these instructions:

### Prerequisites

Ensure you have **Node.js** (v18 or higher) and **pnpm** installed on your machine.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Abubokkor98/mahadi-protfolio.git
    cd mahadi-protfolio
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

4.  **Open your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000) to view the application.
