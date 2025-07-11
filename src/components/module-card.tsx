"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Module } from "@/types";

interface ModuleCardProps {
  module: Module;
  progress: number;
  onProgressUpdate: (completedLessons: number) => void;
}

export function ModuleCard({ module, progress, onProgressUpdate }: ModuleCardProps) {

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
      <CardHeader className="p-0">
        <div className="aspect-video relative">
            <Image
                src={module.imageUrl}
                alt={module.title}
                fill
                data-ai-hint={module.imageHint}
                className="object-cover w-full h-full"
            />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <CardTitle className="mb-2 text-lg">{module.title}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-3">{module.description}</p>
      </CardContent>
    </Card>
  );
}
