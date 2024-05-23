import mongoose from "mongoose";

const IngredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantityPurchased: { type: Number, required: true },
  purchaseCost: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  quantityUsed: { type: Number, required: true },
  usedCost: { type: Number, required: true },
  ingredientNotes: { type: String }, // 메모 필드 추가
});

IngredientSchema.pre("save", function (next) {
  const ingredient = this;
  ingredient.unitPrice = ingredient.purchaseCost / ingredient.quantityPurchased;
  ingredient.usedCost = ingredient.unitPrice * ingredient.quantityUsed;
  next();
});

export default mongoose.models.Ingredient ||
  mongoose.model("Ingredient", IngredientSchema);
