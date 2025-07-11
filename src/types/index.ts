export interface AuthCredentials {
  email: string;
  password?: string;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  plan: 'basic' | 'premium';
}

export interface Module {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  lessons: number; 
  pdfUrl?: string;
  isPremium: boolean;
}

export interface UserProgress {
  [moduleId: string]: {
    completedLessons: number; 
  };
}
