"use client";
import React, { useEffect } from "react";
import LandingImg from "../../../public/uploads/mainImage.jpg";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useAuth } from "@/context/AuthContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Landing = () => {
  const { data: session } = useSession();
  console.log("session", session);

  return (
    <>
      <div className="w-full h-full">
        <div className="flex bg-white">
          <div className="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
            <div>
              <h2 className="text-3xl font-semibold text-gray-800 md:text-4xl">
                Build Your New <span className="text-indigo-600">Idea</span>
              </h2>
              <p className="mt-2 text-sm text-gray-500 md:text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Blanditiis commodi cum cupiditate ducimus, fugit harum id
                necessitatibus odio quam quasi, quibusdam rem tempora
                voluptates. Cumque debitis dignissimos id quam vel!
              </p>
              <div className="flex justify-center lg:justify-start mt-6">
                <button
                  className="px-4 py-3 bg-gray-900 text-gray-200 text-xs font-semibold rounded hover:bg-gray-800"
                  onClick={async () => {
                    await signIn("google");
                  }}
                >
                  Get Started
                </button>
                <a
                  className="mx-4 px-4 py-3 bg-gray-300 text-gray-900 text-xs font-semibold rounded hover:bg-gray-400"
                  href="#"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
          <div
            className="hidden lg:block lg:w-1/2"
            style={{ clipPath: "polygon(10% 0, 100% 0%, 100% 100%, 0 100%)" }}
          >
            <div className="h-full object-cover">
              <Image
                src={LandingImg}
                alt="landing"
                className="object-fit"
                objectFit="cover"
              />
              <div className="h-full bg-black opacity-25" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
