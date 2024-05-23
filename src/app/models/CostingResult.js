import mongoose from "mongoose";

const CostingResultSchema = new mongoose.Schema(
  {
    recipeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
      required: true,
    },
    totalCost: { type: Number, required: true },
    grossProfit: { type: Number, required: true },
    foodCostPercentage: { type: Number, required: true },
    foodCostPercentageWithLabour: { type: Number },
    costPerDish: { type: Number, required: true },
    contributionMarginWithLabour: { type: Number },
    photo: { type: String },
    menuSellingPrice: { type: Number, required: true },
    lessGst: { type: Number, required: true },
    kitchenRevenue: { type: Number, required: true },
    labourCost: { type: Number },
    costPerPortionWithLabour: { type: Number },
  },
  { timestamps: true }
);
export default mongoose.models.CostingResult ||
  mongoose.model("CostingResult", CostingResultSchema);
