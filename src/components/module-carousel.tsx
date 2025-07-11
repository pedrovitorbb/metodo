"use client";

import * as React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Module, UserProgress } from "@/types";

interface ModuleCarouselProps {
  modules: Module[];
  progress: UserProgress;
  onProgressUpdate: (moduleId: string, totalLessons: number) => void;
}

export function ModuleCarousel({ modules, progress, onProgressUpdate }: ModuleCarouselProps) {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold tracking-tight">All Modules</h2>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {modules.map((module) => {
            const completedLessons = progress[module.id]?.completedLessons || 0;
            const progressPercentage = (completedLessons / module.lessons) * 100;
            const isCompleted = progressPercentage >= 100;

            return (
              <CarouselItem key={module.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                    <div className="aspect-video relative">
                      <Image
                        src={module.imageUrl}
                        alt={module.title}
                        width={600}
                        height={400}
                        data-ai-hint={module.imageHint}
                        className="object-cover w-full h-full"
                      />
                      {isCompleted && (
                        <div className="absolute top-2 right-2 bg-background/80 rounded-full p-1">
                          <CheckCircle2 className="h-6 w-6 text-green-500" />
                        </div>
                      )}
                    </div>
                    <CardContent className="flex flex-col flex-grow p-6">
                      <CardTitle className="mb-2 text-lg">{module.title}</CardTitle>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-grow">{module.description}</p>
                      
                      <div className="mt-auto space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{Math.floor(progressPercentage)}%</span>
                          <Progress value={progressPercentage} className="h-2 w-full" />
                        </div>
                        <Button
                          onClick={() => onProgressUpdate(module.id, module.lessons)}
                          size="sm"
                          className="w-full"
                        >
                          {isCompleted ? "Revisit Module" : "Continue Learning"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16"/>
      </Carousel>
    </div>
  );
}
