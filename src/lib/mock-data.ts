import type { Module } from "@/types";

export const modules: Module[] = [
  {
    id: "1",
    title: "Introduction to React",
    description: "Learn the fundamentals of React, including components, props, and state.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "abstract code",
    lessons: 10,
  },
  {
    id: "2",
    title: "Advanced State Management",
    description: "Dive deep into state management with Context API and Redux.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "network diagram",
    lessons: 15,
  },
  {
    id: "3",
    title: "Next.js for Production",
    description: "Build and deploy production-ready applications with Next.js.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "server illustration",
    lessons: 20,
  },
  {
    id: "4",
    title: "Mastering TypeScript",
    description: "Enhance your JavaScript projects with static typing.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "typescript logo",
    lessons: 12,
  },
  {
    id: "5",
    title: "UI/UX Design Principles",
    description: "Understand the core principles of creating beautiful and usable interfaces.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "design wireframe",
    lessons: 8,
  },
  {
    id: "6",
    title: "Firebase for Web Devs",
    description: "Integrate backend services like auth and database with Firebase.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "firebase logo",
    lessons: 18,
  },
  {
    id: "7",
    title: "GraphQL Essentials",
    description: "Learn how to build and consume GraphQL APIs.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "api database",
    lessons: 14,
  },
  {
    id: "8",
    title: "Advanced CSS and Sass",
    description: "Master modern CSS features and preprocessors like Sass.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "css code",
    lessons: 16,
  },
  {
    id: "9",
    title: "Web Accessibility (WCAG)",
    description: "Build inclusive web applications that are usable by everyone.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "accessibility screen reader",
    lessons: 10,
  },
];

export const featuredModules = modules.slice(0, 3);
