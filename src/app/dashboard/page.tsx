"use client"
import { modules } from "@/lib/mock-data";
import { useAuth } from "@/hooks/use-auth";
import { UserProgress } from "@/types";
import { useState } from "react";
import { ModuleCarousel } from "@/components/module-carousel";

export default function DashboardPage() {
  const { user } = useAuth();

  // Mock progress state. In a real app, this would come from Firestore.
  const [progress, setProgress] = useState<UserProgress>({
    "1": { completedLessons: 3 },
    "2": { completedLessons: 15 },
    "4": { completedLessons: 7 },
    "3": { completedLessons: 20 },
  });

  const handleProgressUpdate = (moduleId: string, lessonCount: number) => {
    // In a real app, you would call a server action here to update Firestore.
    setProgress(prev => {
      const currentProgress = prev[moduleId]?.completedLessons || 0;
      const newCompletedLessons = (currentProgress + 1) % (lessonCount + 1);
      console.log(`Updating progress for module ${moduleId}: ${newCompletedLessons} lessons`);
      return {
        ...prev,
        [moduleId]: {
          ...prev[moduleId],
          completedLessons: newCompletedLessons,
        }
      }
    });
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

      <ModuleCarousel 
        modules={modules}
        progress={progress}
        onProgressUpdate={handleProgressUpdate}
      />
    </div>
  );
}
