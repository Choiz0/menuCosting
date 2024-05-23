import mongoose from "mongoose";
import Ingredient from "./Ingredient"; // Ingredient 모델 가져오기
import User from "./User";

const RecipeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
    ingredients: { type: [Ingredient.schema], required: true },
    numServings: { type: Number, required: true },
    sellingPricePerServing: { type: Number, required: true },
    labourCostPerHour: { type: Number, required: false },
    timeTaken: { type: Number, required: false },
    gstPercentage: { type: Number, required: true },
    photo: { type: String },
    recipeNotes: { type: String }, // 메모 필드 추가
    totalCost: { type: Number },
    grossProfit: { type: Number },
    foodCostPercentage: { type: Number },
    costPerDish: { type: Number },
    contributionMarginWithLabour: { type: Number },
    foodCostPercentageWithLabour: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.models.Recipe || mongoose.model("Recipe", RecipeSchema);
