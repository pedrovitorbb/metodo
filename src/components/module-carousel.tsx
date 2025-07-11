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
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Module, UserProgress } from "@/types";

interface ModuleCarouselProps {
  modules: Module[];
  progress: UserProgress;
  onProgressUpdate: (moduleId: string, completedLessons: number) => void;
}

export function ModuleCarousel({ modules, progress }: ModuleCarouselProps) {
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
          {modules.map((module) => (
            <CarouselItem key={module.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
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
                  <CardContent className="flex-grow p-6">
                    <CardTitle className="mb-2 text-lg">{module.title}</CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-3">{module.description}</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16"/>
      </Carousel>
    </div>
  );
}
