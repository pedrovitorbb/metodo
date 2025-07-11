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
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Module } from "@/types";
import { PlayCircle } from "lucide-react";

interface ModuleCarouselProps {
  modules: Module[];
  onStartModule: (moduleId: string) => void;
}

export function ModuleCarousel({ modules, onStartModule }: ModuleCarouselProps) {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold tracking-tight">Todos os Módulos</h2>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {modules.map((module) => {
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
                    <CardContent className="flex flex-col flex-grow p-6">
                      <CardTitle className="mb-2 text-lg">{module.title}</CardTitle>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-grow">{module.description}</p>
                      
                      <div className="mt-auto">
                        <Button
                          onClick={() => onStartModule(module.id)}
                          size="sm"
                          className="w-full"
                        >
                          <PlayCircle className="mr-2 h-4 w-4" />
                          Iniciar Módulo
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
