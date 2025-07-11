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
                <div className="aspect-[16/9] w-full">
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
                  {!isLocked && (
                     <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                       <Button
                         onClick={() => onStartModule(module.id, module.pdfUrl)}
                         size="lg"
                         variant="outline"
                         className="w-full"
                         disabled={isLocked}
                       >
                         <BookOpen className="mr-2 h-4 w-4" />
                         Acceder al PDF
                       </Button>
                     </div>
                  )}
                </div>
              </Card>
            );

            return (
              <CarouselItem
                key={module.id}
                className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
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
