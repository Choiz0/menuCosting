"use client";

import { useRef } from "react";
import Input from "./Input";
import NumInput from "./NumInput";
import { Recipe } from "../types";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import defaultImg from "../../../public/default.jpg";

interface RecipeFormProps {
  recipe: Recipe;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleReset: () => void;
  handleSubmit: () => void;
  handleUpdate?: (updatedRecipe: Recipe) => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({
  recipe,
  handleChange,
  handleFileChange,
  handleReset,
  handleSubmit,
  handleUpdate,
}) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const GST_PERCENTAGE = 10;
  return (
    <div className="flex flex-col space-y-6 md:p-4 ">
      <div>
        <label
          htmlFor="image"
          className="block text-sm text-gray-500 dark:text-gray-300"
        >
          Recipe Image
        </label>
        <input
          type="file"
          name="photo"
          ref={fileInput}
          onChange={handleFileChange}
          className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
        />
      </div>
      {recipe.photo && (
        <Image
          src={recipe.photo.length === 0 ? defaultImg : recipe.photo}
          alt="Recipe"
          className="mt-2 md:w-[200px] w-[100px]"
          width={200}
          height={100}
        />
      )}
      <div className="grid divide-x-2">
        <div>
          <Input
            name="name"
            value={recipe.name}
            onChange={handleChange}
            placeholder="Name"
          >
            Recipe Name
          </Input>
          <NumInput
            name="numServings"
            value={recipe.numServings}
            onChange={handleChange}
            placeholder="Number of Servings"
            mesure=""
          >
            Number of Servings
          </NumInput>
          <NumInput
            name="sellingPricePerServing"
            value={recipe.sellingPricePerServing}
            onChange={handleChange}
            placeholder="Selling Price per Serving"
          >
            Selling Price Per Serving
          </NumInput>
          <NumInput
            name="labourCostPerHour"
            value={recipe.labourCostPerHour}
            onChange={handleChange}
          >
            Labour Cost per Hour
          </NumInput>
          <NumInput
            name="timeTaken"
            value={recipe.timeTaken}
            onChange={handleChange}
            mesure="min"
          >
            Time Taken (minutes)
          </NumInput>

          <div className="p-4">
            <label
              htmlFor="OrderNotes"
              className="block text-sm font-medium text-gray-700"
            >
              Recipe Note
            </label>
            <textarea
              name="recipeNotes"
              className="mt-2 w-full rounded-lg border-gray-200 align-top shadow-sm sm:text-sm border"
              rows={3}
              value={recipe.recipeNotes}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleReset}
              className="m-2 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              All Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeForm;
