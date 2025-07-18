import type { Module } from "@/types";

export const modules: Module[] = [
  {
    id: "1",
    title: "Introducción a React",
    description: "Aprende los fundamentos de React, incluyendo componentes, props y estado.",
    imageUrl: "https://i.imgur.com/85NgJNK.png",
    imageHint: "abstract code",
    lessons: 1,
    pdfUrl: "https://drive.google.com/file/d/1RYuOR2lHkr-PHa3AUtJ-lEdoYFFkE8ZM/view?usp=drive_link",
    isPremium: false,
  },
  {
    id: "2",
    title: "Gestión Avanzada del Estado",
    description: "Profundiza en la gestión del estado con Context API y Redux.",
    imageUrl: "https://i.imgur.com/xJHXKjI.png",
    imageHint: "network diagram",
    lessons: 1,
    pdfUrl: "https://drive.google.com/file/d/112qJkCaY9TP9YTeNBtf7UWwKqUQgWdQF/view?usp=drive_link",
    isPremium: false,
  },
  {
    id: "3",
    title: "Next.js para Producción",
    description: "Construye y despliega aplicaciones listas para producción con Next.js.",
    imageUrl: "https://i.imgur.com/JvvCofs.png",
    imageHint: "server illustration",
    lessons: 1,
    pdfUrl: "https://drive.google.com/file/d/1-j_t0cxp9DxzpdPjhm-_nCQi9Ms41-JI/view?usp=drive_link",
    isPremium: false,
  },
  {
    id: "4",
    title: "Dominando TypeScript",
    description: "Mejora tus proyectos de JavaScript con tipado estático.",
    imageUrl: "https://i.imgur.com/zdWkm8s.png",
    imageHint: "typescript logo",
    lessons: 1,
    pdfUrl: "https://drive.google.com/file/d/13g5B5CkNgPrifLsbRVmuFn_Y0I_-oFAD/view?usp=drive_link",
    isPremium: false,
  },
  {
    id: "5",
    title: "Principios de Diseño UI/UX",
    description: "Comprende los principios fundamentales para crear interfaces atractivas y funcionales.",
    imageUrl: "https://i.imgur.com/pMo3NKr.png",
    imageHint: "design wireframe",
    lessons: 1,
    pdfUrl: "https://drive.google.com/file/d/1JmrWf1SkoYPQkrQ9FWLNTR6Lx8HG6TDZ/view?usp=drive_link",
    isPremium: true,
  },
  {
    id: "6",
    title: "Firebase para Desarrolladores Web",
    description: "Integra servicios de backend como autenticación y base de datos con Firebase.",
    imageUrl: "https://i.imgur.com/OIBJvzm.png",
    imageHint: "firebase logo",
    lessons: 1,
    pdfUrl: "https://drive.google.com/file/d/14E6RyFFMZgHcjy6xbVJGXoibQxh0RWIs/view?usp=drive_link",
    isPremium: true,
  },
  {
    id: "7",
    title: "Fundamentos de GraphQL",
    description: "Aprende a construir y consumir APIs de GraphQL.",
    imageUrl: "https://i.imgur.com/zElS168.png",
    imageHint: "api database",
    lessons: 1,
    pdfUrl: "https://drive.google.com/file/d/1AnXbEeWC9dEG5equDSt12lyqxJFrSiyc/view?usp=drive_link",
    isPremium: true,
  },
  {
    id: "8",
    title: "CSS Avanzado y Sass",
    description: "Domina las características modernas de CSS y preprocesadores como Sass.",
    imageUrl: "https://i.imgur.com/4w9q4jI.png",
    imageHint: "css code",
    lessons: 1,
    pdfUrl: "https://drive.google.com/file/d/1DQI91MVMuw0US_dY-jkyIRx-7vfV9z7F/view?usp=drive_link",
    isPremium: true,
  },
  {
    id: "9",
    title: "Accesibilidad Web (WCAG)",
    description: "Construye aplicaciones web inclusivas que puedan ser utilizadas por todos.",
    imageUrl: "https://i.imgur.com/alCDUIE.png",
    imageHint: "accessibility screen reader",
    lessons: 1,
    pdfUrl: "https://drive.google.com/file/d/15r77W9nTfCjAIbEyo5jf-8EDtTrb4HIA/view?usp=drive_link",
    isPremium: true,
  },
];

export const featuredModules = modules.slice(0, 3);
