
import { ChangeEvent } from 'react';
import moongoose from 'mongoose';
export interface Ingredient {
  name: string;
  quantityPurchased: number; // 구입한 양
  purchaseCost: number; // 구입 가격
  unitPrice: number; // 단위 가격
  quantityUsed: number; // 사용한 양
  usedCost: number; // 사용한 가격
  ingredientNotes: string; // 메모
}
 
export interface Recipe {
  _id?: any;
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
    grossProfitMargin?: number; // 총 이익률
    contributionMargin?: number; // 기여 마진
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
  
export interface Metrics {
  SellingPrice: string;
  TotalCost: string;
  GrossProfit: string;
  ContributionMargin: string;
  GrossProfitMargin: string;
  FoodCostPercentage: string;
  FoodCostPercentagewithLabor: string;
  GrossProfitMarginwithLabor: string;
  ContributionMarginwithLabor: string;
}

export interface Averages {
  FoodCostPercentage: string;
  LaborCostPercentage: string;
  CombinedFoodandLaborCostPercentage: string;
  TypicalProfitMargins: string;
}

export interface Comparison {
  FoodCostPercentage: string;
  CombinedFoodandLaboCostPercentage: string;
  ProfitMargin: string;
}

export interface PricingStrategy {
  Advantages: string;
  Disadvantages: string;
  Example: string;
  AustralianMarketComparison: {
    AverageCostPlusPricingMargin?: string;
    TypicalTargetProfitMargin?: string;
    Analysis: string;
    Approach?: string;
    CommonPractice?: string;
    Usage?: string;
  };
}

export interface PricingStrategiesAnalysis {
  CostBasedPricing: {
    CostPlusPricing: PricingStrategy;
    TargetProfitPricing: PricingStrategy;
  };
  DemandBasedPricing: PricingStrategy;
  CompetitionBasedPricing: PricingStrategy;
  NewProductPricing: {
    PriceSkimming: PricingStrategy;
    PenetrationPricing: PricingStrategy;
  };
}

export interface ComparisonWithAustralianMarket {
  FoodCostPercentage: {
    YourCurrent: string;
    AustralianAverage: string;
    Analysis: string;
  };
  CombinedFoodandLaborCostPercentage: {
    YourCurrent: string;
    AustralianAverage: string;
    Analysis: string;
  };
  ProfitMargins: {
    YourCurrent: string;
    AustralianAverage: string;
    Analysis: string;
  };
}

export interface RecommendedPricing {
  SuggestedNewPrice: string;
  Rationale: string;
  PotentialIssuewithPriceIncrease: string;
  OptimalAdjustmentStrategy: {
    FoodPriceAdjustment: string;
    LaborCostManagement: string;
  };
}

export interface AnalysisData {
  CurrentMetrics: Metrics;
  IndustryAverages: Averages;
  Comparison: Comparison;
  PricingStrategiesAnalysis: PricingStrategiesAnalysis;
  ComparisonwithAustralianMarket: ComparisonWithAustralianMarket;
  RecommendedPricing: RecommendedPricing;
}
