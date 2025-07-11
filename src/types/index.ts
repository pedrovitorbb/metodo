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
  lessons: number;
}

export interface UserProgress {
  [moduleId: string]: {
    completedLessons: number;
  };
}
