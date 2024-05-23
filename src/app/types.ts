
import { ChangeEvent } from 'react';
import moongoose from 'mongoose';
export interface Ingredient {
    name: string;
    quantityPurchased: number;
    measurement: string;
    totalCost: number;
    unitPrice: number;
    quantityUsed: number;
    quantityUsedMeasurement: string;
    photo: string; // 사진 URL
    ingredientNotes: string; // 메모
  }
  
export interface Recipe {
   id? : moongoose.Schema.Types.ObjectId;
    name: string;
    ingredients: Ingredient[];
    numServings: number;
    sellingPricePerServing: number;
    labourCostPerHour: number;
    timeTaken: number;
    gstPercentage: number;
    photo: string; // 레시피 사진 URL
    recipeNotes: string; // 레시피 메모
  }
  
  export interface Result {
    totalCost: number;
    grossProfit: number;
    foodCostPercentage: number;
    costPerDish: number;
    contributionMarginWithLabour: number;
    foodCostPercentageWithLabour: number;
    photo: string; // 결과에 포함될 사진 URL
    menuSellingPrice?: number; // 메뉴 판매 가격
    lessGst?: number; // GST 제외 가격
    kitchenRevenue?: number; // 주방 수익
    labourCost?: number; // 노동비
    costPerPortionWithLabour?: number; // 한 인분당 비용
  }
  
  
export interface InputProps {
    children: React.ReactNode;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}
  
export interface NumInputProps {
    children: React.ReactNode;
    name: string;
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  classNameAdd?: string;
  mesure?: string;
  }