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
];

export const featuredModules = modules.slice(0, 3);
