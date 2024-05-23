// context/AuthContext.tsx
"use client";
import { createContext, useContext, ReactNode, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

interface AuthContextType {
  session: any;
  status: string | undefined;
  signIn: () => void;
  signOut: () => void;
  userName: string;
  userId: string; // 사용자 ID를 추가
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const userName = session?.user?.name;
  const userId = session?.user?.id; // 사용자 ID를 세션에서 가져옴

  useEffect(() => {
    if (status === "loading") return; // 세션 상태 로딩 중이면 아무것도 하지 않음
    if (!session && status !== "loading") {
      router.push("/landing"); // 로그인되지 않은 경우 로그인 페이지로 리디렉션
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

export const useAuth = () => useContext(AuthContext);
