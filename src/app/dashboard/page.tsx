"use client";

import { modules } from "@/lib/mock-data";
import { useAuth } from "@/hooks/use-auth";
import { UserProgress } from "@/types";
import { useState, useMemo } from "react";
import { ModuleCarousel } from "@/components/module-carousel";
import { Progress } from "@/components/ui/progress";

export default function DashboardPage() {
  const { user } = useAuth();

  const [progress, setProgress] = useState<UserProgress>({
    "1": { completedLessons: 0 },
    "2": { completedLessons: 1 },
    "3": { completedLessons: 1 },
    "4": { completedLessons: 0 },
  });

  const handleStartModule = (moduleId: string, pdfUrl?: string) => {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank");
    }
    console.log(`Accediendo al material del módulo: ${moduleId}`);
  };

  const handleToggleCompletion = (moduleId: string, isCompleted: boolean) => {
    setProgress((prevProgress) => ({
      ...prevProgress,
      [moduleId]: {
        completedLessons: isCompleted ? 1 : 0,
      },
    }));
  };

  const totalModules = useMemo(() => modules.length, []);

  const totalCompletedModules = useMemo(() => {
    return Object.values(progress).reduce(
      (acc, p) => acc + (p.completedLessons > 0 ? 1 : 0),
      0
    );
  }, [progress]);

  const overallProgressPercentage =
    totalModules > 0 ? (totalCompletedModules / totalModules) * 100 : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          ¡Bienvenido de vuelta, {user?.displayName || user?.email?.split("@")[0]}!
        </h1>
        <p className="text-muted-foreground">
          ¿Listo para continuar tu viaje de aprendizaje? Tu plan actual es: <span className="font-semibold text-primary">{user?.plan}</span>.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Tu Progreso General</h2>
        <div>
          <div className="flex items-center gap-4">
            <Progress value={overallProgressPercentage} className="h-3 flex-1" />
            <span className="font-semibold text-primary">
              {Math.floor(overallProgressPercentage)}% Completo
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Has completado {totalCompletedModules} de {totalModules} módulos. ¡Sigue así!
          </p>
        </div>
      </div>

      <ModuleCarousel
        modules={modules}
        progress={progress}
        userPlan={user?.plan || 'basic'}
        onStartModule={handleStartModule}
        onToggleCompletion={handleToggleCompletion}
      />
    </div>
  );
}
