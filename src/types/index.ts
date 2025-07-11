export interface AuthCredentials {
  email: string;
  password?: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  lessons: number; // Represents total lessons, can be used for more granular progress later
  pdfUrl?: string;
}

export interface UserProgress {
  [moduleId: string]: {
    completedLessons: number; // Using 1 for completed, 0 for not completed
  };
}
