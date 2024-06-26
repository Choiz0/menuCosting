import { useState, useEffect } from "react";
import RecipeForm from "@/app/components/RecipeForm";
import ResultDisplay from "@/app/components/ResultDisplay";
import IngredientForm from "@/app/components/IngredientForm";
import { Recipe, Result } from "../types";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import AiResult from "./AiResult";

interface MainProps {
  exRecipe?: Recipe | undefined;
  exResult?: Result | undefined;
  isUpdate?: boolean;
  userId?: string | null;
}

const Main: React.FC<MainProps> = ({ exRecipe, exResult, isUpdate }) => {
  const router = useRouter();
  const { userId, signIn } = useAuth();

  const [result, setResult] = useState<Result | undefined>(undefined);
  const [recipe, setRecipe] = useState<Recipe>({
    name: "",
    ingredients: [],
    numServings: 1,
    sellingPricePerServing: 0,
    labourCostPerHour: 0,
    timeTaken: 0,
    gstPercentage: 10,
    photo: "",
    recipeNotes: "",
  });

  useEffect(() => {
    if (isUpdate) {
      if (exRecipe) {
        setRecipe(exRecipe);
      }
      if (exResult) {
        setResult(exResult);
      }
      console.log(exRecipe);
    }
  }, [isUpdate, exRecipe, exResult]);

  const handleSave = async () => {
    if (!userId) {
      signIn();
      return;
    }

    try {
      // Step 1: Save the recipe
      const res = await axios.post(
        "/api/recipes",
        { ...recipe, userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status !== 201) {
        throw new Error("Failed to save recipe");
      }
      if (res.status === 201) {
        console.log("Success to save recipe");
      }
      const savedRecipe = res.data.data; // Assuming the saved recipe returns an ID
      console.log(savedRecipe);
      const recipeId = savedRecipe._id; // Assuming the saved recipe returns an ID

      // Step 2: Save the costing result with the recipe ID
      const resCosting = await axios.post(
        "/api/costing",
        { ...result, recipeId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (resCosting.status !== 201) {
        throw new Error("Failed to save costing result");
      }

      console.log("Saved costing result:", resCosting.data);
      // router.push("/mypage");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const calculateUnitPrice = (
    quantityPurchased: number,
    purchaseCost: number
  ) => {
    if (quantityPurchased > 0 && purchaseCost > 0) {
      return purchaseCost / quantityPurchased;
    }
    return 0;
  };

  const calculateUsedCost = (unitPrice: number, quantityUsed: number) => {
    return unitPrice * quantityUsed;
  };

  const calculateResults = () => {
    const ingredientsCost = recipe.ingredients.reduce((total, ingredient) => {
      const usedCost = calculateUsedCost(
        ingredient.unitPrice,
        ingredient.quantityUsed
      );
      return total + usedCost;
    }, 0);

    const labourCost = (recipe.labourCostPerHour / 60) * recipe.timeTaken;
    const gstAmount =
      recipe.sellingPricePerServing *
      recipe.numServings *
      (recipe.gstPercentage / 100);
    const totalCost = ingredientsCost + labourCost + gstAmount;
    const kitchenRevenue =
      (recipe.sellingPricePerServing / (1 + recipe.gstPercentage / 100)) *
      recipe.numServings;

    const grossProfit = kitchenRevenue - ingredientsCost;
    const foodCostPercentage = (ingredientsCost / kitchenRevenue) * 100 || 0;
    const foodCostPercentageWithLabour =
      (totalCost / kitchenRevenue) * 100 || 0;
    const costPerDish = totalCost / recipe.numServings;
    const contributionMarginWithLabour = kitchenRevenue - totalCost;
    const contributionMargin =
      (contributionMarginWithLabour / kitchenRevenue) * 100;
    const grossProfitMargin = (grossProfit / kitchenRevenue) * 100;

    setResult({
      totalCost,
      grossProfit,
      foodCostPercentage,
      foodCostPercentageWithLabour,
      costPerDish,
      contributionMarginWithLabour,
      photo: recipe.photo,
      menuSellingPrice: recipe.sellingPricePerServing,
      lessGst: recipe.sellingPricePerServing * (1 - recipe.gstPercentage / 100),
      kitchenRevenue,
      labourCost,
      costPerPortionWithLabour: totalCost / recipe.numServings,
      grossProfitMargin,
      contributionMargin,
    });
  };
  useEffect(() => {
    calculateResults();
  }, [recipe]);

  const handleIngredientChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    index: number
  ) => {
    const { name, value } = e.target;
    const newIngredients = recipe.ingredients.map((ingredient, i) => {
      if (i === index) {
        const updatedIngredient = { ...ingredient, [name]: value };

        if (name === "quantityPurchased" || name === "purchaseCost") {
          const { quantityPurchased, purchaseCost } = updatedIngredient;
          updatedIngredient.unitPrice = calculateUnitPrice(
            quantityPurchased,
            purchaseCost
          );
        }

        if (name === "quantityUsed") {
          const { unitPrice, quantityUsed } = updatedIngredient;
          updatedIngredient.usedCost = calculateUsedCost(
            unitPrice,
            quantityUsed
          );
        }

        return updatedIngredient;
      }
      return ingredient;
    });
    setRecipe({ ...recipe, ingredients: newIngredients });
    calculateResults(); // Calculate the results immediately after ingredient change
  };

  const addIngredient = () => {
    setRecipe({
      ...recipe,
      ingredients: [
        ...recipe.ingredients,
        {
          name: "",
          quantityPurchased: 0,
          purchaseCost: 0,
          unitPrice: 0,
          quantityUsed: 0,
          usedCost: 0,
          ingredientNotes: "",
        },
      ],
    });
  };

  const handleDeleteIngredient = (index: number) => {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe({ ...recipe, ingredients: newIngredients });
    calculateResults(); // Calculate the results immediately after deleting ingredient
  };

  const handleReset = () => {
    setRecipe({
      name: "",
      ingredients: [],
      numServings: 1,
      sellingPricePerServing: 0,
      labourCostPerHour: 0,
      timeTaken: 0,
      gstPercentage: 0,
      photo: "",
      recipeNotes: "",
    });
    setResult(undefined);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    } else {
      console.error("No file selected.");
      return;
    }

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.status === "success") {
        setRecipe({ ...recipe, photo: data.path });
      } else {
        console.error("File upload failed:", data.error);
      }
    } catch (err) {
      console.error("Error uploading file", err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`/api/recipes/${exRecipe?._id}`, recipe, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status !== 200) {
        throw new Error("Failed to update recipe");
      }

      const updatedRecipe = res.data.data;
      const recipeId = updatedRecipe._id;

      const resCosting = await axios.put(
        `/api/costing/${recipeId}`,
        { ...result, recipeId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (resCosting.status !== 200) {
        throw new Error("Failed to update costing result");
      }

      console.log("Updated costing result:", resCosting.data);
      router.push(`/mypage/${recipeId}`);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  return (
    <div className="p-4 w-screen">
      <h1 className="text-2xl font-bold">Menu Costing</h1>
      {isUpdate && (
        <>
          {" "}
          <h2 className="text-lg font-bold">Edit Recipe</h2>
          <div className="flex justify-end mx-2 ">
            <button
              type="button"
              onClick={handleUpdate}
              className="btn-fill-blue w-36"
            >
              Update
            </button>
          </div>
        </>
      )}
      <div className="flex md:flex-row flex-col space-x-4 md:mx-3">
        <div className="mx-auto my-4 flex flex-col space-y-6 md:p-4 rounded-xl shadow-lg md:w-1/2">
          <RecipeForm
            recipe={recipe}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
            handleReset={handleReset}
            handleSubmit={calculateResults}
          />
          {result && <AiResult result={result} recipe={recipe} />}
        </div>

        <div className="flex-grow flex flex-col">
          {result && (
            <ResultDisplay
              result={result}
              recipe={recipe}
              handleSave={handleSave}
              isUpdate={isUpdate}
            />
          )}
          <div className="my-4 flex flex-col space-y-2 p-4 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold">Ingredients Setting</h2>
            <div className="p-4 border my-2">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 hidden md:table-header-group">
                  <tr className="md:grid md:grid-cols-8 ">
                    {[
                      "Name",
                      "Qty Purchased",
                      "Purchased Cost",
                      "Unit Price",
                      "Qty Used",
                      "Used Cost",
                      "Notes",
                      "Action",
                    ].map((label, i) => {
                      return (
                        <th
                          key={i}
                          className=" px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {label}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recipe.ingredients.map((ingredient, index) => (
                    <tr key={index} className="flex flex-col md:table-row">
                      <IngredientForm
                        ingredient={ingredient}
                        index={index}
                        handleIngredientChange={handleIngredientChange}
                        handleDeleteIngredient={handleDeleteIngredient}
                        isUpdate={isUpdate}
                      />
                    </tr>
                  ))}
                  <tr className="flex flex-col md:table-row">
                    <td colSpan={8} className="px-4 py-2">
                      <button
                        type="button"
                        onClick={addIngredient}
                        className="btn-fill-blue w-full md:w-36"
                      >
                        Add Ingredient
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
