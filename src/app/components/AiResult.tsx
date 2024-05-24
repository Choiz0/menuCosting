"use client";

import { useState, useEffect } from "react";
import { Recipe, Result } from "@/app/types";
import Analysis from "@/app/components/Analysis";
import axios from "axios";

interface AiResultProps {
  recipe: Recipe;
  result: Result;
}

const AiResult: React.FC<AiResultProps> = ({ recipe, result }) => {
  const [useCount, setUseCount] = useState(0);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [response, setResponse] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const count = parseInt(localStorage.getItem("useCount") || "0", 10);
    const lastReset = localStorage.getItem("lastReset");

    const now = new Date();
    const lastResetDate = lastReset ? new Date(lastReset) : now;

    const timeDiff = now.getTime() - lastResetDate.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);

    if (daysDiff >= 1) {
      localStorage.setItem("useCount", "0");
      localStorage.setItem("lastReset", now.toISOString());
      setUseCount(0);
    } else {
      setUseCount(count);
    }
  }, []);

  const initialPrompt = `Please provide a detailed price analysis to increase the profit margin for the recipe with the following details:recipe name:${
    recipe?.name
  },totalcost:${result?.totalCost},grossprofit:${
    result?.grossProfit
  },foodcostpercentage:${
    result?.foodCostPercentage
  },foodcostpercentagewithlabour:${
    result?.foodCostPercentageWithLabour
  },costperdish:${result?.costPerDish},contributionmarginwithlabour:${
    result?.contributionMarginWithLabour
  },menusellingprice:${result?.menuSellingPrice},lessGST:${
    result?.lessGst
  },kitchenrevenue:${result?.kitchenRevenue},labourcost:${
    result?.labourCost
  },costperportionwithlabour:${
    result?.costPerPortionWithLabour
  },ingredients:${JSON.stringify(recipe?.ingredients)},numberofservings:${
    recipe?.numServings
  },sellingpriceperserving:${
    recipe?.sellingPricePerServing
  },labourcostperhour:${recipe?.labourCostPerHour},preptime:${
    recipe?.timeTaken
  },andGSTpercentage:${
    recipe?.gstPercentage
  },(additionalquestion):${additionalInfo},grossprofitMargin%:${
    result?.grossProfitMargin
  },contributionMargin%:${
    result?.contributionMargin
  }answerexample:{ CurrentMetrics: { SellingPrice: "$10.00", TotalCost: "$7.35", GrossProfit: "$2.65", ContributionMargin: "$2.65", GrossProfitMargin: "26.5%", FoodCostPercentage: "35.2%", FoodCostPercentagewithLabor: "80.85%", GrossProfitMarginwithLabor: "26.5%", ContributionMarginwithLabor: "26.5%", }, IndustryAverages: { FoodCostPercentage: "28-35%", LaborCostPercentage: "25-30%", CombinedFoodandLaborCostPercentage: "53-65%", TypicalProfitMargins: "3-6%", }, Comparison: { FoodCostPercentage: "Your current food cost percentage (35.2%) is within the average range for Australian restaurants.", CombinedFoodandLaboCostPercentage: "Your combined percentage (80.85%) is significantly higher than the average, which suggests higher costs relative to revenue.", ProfitMargin: "Your current profit margin is lower compared to the average, indicating potential issues with cost management or pricing strategy.", }, PricingStrategiesAnalysis: { CostBasedPricing: { CostPlusPricing: { Advantages: "Simple and clear calculation. Ensures that basic costs are covered and a stable profit is secured.", Disadvantages: "Does not reflect market demand and competitive environment. Difficult to accurately calculate costs during inflation or cost fluctuations.", Example: "With a current cost of $7.35, adding a 30% margin results in a price of $7.35 * 1.30 = $9.56. This method would keep the price around the current $10.00.", AustralianMarketComparison: { AverageCostPlusPricingMargin: "30%", Analysis: "This approach is common in the Australian market, where restaurants typically add a margin of 25-30% to their costs.", }, }, TargetProfitPricing: { Advantages: "Ensures a specific target profit based on the break-even point.", Disadvantages: "Difficult to forecast demand and may not achieve the set target profit.", Example: "With a target profit margin of 20%, adding this to the total cost of $7.35 results in a price of $7.35 * 1.20 = $8.82.", AustralianMarketComparison: { TypicalTargetProfitMargin: "15-20%", Analysis: "Target profit pricing is used in the Australian market to ensure profitability, typically aiming for a 15-20% profit margin.", }, }, }, DemandBasedPricing: { Advantages: "Sets prices based on customer perception of value and demand intensity. Can increase customer satisfaction and allow for higher prices.", Disadvantages: "Difficult to accurately gauge customer perception of value. Prices may need frequent adjustments based on demand fluctuations.", Example: "Given the unique and high-quality ingredients, 잡채 can be priced at $12.00 to reflect its premium value.", AustralianMarketComparison: { Approach: "Value-based pricing", Analysis: "In Australia, value-based pricing is often used for premium products, setting prices according to perceived value rather than cost.", }, }, CompetitionBasedPricing: { Advantages: "Maintains competitiveness by considering competitor prices.", Disadvantages: "May not fully account for own costs and profitability.", Example: "If nearby competitors are selling 잡채 for $10.00, you could match this price or set it slightly higher at $11.00.", AustralianMarketComparison: { CommonPractice: "Competitive pricing", Analysis: "Australian restaurants frequently use competitive pricing to stay in line with market rates, ensuring they are neither underpriced nor overpriced.", }, }, NewProductPricing: { PriceSkimming: { Advantages: "Quickly recovers initial costs and establishes a premium image.", Disadvantages: "May lose some customers due to high initial prices.", Example: "Set the price of 잡채 at $15.00 initially to maximize early profits, then gradually lower it to $12.00.", AustralianMarketComparison: { Usage: "High for premium launches", Analysis: "Price skimming is used in Australia for new, high-demand products to capitalize on early adopters willing to pay more.", }, }, PenetrationPricing: { Advantages: "Quickly increases market share.", Disadvantages: "Initial profits are lower.", Example: "Set the price of 잡채 at $8.00 initially to attract customers, then raise it to $10.00.", AustralianMarketComparison: { Usage: "Common for new entries", Analysis: "Penetration pricing is common in the Australian market for new businesses aiming to establish a customer base quickly.", }, }, }, }, ComparisonwithAustralianMarket: { FoodCostPercentage: { YourCurrent: "35.2%", AustralianAverage: "28-35%", Analysis: "Your current food cost percentage is within the typical range for Australian restaurants.", }, CombinedFoodandLaborCostPercentage: { YourCurrent: "80.85%", AustralianAverage: "53-65%", Analysis: "Your combined food and labor cost percentage is significantly higher than the average, indicating higher relative costs.", }, ProfitMargins: { YourCurrent: "26.5%", AustralianAverage: "3-6%", Analysis: "Your gross profit margin is higher than the typical profit margins in the industry, but overall profitability is impacted by high labor costs.", }, }, RecommendedPricing: { "Suggested New Price": "$12.00", Rationale: "Combines cost-based and demand-based pricing. 잡채's unique and high-quality ingredients justify a higher price, and $12.00 ensures adequate profit while remaining reasonable to customers.", PotentialIssuewithPriceIncrease: "Raising prices may lead to losing price-sensitive customers, especially if competitors maintain lower prices.", OptimalAdjustmentStrategy: { FoodPriceAdjustment: "Increase the price of 잡채 to $12.00, while keeping other menu items at their current prices or with slight increases. This can increase overall sales without significantly losing customers.", LaborCostManagement: "Optimize labor schedules to manage labor costs effectively. Adjust staffing levels based on demand to minimize labor expenses.", }, }, }; anwer with json format`;

  const handleSubmit = async () => {
    if (
      recipe.name.length === 0 ||
      result.totalCost === 0 ||
      result.grossProfit === 0 ||
      result.foodCostPercentage === 0 ||
      result.foodCostPercentageWithLabour === 0 ||
      result.costPerDish === 0 ||
      result.contributionMarginWithLabour === 0 ||
      result.menuSellingPrice === 0 ||
      result.kitchenRevenue === 0 ||
      recipe.ingredients.length === 0 ||
      recipe.numServings === 0 ||
      recipe.sellingPricePerServing === 0
    ) {
      alert("Please fill in all the required fields");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(
        "/api/chat",
        { prompt: initialPrompt },
        { timeout: 30000 } // 30초 타임아웃 설정
      );

      console.log(res.data.result);
      setResponse(res.data.result);
      setUseCount((prevCount) => prevCount + 1);
      localStorage.setItem("useCount", (useCount + 1).toString());
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      <h1>AI analysis</h1>
      <textarea
        value={additionalInfo}
        onChange={(e) => setAdditionalInfo(e.target.value)}
        placeholder="Add any additional qestions..."
        className="border rounded p-2 w-full h-12"
      />
      <button onClick={handleSubmit} className="btn-fill-blue">
        ChatGPT Analysis
      </button>
      {response && (
        <button
          onClick={() => setIsOpen(true)}
          className="btn-fill-green mt-2"
          disabled={!response}
        >
          View Analysis
        </button>
      )}
      {isOpen && (
        <Analysis
          data={JSON.parse(response)}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
      )}
    </div>
  );
};

export default AiResult;
