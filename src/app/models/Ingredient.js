import mongoose from "mongoose";

const IngredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantityPurchased: { type: Number, required: true },
  measurement: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  totalCost: { type: Number },
  quantityUsed: { type: Number, required: true },
  quantityUsedMeasurement: { type: String, required: true },
  photo: { type: String },
  ingredientNotes: { type: String }, // 메모 필드 추가
});

IngredientSchema.pre("save", function (next) {
  const ingredient = this;
  ingredient.totalCost = ingredient.unitPrice * ingredient.quantityPurchased;
  next();
});

export default mongoose.models.Ingredient || mongoose.model("Ingredient", IngredientSchema);
