"use client"
import { ModuleCard } from "@/components/module-card";
import { modules } from "@/lib/mock-data";
import { useAuth } from "@/hooks/use-auth";
import { UserProgress } from "@/types";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const { user } = useAuth();

  // Mock progress state. In a real app, this would come from Firestore.
  const [progress, setProgress] = useState<UserProgress>({
    "1": { completedLessons: 3 },
    "2": { completedLessons: 15 },
    "4": { completedLessons: 7 },
  });

  const handleProgressUpdate = (moduleId: string, completedLessons: number) => {
    // In a real app, you would call a server action here to update Firestore.
    console.log(`Updating progress for module ${moduleId}: ${completedLessons} lessons`);
    setProgress(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        completedLessons,
      }
    }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.displayName || user?.email?.split("@")[0]}!
        </h1>
        <p className="text-muted-foreground">
          Ready to continue your learning journey?
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Modules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                progress={progress[module.id]?.completedLessons || 0}
                onProgressUpdate={(completed) => handleProgressUpdate(module.id, completed)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
