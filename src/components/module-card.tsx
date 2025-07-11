"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Module } from "@/types";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";

interface ModuleCardProps {
  module: Module;
  progress: number;
  onProgressUpdate: (completedLessons: number) => void;
}

export function ModuleCard({ module, progress, onProgressUpdate }: ModuleCardProps) {
  const progressPercentage = (progress / module.lessons) * 100;

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
      <CardHeader className="p-0">
        <div className="aspect-video relative">
            <Image
                src={module.imageUrl}
                alt={module.title}
                width={600}
                height={400}
                data-ai-hint={module.imageHint}
                className="object-cover w-full h-full"
            />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <CardTitle className="mb-2 text-lg">{module.title}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-3">{module.description}</p>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4 p-6 pt-0">
         <div className="w-full space-y-2">
            <Progress value={progressPercentage} />
            <div className="flex justify-between text-xs text-muted-foreground">
                <span>{progress} / {module.lessons} lessons</span>
                <span>{Math.round(progressPercentage)}%</span>
            </div>
        </div>
        <Button variant="outline" className="w-full">
            {progress > 0 ? "Continue Learning" : "Start Module"}
        </Button>
      </CardFooter>
    </Card>
  );
}
