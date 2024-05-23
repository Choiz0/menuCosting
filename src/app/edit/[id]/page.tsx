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
import { Result } from "@/app/types";
import { useAuth } from "@/context/AuthContext";
interface RecipeFormProps {
  recipe: Recipe;
  result: Result | undefined;
  isUpdate: boolean;
}
const EditRecipe: React.FC<RecipeFormProps> = () => {
  const { userId, session, status } = useAuth();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [result, setResult] = useState<Result | undefined>(undefined);
  // 동적 경로 매개변수를 가져옵니다.
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined | null;
  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/landing"); // 세션이 없으면 로그인 페이지로 리디렉션
      return;
    }

    if (!id) {
      console.error("ID is undefined");
      return;
    }

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
  }, [id, status, router]);

  if (status === "loading" || !recipe) {
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
