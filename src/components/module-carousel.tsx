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
import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Module, UserProgress } from "@/types";
import { BookOpen, CheckCircle, Circle } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

interface ModuleCarouselProps {
  modules: Module[];
  progress: UserProgress;
  onStartModule: (moduleId: string, pdfUrl?: string) => void;
  onToggleCompletion: (moduleId: string, isCompleted: boolean) => void;
}

export function ModuleCarousel({
  modules,
  progress,
  onStartModule,
  onToggleCompletion,
}: ModuleCarouselProps) {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold tracking-tight">
        Todos os Módulos
      </h2>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {modules.map((module) => {
            const isCompleted = (progress[module.id]?.completedLessons || 0) > 0;
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
                    </div>
                    <CardContent className="flex flex-col flex-grow p-6 pb-4">
                      <CardTitle className="mb-2 text-lg">
                        {module.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-grow">
                        {module.description}
                      </p>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-4 p-6 pt-0">
                       <Button
                        onClick={() => onStartModule(module.id, module.pdfUrl)}
                        size="sm"
                        variant="outline"
                        className="w-full"
                      >
                        <BookOpen className="mr-2 h-4 w-4" />
                        Acessar PDF
                      </Button>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`completed-${module.id}`}
                          checked={isCompleted}
                          onCheckedChange={(checked) => {
                            onToggleCompletion(module.id, !!checked);
                          }}
                        />
                        <Label
                          htmlFor={`completed-${module.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          Módulo Concluído
                        </Label>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>
    </div>
  );
}
