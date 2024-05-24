"use client";

import { Result, Recipe } from "../types";
import { useRouter } from "next/navigation";
import TableRow from "./DisplayTableRow";
import { useEffect } from "react";

interface ResultDisplayProps {
  result: Result | null | undefined;
  recipe: Recipe;
  handleSave?: () => void | Promise<void>;
  isDetail?: boolean;
  isUpdate?: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  result,
  recipe,
  handleSave,
  isDetail = false,
  isUpdate,
}) => {
  const router = useRouter();

  const handleSaveButton = async () => {
    if (result !== undefined && result !== null && handleSave) {
      await handleSave();
    }

    router.push("/mypage");
  };

  const groupedRows = [
    [
      {
        label: "Menu Selling Price",
        value: `${result?.menuSellingPrice}$`,
        description: "Price per serving",
        bgColorClass: "bg-yellow-50",
        tooltip:
          "The selling price per serving. This price is a crucial factor in determining revenue.",
      },
      {
        label: "Less GST",
        value: `${result?.lessGst?.toFixed(2)}$`,
        description: "Price without GST",
        bgColorClass: "bg-green-50",
        tooltip:
          " The price excluding 10% GST in Au. This value is important for calculating actual revenue. Menu Selling Price * (1 - GST Percentage / 100)",
      },
      {
        label: "Kitchen Revenue",
        value: `${result?.kitchenRevenue?.toFixed(2)}$`,
        description: "Total revenue from kitchen",
        bgColorClass: "bg-blue-50",
        tooltip:
          "The total revenue generated from the kitchen. It is essential for evaluating overall revenue.Calculation: (Menu Selling Price / (1 + GST Percentage / 100)) * Number of Servings",
      },
    ],
    [
      {
        label: "Food Cost Percentage",
        value: `${
          result?.foodCostPercentage?.toFixed(2) === "NaN"
            ? "0"
            : result?.foodCostPercentage?.toFixed(2)
        }%`,
        description: "Percentage of revenue spent on food",
        bgColorClass: "bg-yellow-50",
        tooltip:
          "The percentage of revenue spent on ingredients. This is a key factor in pricing and cost management. Calculation: (Ingredients Cost / Kitchen Revenue) * 100",
      },
      {
        label: "Gross Profit",
        value: `${result?.grossProfit?.toFixed(2)}$`,
        description: "Total profit after deducting costs",
        bgColorClass: "bg-green-50",
        tooltip:
          "The total revenue after deducting costs. It directly shows the profitability of the business. Calculation: Kitchen Revenue - Ingredients Cost",
      },
    ],
    [
      {
        label: "Total Cost",
        value: `${result?.totalCost?.toFixed(2)}$`,
        description: "Overall cost for the entire recipe",
        bgColorClass: "bg-yellow-50",
        tooltip:
          "The total cost for the entire recipe. It is a critical value for cost management. Calculation: Ingredients Cost + Labour Cost + GST Amount",
      },
      {
        label: "Cost Per Dish",
        value: `${result?.costPerDish?.toFixed(2)}$`,
        description: "Cost to prepare one serving",
        bgColorClass: "bg-green-50",
        tooltip:
          "The cost to prepare one serving. This is important for pricing and evaluating profitability.Calculation: Total Cost / Number of Servings",
      },
    ],
    [
      {
        label: "Labour per hour",
        value: `${recipe?.labourCostPerHour}$`,
        description: "Labour cost per hour",
        bgColorClass: "bg-yellow-50",
        tooltip: "Labour cost per hour for the recipe",
      },
      {
        label: "Time Taken",
        value: `${recipe?.timeTaken}`,
        description: "Time taken to prepare the recipe",
        bgColorClass: "bg-green-50",
        tooltip: "Time taken to prepare the recipe",
      },
      {
        label: "Labour Cost",
        value: `${result?.labourCost?.toFixed(2)}$`,
        description: "Labour cost for the recipe",
        bgColorClass: "bg-blue-50",
        tooltip:
          "The cost of labor involved in preparing the recipe. Managing labor costs significantly impacts the overall cost structure of the business.Calculation: (Labour Cost Per Hour / 60) * Time Taken",
      },
    ],
    [
      {
        label: "Contribution Margin with Labour",
        value: `${result?.contributionMarginWithLabour?.toFixed(2)}$`,
        description: "Contribution margin with labour",
        bgColorClass: "bg-green-50",
        tooltip:
          "The contribution margin including labor costs. This is a crucial indicator of profitability. Calculation: Kitchen Revenue - Total Cost",
      },
      {
        label: "Food Cost Percentage with Labour",
        value: `${result?.foodCostPercentageWithLabour?.toFixed(2)}%`,
        description: "Percentage of revenue spent on food including labour",
        bgColorClass: "bg-yellow-50",
        tooltip:
          "The percentage of revenue spent on ingredients including labor costs. This is a key factor in pricing and cost management. Calculation: (Total Cost / Kitchen Revenue) * 100",
      },
    ],
    [
      {
        label: "Cost per Portion Including Labour",
        value: `${result?.costPerPortionWithLabour?.toFixed(2)}$`,
        description: "Cost per portion including labour",
        bgColorClass: "bg-yellow-50",
        tooltip:
          "The cost per serving including labor costs. This value is closely related to final pricing. Calculation: Total Cost / Number of Servings",
      },
      {
        label: "Gross Profit Margin",
        value: `${result?.grossProfitMargin?.toFixed(2)}%`,
        description: "Profit margin for the recipe",
        bgColorClass: "bg-green-50",
        tooltip:
          "The profit margin for the recipe. This value is essential for evaluating profitability. Calculation: (Gross Profit / Kitchen Revenue) * 100",
      },
      {
        label: "Contribution Margin",
        value: `${result?.contributionMargin?.toFixed(2)}%`,
        description: "Percentage of revenue spent on food including labour",
        bgColorClass: "bg-blue-50",
        tooltip:
          "The percentage of revenue spent on ingredients including labor costs. This is a key factor in pricing and cost management. Calculation: (Contribution Margin / Kitchen Revenue) * 100",
      },
    ],
  ];

  return (
    <div className="flex flex-col bg-white border border-slate-900/10  shadow-md shadow-slate-900/5 rounded-lg md:p-10">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold text-center">{recipe?.name}</h2>
        {!isDetail && !isUpdate && (
          <button
            type="button"
            onClick={handleSaveButton}
            className="btn-fill-blue"
          >
            Save
          </button>
        )}
      </div>
      <div className="flex flex-col items-center">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-slate-900">
          {groupedRows.map((group, index) => (
            <li
              key={index}
              className="border border-slate-900/10 bg-white shadow-md shadow-slate-900/5 rounded-lg"
            >
              <table className="min-w-full divide-y divide-gray-200 min-h-full h-full">
                <tbody className="bg-white divide-y divide-gray-200 h-ful">
                  {group.map((row, rowIndex) => (
                    <TableRow
                      key={rowIndex}
                      label={row.label}
                      value={row.value}
                      description={row.description}
                      bgColorClass={row.bgColorClass}
                      tooltip={row.tooltip}
                    />
                  ))}
                </tbody>
              </table>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResultDisplay;
