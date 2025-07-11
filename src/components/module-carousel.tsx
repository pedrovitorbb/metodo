"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Module, UserProgress } from "@/types";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

interface ModuleCarouselProps {
  modules: Module[];
  progress: UserProgress;
  onProgressUpdate: (moduleId: string, completedLessons: number) => void;
}

export function ModuleCarousel({ modules, progress }: ModuleCarouselProps) {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold tracking-tight">Featured Modules</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {modules.map((module) => {
            const moduleProgress = progress[module.id]?.completedLessons || 0;
            const progressPercentage = (moduleProgress / module.lessons) * 100;
            return (
              <CarouselItem key={module.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="overflow-hidden">
                    <CardContent className="flex aspect-video items-center justify-center p-0 relative">
                       <Image
                        src={module.imageUrl}
                        alt={module.title}
                        width={600}
                        height={400}
                        data-ai-hint={module.imageHint}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                       <div className="absolute bottom-0 left-0 p-6 text-white">
                        <h3 className="text-xl font-bold">{module.title}</h3>
                        <p className="text-sm text-white/80 line-clamp-2">{module.description}</p>
                      </div>
                    </CardContent>
                     <div className="p-6 bg-card">
                       <div className="space-y-2">
                        <Progress value={progressPercentage} />
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{moduleProgress} / {module.lessons} lessons</span>
                            <span>{Math.round(progressPercentage)}%</span>
                        </div>
                       </div>
                        <Button className="w-full mt-4">
                          {progressPercentage > 0 ? "Continue Learning" : "Start Module"}
                        </Button>
                     </div>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16"/>
      </Carousel>
    </div>
  );
}
