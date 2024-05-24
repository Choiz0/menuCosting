"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Recipe, Result } from "../../types";
import ResultDisplay from "@/app/components/ResultDisplay";
import LoadingBlog from "@/app/components/LoadingBlog";
import Image from "next/image";
import defaultImg from "../../../../public/default.jpg";

const RecipePage: React.FC = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [costing, setCosting] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const id = params?.id as string | undefined | null;

    if (!id) {
      console.error("ID is undefined");
      return;
    }

    const fetchRecipe = async () => {
      try {
        const recipeRes = await axios.get(`/api/recipes/${id}`);
        setRecipe(recipeRes.data.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    const fetchCost = async () => {
      try {
        const costingResult = await axios.get(`/api/costing/${id}`);
        setCosting(costingResult.data.data);
      } catch (error) {
        console.error("Error fetching costing result:", error);
      }
    };

    fetchRecipe();
    fetchCost();
    setLoading(false);
  }, [params]);

  const handleDelete = async () => {
    const id = params?.id as string | undefined | null;
    if (!id) {
      console.error("ID is undefined");
      return;
    }
    try {
      await axios.delete(`/api/recipes/${id}`);
      router.push("/mypage");
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleEdit = () => {
    const id = params?.id as string | undefined | null;
    if (!id) {
      console.error("ID is undefined");
      return;
    }

    router.push(`/edit/${id}`);
  };

  if (loading) {
    return (
      <div>
        <LoadingBlog />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div>
        <h1>Recipe not found</h1>
      </div>
    );
  }
  // console.log("costing:", costing);
  return (
    <div>
      <div className="m-4 flex justify-between flex-col md:flex-row">
        <div className="max-w-xl w-96 bg-white shadow sm:rounded-lg">
          <div className="flex justify-center">
            <Image
              className="object-cover w-full h-64"
              src={costing?.photo || defaultImg}
              alt={recipe.name}
              width={200}
              height={200}
              layout="responsive"
            />
          </div>
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {recipe.name}
            </h3>
            <p className="max-w-xl mt-1 text-sm text-gray-500">
              Details and informations about menu.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="py-5 bg-gray-50 grid grid-cols-3 gap-4 px-6">
                <dt className="text-sm font-medium text-gray-500 col-span-2">
                  Selling Price Per Serving
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                  {recipe.sellingPricePerServing}
                </dd>
              </div>
              <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 col-span-2">
                  Labour Cost Per Hour
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                  {recipe.labourCostPerHour}
                </dd>
              </div>
              <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 col-span-2">
                  Time Taken
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                  {recipe.timeTaken}
                </dd>
              </div>
              <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 col-span-2">
                  GST
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                  10%
                </dd>
              </div>
              <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 col-span-2">
                  Recipe Note
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                  {recipe.recipeNotes}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="flex flex-col">
          <div>
            <ResultDisplay recipe={recipe} result={costing} isDetail={true} />
          </div>
          <div className="my-4">
            <button
              onClick={handleEdit}
              className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
          <div className="">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right hidden md:table-header-group">
                <tr>
                  {[
                    "Ingredient Name",
                    "Quantity Purchased",
                    "Purchase Cost",
                    "Unit Price",
                    "Quantity Used",
                    "Used Cost",
                    "Ingredient Notes",
                    "Action",
                  ].map((label, i) => {
                    return (
                      <th
                        key={i}
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {label}
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {recipe.ingredients.map((ingredient, index) => {
                  return (
                    <tr key={index} className="flex flex-col md:table-row">
                      <td className="px-4 py-2 md:table-cell flex justify-between md:block">
                        <span className="block md:hidden font-bold">
                          Ingredient Name
                        </span>
                        {ingredient.name}
                      </td>
                      <td className="px-4 py-2 md:table-cell flex justify-between md:block">
                        <span className="block md:hidden font-bold">
                          Quantity Purchased
                        </span>
                        {ingredient.quantityPurchased}
                      </td>
                      <td className="px-4 py-2 md:table-cell flex justify-between md:block">
                        <span className="block md:hidden font-bold">
                          Purchase Cost
                        </span>
                        $ {Number(ingredient.purchaseCost).toFixed(2)}
                      </td>
                      <td className="px-4 py-2 md:table-cell flex justify-between md:block">
                        <span className="block md:hidden font-bold">
                          Unit Price
                        </span>
                        $ {Number(ingredient.unitPrice).toFixed(2)}
                      </td>
                      <td className="px-4 py-2 md:table-cell flex justify-between md:block">
                        <span className="block md:hidden font-bold">
                          Quantity Used
                        </span>
                        {ingredient.quantityUsed}
                      </td>
                      <td className="px-4 py-2 md:table-cell flex justify-between md:block">
                        <span className="block md:hidden font-bold">
                          Used Cost
                        </span>
                        $ {Number(ingredient.usedCost).toFixed(2)}
                      </td>
                      <td className="px-4 py-2 md:table-cell flex justify-between md:block">
                        <span className="block md:hidden font-bold">
                          Ingredient Notes
                        </span>
                        {ingredient.ingredientNotes}
                      </td>
                      <td className="px-4 py-2 md:table-cell flex justify-between md:block"></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
