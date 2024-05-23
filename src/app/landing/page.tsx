"use client";

import React, { useEffect } from "react";
import Landing from "@/app/components/Landing";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Feature from "../components/Feature";

const Landingpage = () => {
  const { userId,session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      router.push("/mypage");
    }
  }, [session]);

  return (
    <>
      <Landing />
      <Feature />
    </>
  );
};

export default Landingpage;
