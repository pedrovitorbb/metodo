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
    "1": { completedLessons: 3 },
    "2": { completedLessons: 15 },
    "4": { completedLessons: 7 },
    "3": { completedLessons: 20 },
  });

  const handleStartModule = (moduleId: string, pdfUrl?: string) => {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank");
    }
    console.log(`Iniciando o módulo: ${moduleId}`);
  };

  const totalLessons = useMemo(() => {
    return modules.reduce((acc, module) => acc + module.lessons, 0);
  }, []);

  const totalCompletedLessons = useMemo(() => {
    return Object.values(progress).reduce(
      (acc, p) => acc + (p.completedLessons || 0),
      0
    );
  }, [progress]);

  const overallProgressPercentage =
    totalLessons > 0 ? (totalCompletedLessons / totalLessons) * 100 : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Bem-vindo de volta, {user?.displayName || user?.email?.split("@")[0]}!
        </h1>
        <p className="text-muted-foreground">
          Pronto para continuar sua jornada de aprendizado?
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Seu Progresso Geral</h2>
        <div>
          <div className="flex items-center gap-4">
            <Progress value={overallProgressPercentage} className="h-3 flex-1" />
            <span className="font-semibold text-primary">
              {Math.floor(overallProgressPercentage)}% Completo
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Você completou {totalCompletedLessons} de {totalLessons} lições. Continue assim!
          </p>
        </div>
      </div>

      <ModuleCarousel modules={modules} onStartModule={handleStartModule} />
    </div>
  );
}
