"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Recipe } from "../types";
import Link from "next/link";
import LoadingBlog from "../components/LoadingBlog";
import { useAuth } from "@/context/AuthContext";
import defaultImg from "../../../public/default.jpg";
import Image from "next/image";

interface mypageProps extends Recipe {
  _id: string;
}

const MyPage: React.FC = () => {
  const { userId, signIn } = useAuth();

  const [data, setData] = useState<mypageProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      alert("Please sign in to view your recipes");
      signIn();
    }
    if (userId) {
      fetchUserRecipes();
    }
  }, []);

  const fetchUserRecipes = async () => {
    try {
      console.log("Sending userId:", userId); // 디버깅을 위해 userId를 출력
      const response = await axios.get("/api/recipes", {
        params: { userId },
      });
      console.log("User recipes:", response.data);
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user recipes:", error);
    }
  };

  if (loading) return <LoadingBlog />;
  if (!data) return <p>No profile data</p>;
  return (
    <div>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              My Recipes
            </h2>

            <p className="mt-4 max-w-md text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              scelerisque etiam non mi, auctor.
            </p>
          </header>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex rounded border border-gray-100">
              <button className="inline-flex size-10 items-center justify-center border-e text-gray-600 transition hover:bg-gray-50 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                  />
                </svg>
              </button>

              <button className="inline-flex size-10 items-center justify-center text-gray-600 transition hover:bg-gray-50 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                  />
                </svg>
              </button>
            </div>

            <div>
              <label htmlFor="SortBy" className="sr-only">
                SortBy
              </label>

              <select
                id="SortBy"
                className="h-10 rounded border-gray-300 text-sm"
              >
                <option>Sort By</option>
                <option value="Title, DESC">Title, DESC</option>
                <option value="Title, ASC">Title, ASC</option>
                <option value="Price, DESC">Price, DESC</option>
                <option value="Price, ASC">Price, ASC</option>
              </select>
            </div>
          </div>

          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data?.map((recipe, i) => {
              return (
                <li key={i} className="border p-2 ">
                  <Link
                    href={`/mypage/${recipe._id}`}
                    className="group block overflow-hidden flex flex-col"
                  >
                    <img
                      src={
                        recipe.photo.length === 0 ? defaultImg : recipe.photo
                      }
                      alt=""
                      className="h-[200px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[200px]"
                    />

                    <div className="relative bg-white pt-3 flex justify-around items-center">
                      <h3 className="text-md text-gray-700 group-hover:underline group-hover:underline-offset-4">
                        {recipe.name}
                      </h3>

                      <p className="">
                        <span className="tracking-wider text-gray-900">
                          {" "}
                          ${recipe.sellingPricePerServing}{" "}
                        </span>
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default MyPage;
