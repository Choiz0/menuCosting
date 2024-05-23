"use client";

import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-white shadow">
      <div className="px-4 mx-auto max-w-7xl sm:px-6">
        <div className="relative pt-3 pb-3 sm:pb-4">
          <nav
            className="relative flex items-center justify-between sm:h-10 md:justify-center"
            aria-label="Global"
          >
            <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
              <div className="flex items-center justify-between w-full md:w-auto">
                <Link href="/">
                  <span className="sr-only">Company Name</span>
                  <Image
                    className="w-auto h-8 sm:h-10"
                    src="https://www.svgrepo.com/show/448244/pack.svg"
                    width={202}
                    height={40}
                    alt="Company Logo"
                  />
                </Link>
                <div className="flex items-center -mr-2 md:hidden">
                  <button
                    className="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-50 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-50"
                    type="button"
                    aria-expanded={isMenuOpen}
                    onClick={() => setMenuOpen(!isMenuOpen)}
                  >
                    <span className="sr-only">Open main menu</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden md:flex md:space-x-10 list-none">
              <li>
                <Link
                  href="/mypage"
                  className="text-base font-normal text-gray-500 list-none hover:text-gray-900"
                  target=""
                >
                  MyPage
                </Link>
              </li>
              <li>
                <Link
                  href="/costing"
                  className="text-base font-normal text-gray-500 list-none hover:text-gray-900"
                  target=""
                >
                  Menu Costing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base font-normal text-gray-500 list-none hover:text-gray-900"
                  target="_blank"
                >
                  AI Search Recipe
                </Link>
              </li>
            </div>
            <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
              <div className="inline-flex rounded-full shadow">
                {session ? (
                  <button
                    onClick={() => signOut()}
                    className="inline-flex items-center justify-center px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign Out
                  </button>
                ) : (
                  <button
                    onClick={async () => {
                      await signIn("google");
                    }}
                    className="inline-flex items-center justify-center px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/mypage"
            className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50"
          >
            MyPage
          </Link>
          <Link
            href="/costing"
            className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50"
          >
            Menu Costing
          </Link>
          <Link
            href="#"
            className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50"
            target="_blank"
          >
            AI Search Recipe
          </Link>
          {session ? (
            <button
              onClick={() => signOut()}
              className="block w-full px-3 py-2 text-base font-medium text-left text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={async () => {
                await signIn("google");
              }}
              className="block w-full px-3 py-2 text-base font-medium text-left text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
