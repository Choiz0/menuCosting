"use client";

import { createContext, useContext, ReactNode, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  session: any;
  status: "authenticated" | "unauthenticated" | "loading" | undefined;
  signIn: () => void;
  signOut: () => void;
  userName: string;
  userId: string | undefined;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const userName = session?.user?.name ?? "";
  const userId = session?.user?.id ?? undefined;

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/landing");
    }
  }, [session, status, router]);

  return (
    <AuthContext.Provider
      value={{ session, status, signIn, signOut, userName, userId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
