"use client";
import { useState, useEffect } from "react";
import { Recipe } from "../types";
import { useAuth } from "@/context/AuthContext";
import { fetchUserRecipes } from "./dataFetchers";
import { svgIcons } from "../../utils/svgIcons";
import Card from "@/app/components/Card";

interface mypageProps extends Recipe {
  _id?: string;
}

const MyPage: React.FC = () => {
  const { userId, signIn, session, status } = useAuth();

  const [data, setData] = useState<mypageProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    console.log(status, userId); // 디버깅을 위해 status와 userId를 출력
    if (status === "unauthenticated" || !userId) {
      alert("Please sign in to view your recipes");
      signIn();
    }

    if (userId) {
      loadRecipes();
    }
  }, [status, userId, session]);

  const loadRecipes = async () => {
    if (userId === undefined) return;
    try {
      if (userId) {
        const recipes = await fetchUserRecipes(userId);
        setData(recipes);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  if (!data) return <p>No profile data</p>;
  return (
    <>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header>
            <h2 className="heading-text">My Recipes</h2>

            <p className="mt-4 max-w-md text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              scelerisque etiam non mi, auctor.
            </p>
          </header>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex rounded border border-gray-100">
              <button className="inline-flex size-10 items-center justify-center border-e text-gray-600 transition hover:bg-gray-50 hover:text-gray-700">
                {svgIcons.bigPrieviewIcon}
              </button>

              <button className="inline-flex size-10 items-center justify-center border-e text-gray-600 transition hover:bg-gray-50 hover:text-gray-700">
                {svgIcons.listPrivewIcon}
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
                  <Card recipe={recipe} />
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default MyPage;
