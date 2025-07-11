"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { User as FirebaseAuthUser, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { AuthCredentials, UserProfile } from "@/types";

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  register: (credentials: AuthCredentials) => Promise<FirebaseAuthUser | null>;
  login: (credentials: AuthCredentials) => Promise<FirebaseAuthUser | null>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDocRef = doc(db, "users", firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUser(userDoc.data() as UserProfile);
        } else {
          // Create a new user profile in Firestore if it doesn't exist
          const newUserProfile: UserProfile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            plan: 'basic', // Default to basic plan
          };
          await setDoc(userDocRef, newUserProfile);
          setUser(newUserProfile);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const register = async ({ email, password }: AuthCredentials) => {
    // Firebase handles password creation securely.
    // It takes the plain-text password, securely hashes it on its servers,
    // and creates the user account. The original password is never stored.
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    
    // Create user profile in Firestore upon registration
    const userDocRef = doc(db, "users", firebaseUser.uid);
    const newUserProfile: UserProfile = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      plan: 'basic', // New users start with a basic plan
    };
    await setDoc(userDocRef, newUserProfile);
    
    return firebaseUser;
  };

  const login = async ({ email, password }: AuthCredentials) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  };

  const logout = async () => {
    await signOut(auth);
  };

  const resetPassword = async (email: string) => {
    // This function tells Firebase to handle the entire password reset process.
    // Firebase generates a secure, one-time-use link and sends it to the user's email address.
    // We don't have to manage tokens or links; Firebase does it all.
    // The email template can be customized in the Firebase Console.
    await sendPasswordResetEmail(auth, email);
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
