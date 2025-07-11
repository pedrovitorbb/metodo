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
import { BookOpen, CheckCircle, Circle, Lock } from "lucide-react";
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
  userPlan: 'basic' | 'premium';
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
            const isCompleted = (progress[module.id]?.completedLessons || 0) > 0;
            const isLocked = module.isPremium && userPlan !== 'premium';

            const cardContent = (
              <Card className={`flex flex-col h-full overflow-hidden transition-all duration-300 ${isLocked ? 'bg-muted/50' : 'hover:shadow-lg hover:shadow-primary/20'}`}>
                <div className="aspect-[16/9] relative">
                  <Image
                    src={module.imageUrl}
                    alt={module.title}
                    fill
                    data-ai-hint={module.imageHint}
                    className={`object-cover w-full h-full ${isLocked ? 'filter grayscale' : ''}`}
                  />
                  {isLocked && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <Lock className="h-12 w-12 text-white/80" />
                    </div>
                  )}
                </div>
                <CardContent className="flex flex-col flex-grow p-6 pb-4">
                  <h3 className="text-lg font-semibold mb-2">{module.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 flex-grow">{module.description}</p>
                </CardContent>
                <CardFooter className="flex-col items-start gap-4 p-6 pt-0">
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
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={`completed-${module.id}`}
                      checked={isCompleted}
                      onCheckedChange={(checked) => {
                        onToggleCompletion(module.id, !!checked);
                      }}
                      className="h-6 w-6"
                      disabled={isLocked}
                    />
                    <Label
                      htmlFor={`completed-${module.id}`}
                      className={`text-sm font-medium leading-none ${isLocked ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
                    >
                      Módulo Completado
                    </Label>
                  </div>
                </CardFooter>
              </Card>
            );

            return (
              <CarouselItem key={module.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <div className="p-1 h-full">
                  {isLocked ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="h-full w-full">{cardContent}</div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Este módulo es para usuarios Premium. ¡Haz upgrade!</p>
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
