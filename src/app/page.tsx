"use client";
import Main from "@/app/components/Main";
import AuthComponent from "./components/AuthComponent";
import Landing from "./components/Landing";
import Feature from "./components/Feature";

export default function HomePage() {
  return (
    <>
      {/* <Main isUpdate={false} /> */}
      <Landing />
      <Feature />
    </>
  );
}
