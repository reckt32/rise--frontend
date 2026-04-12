"use client";

import { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  User,
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import { useRouter, usePathname } from "next/navigation";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const auth = getFirebaseAuth();
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      // Redirect logic
      if (!u && pathname !== "/login") {
        router.replace("/login");
      }
      if (u && pathname === "/login") {
        router.replace("/dashboard");
      }
    });
    return unsubscribe;
  }, [router, pathname]);

  const signIn = async (email: string, password: string) => {
    const auth = getFirebaseAuth();
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOut = async () => {
    const auth = getFirebaseAuth();
    await fbSignOut(auth);
    router.replace("/login");
  };

  return { user, loading, signIn, signOut };
}
