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
import { Card, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Module, UserProgress } from "@/types";
import { BookOpen, Lock } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ModuleCarouselProps {
  modules: Module[];
  progress: UserProgress;
  userPlan: "basic" | "premium";
  onStartModule: (moduleId: string, pdfUrl?: string) => void;
  onToggleCompletion: (moduleId: string, isCompleted: boolean) => void;
}

export function ModuleCarousel({
  modules,
  progress,
  userPlan,
  onStartModule,
  onToggleCompletion,
}: ModuleCarouselProps) {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold tracking-tight">
        Todos los Módulos
      </h2>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {modules.map((module) => {
            const isCompleted =
              (progress[module.id]?.completedLessons || 0) > 0;
            const isLocked = module.isPremium && userPlan !== "premium";

            const cardContent = (
              <Card
                className={`flex flex-col h-full overflow-hidden transition-all duration-300 relative ${
                  isLocked
                    ? "bg-muted/50"
                    : "hover:shadow-lg hover:shadow-primary/20"
                }`}
              >
                <div className="aspect-[3/4] w-full relative">
                  <Image
                    src={module.imageUrl}
                    alt={module.title}
                    fill
                    data-ai-hint={module.imageHint}
                    className={`object-cover w-full h-full ${
                      isLocked ? "filter grayscale" : ""
                    }`}
                  />
                  {isLocked && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <Lock className="h-12 w-12 text-white/80" />
                    </div>
                  )}
                </div>
                <CardFooter className="p-4 mt-auto flex flex-col items-start gap-4 bg-card border-t">
                  <Button
                    onClick={() => onStartModule(module.id, module.pdfUrl)}
                    className="w-full"
                    disabled={isLocked}
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Acceder al PDF
                  </Button>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`completed-${module.id}`}
                      checked={isCompleted}
                      onCheckedChange={(checked) =>
                        onToggleCompletion(module.id, !!checked)
                      }
                      disabled={isLocked}
                    />
                    <Label
                      htmlFor={`completed-${module.id}`}
                      className={`${
                        isLocked ? "text-muted-foreground" : "cursor-pointer"
                      }`}
                    >
                      Marcar como finalizado
                    </Label>
                  </div>
                </CardFooter>
              </Card>
            );

            return (
              <CarouselItem
                key={module.id}
                className="md:basis-1/3 lg:basis-1/4"
              >
                <div className="p-1 h-full">
                  {isLocked ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="h-full w-full">{cardContent}</div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Este módulo es para usuarios Premium. ¡Haz upgrade!
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    cardContent
                  )}
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
