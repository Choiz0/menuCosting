import { defaultMaxListeners } from "events";
import React from "react";

interface ImpactOfIncrease {
  newSellingPrice: number;
  grossProfit: number;
  foodCostPercentage: number;
}

interface ImpactOfDecrease {
  newTotalCost: number;
  grossProfit: number;
  ingredientCostRatio: number;
}

interface IngredientCostComparison {
  currentCost: number;
  averageCostInAustralia: number;
  suggestedAction: string;
}

interface Strategies {
  actions: string[];
}

interface ProfitMarginComparison {
  currentProfitMargin: number;
  averageProfitMarginInAustralia: number;
  analysis: string;
  strategiesToAchieveOrExceedAverageProfitMargin: Strategies;
}

interface Analysis {
  impactOfIncreasingMenuSellingPrice: {
    "5%Increase": ImpactOfIncrease;
    "10%Increase": ImpactOfIncrease;
    "15%Increase": ImpactOfIncrease;
  };
  impactOfDecreasingTotalCost: {
    "5%Decrease": ImpactOfDecrease;
    "10%Decrease": ImpactOfDecrease;
    "15%Decrease": ImpactOfDecrease;
  };
  ingredientCostComparison: Record<string, IngredientCostComparison>;
  strategiesToOptimizeFoodCostAndGrossProfit: {
    reduceIngredientCosts: Strategies;
    reduceLabourCosts: Strategies;
    maintainOrImproveFoodCostPercentage: Strategies;
  };
  profitMarginComparison: ProfitMarginComparison;
}

interface AnalysisProps {
  data: { analysis: Analysis };
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  additionalInfoAnswer?: string;
}

const Analysis: React.FC<AnalysisProps> = ({ data, isOpen, setIsOpen }) => {
  const {
    impactOfIncreasingMenuSellingPrice,
    impactOfDecreasingTotalCost,
    ingredientCostComparison,
    strategiesToOptimizeFoodCostAndGrossProfit,
    profitMarginComparison,
    additionalInfoAnswer,
  } = data.analysis;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-6xl w-full z-50 overflow-auto max-h-screen">
            <h1 className="text-2xl font-bold">Analysis Results</h1>

            <h2 className="text-xl font-semibold my-2">
              Impact of Increasing Menu Selling Price
            </h2>
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm mb-8">
              <thead className="text-left">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Increase
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    New Selling Price
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Gross Profit
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Food Cost Percentage
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Object.entries(impactOfIncreasingMenuSellingPrice).map(
                  ([key, value]) => (
                    <tr key={key} className="odd:bg-gray-50">
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        {key}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {Number(value.newSellingPrice).toFixed(2)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {Number(value.grossProfit).toFixed(2)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {Number(value.foodCostPercentage).toFixed(2)}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>

            <h2 className="text-xl font-semibold my-2">
              Impact of Decreasing Total Cost
            </h2>
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm mb-8">
              <thead className="text-left">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Decrease
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    New Total Cost
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Gross Profit
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Ingredient Cost Ratio
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Object.entries(impactOfDecreasingTotalCost).map(
                  ([key, value]) => (
                    <tr key={key} className="odd:bg-gray-50">
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        {key}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {Number(value.newTotalCost).toFixed(2)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {Number(value.grossProfit).toFixed(2)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {Number(value.ingredientCostRatio).toFixed(2)}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>

            <h2 className="text-xl font-semibold my-2">
              Ingredient Cost Comparison
            </h2>
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm mb-8">
              <thead className="text-left">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Ingredient
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Current Cost
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Average Cost in Australia
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Suggested Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {ingredientCostComparison &&
                  Object.entries(ingredientCostComparison).map(
                    ([ingredient, details]) => (
                      <tr key={ingredient} className="odd:bg-gray-50">
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          {ingredient}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          {Number(details.currentCost).toFixed(2)}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          {Number(details.averageCostInAustralia).toFixed(2)}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          {details.suggestedAction}
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>

            <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow-md mb-8">
                <div className="px-6 py-4 bg-blue-500 text-white font-bold uppercase rounded-tl-lg rounded-tr-lg">
                  Strategies to Optimize Food Cost and Gross Profit
                </div>
                <div className="p-6 bg-white border-b border-gray-200">
                  <h3 className="text-lg font-bold mb-2">
                    Reduce Ingredient Costs
                  </h3>
                  <ul>
                    {strategiesToOptimizeFoodCostAndGrossProfit?.reduceIngredientCosts?.actions?.map(
                      (action, index) => (
                        <li key={index} className="flex items-center">
                          <svg
                            className="h-4 w-4 text-blue-500 mr-2"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {action}
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div className="p-6 bg-white border-b border-gray-200">
                  <h3 className="text-lg font-bold mb-2">
                    Reduce Labour Costs
                  </h3>
                  <ul>
                    {strategiesToOptimizeFoodCostAndGrossProfit?.reduceLabourCosts?.actions?.map(
                      (action, index) => (
                        <li key={index} className="flex items-center">
                          <svg
                            className="h-4 w-4 text-blue-500 mr-2"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {action}
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div className="p-6 bg-white border-b border-gray-200">
                  <h3 className="text-lg font-bold mb-2">
                    Maintain or Improve Food Cost Percentage
                  </h3>
                  <ul>
                    {strategiesToOptimizeFoodCostAndGrossProfit?.maintainOrImproveFoodCostPercentage?.actions?.map(
                      (action, index) => (
                        <li key={index} className="flex items-center">
                          <svg
                            className="h-4 w-4 text-blue-500 mr-2"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {action}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>

            <div className="max-w-2xl mx-auto sm:px-6 lg:px-8 mt-6">
              <div className="overflow-hidden shadow-md">
                <div className="px-6 py-4 bg-blue-500 text-white font-bold uppercase rounded-tl-lg rounded-tr-lg">
                  Profit Margin Comparison
                </div>
                <div className="p-6 bg-white border-b border-gray-200">
                  <div className="flex space-x-4">
                    <p>
                      Current Profit Margin:{" "}
                      {Number(
                        profitMarginComparison?.currentProfitMargin
                      ).toFixed(2)}
                      %
                    </p>
                    <div className="bg-blue-800 px-1 rounded-xl text-white">
                      VS
                    </div>
                    <p>
                      Average Profit Margin in Australia:{" "}
                      {Number(
                        profitMarginComparison?.averageProfitMarginInAustralia
                      ).toFixed(2)}
                      %
                    </p>
                  </div>
                  <p>
                    Analysis :<div>{profitMarginComparison?.analysis}</div>
                  </p>
                </div>
                <div className="p-6 bg-white border-b border-gray-200">
                  <h3 className="text-lg font-bold mb-2">
                    Strategies to Achieve or Exceed Average Profit Margin
                  </h3>
                  <ul>
                    {profitMarginComparison?.strategiesToAchieveOrExceedAverageProfitMargin?.actions?.map(
                      (action, index) => (
                        <li key={index} className="flex items-center">
                          <svg
                            className="h-4 w-4 text-blue-500 mr-2"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {action}
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div className="p-6 bg-white border-b border-gray-200">
                  <h3 className="text-lg font-bold mb-2">
                    Additional your question's answer
                  </h3>
                  <ul>
                    <svg
                      className="h-4 w-4 text-blue-500 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {additionalInfoAnswer || ""}
                  </ul>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Analysis;
