// app/edit/[id]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation"; // useRouter, useParams를 가져옵니다.
import axios from "axios";
import RecipeForm from "@/app/components/RecipeForm"; // RecipeForm 컴포넌트를 가져옵니다.
import { Recipe } from "@/app/types";
import IngredientForm from "@/app/components/IngredientForm";
import Main from "@/app/components/Main";
import LoadingBlog from "@/app/components/LoadingBlog";

export interface RecipeFormProps {
  recipe: Recipe;
}
const EditRecipe: React.FC<RecipeFormProps> = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [result, setResult] = useState<Result | undefined>(undefined);
  const { id } = useParams(); // 동적 경로 매개변수를 가져옵니다.
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const fetchRecipe = async () => {
        try {
          const recipeRes = await axios.get(`/api/recipes/${id}`);
          setRecipe(recipeRes.data.data);
        } catch (error) {
          console.error("Error fetching recipe:", error);
        }
      };

      fetchRecipe();
    }
  }, [id]);

  if (!recipe) {
    return (
      <div>
        <LoadingBlog />
      </div>
    );
  }

  return (
    <div>
      <Main exRecipe={recipe} exResult={result} isUpdate={true} />
    </div>
  );
};

export default EditRecipe;
