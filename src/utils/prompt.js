export const generatePrompt = (recipe, result, additionalInfo) => {
  return `Please provide a detailed price analysis to increase the profit margin for the recipe with the following details: recipe name: ${
    recipe?.name
  }, total cost: ${result?.totalCost}, gross profit: ${
    result?.grossProfit
  }, food cost percentage: ${
    result?.foodCostPercentage
  }, food cost percentage with labour: ${
    result?.foodCostPercentageWithLabour
  }, cost per dish: ${result?.costPerDish}, contribution margin with labour: ${
    result?.contributionMarginWithLabour
  }, menu selling price: ${result?.menuSellingPrice}, less GST: ${
    result?.lessGst
  }, kitchen revenue: ${result?.kitchenRevenue}, labour cost: ${
    result?.labourCost
  }, cost per portion with labour: ${
    result?.costPerPortionWithLabour
  }, ingredients: ${JSON.stringify(recipe?.ingredients)}, number of servings: ${
    recipe?.numServings
  }, selling price per serving: ${
    recipe?.sellingPricePerServing
  }, labour cost per hour: ${recipe?.labourCostPerHour}, prep time: ${
    recipe?.timeTaken
  }, and GST percentage: ${
    recipe?.gstPercentage
  },(additional question): ${additionalInfo}. Please refer my data and your role is 1. Analyze the impact of increasing the menu selling price by 5%, 10%, and 15%. Calculate the new selling price, gross profit, and food cost percentages for each scenario. 2. Analyze the impact of decreasing the total cost by 5%, 10%, and 15%.
   Calculate the new total cost, gross profit, and ingredient cost ratios for each scenario. 3. Compare the cost of ingredients in this recipe to the average cost of similar ingredients in Australia. Provide specific comparisons and suggest alternative ingredients or suppliers that could reduce costs without compromising quality. 4. Provide strategies to optimize the food cost percentage and gross profit.  Explain specific actions that can be taken to reduce ingredient costs or labour costs while maintaining or improving the current food cost
     percentage and gross profit. 5. Compare the profit margin of this recipe to the average profit margin of similar restaurants in Australia.  Provide the average profit margin for similar restaurants in Australia and analyze how this recipe's profit margin compares to the industry average. Suggest specific strategies to achieve or exceed the average profit margin in Australia.  ex) {"analysis":{"impactOfIncreasingMenuSellingPrice":{"5%Increase":{"newSellingPrice":26.25,"grossProfit":18.7,"foodCostPercentage":28.76},"10%Increase":{"newSellingPrice":27.5,"grossProfit":19.95,"foodCostPercentage":27.45},"15%Increase":{"newSellingPrice":28.75,"grossProfit":21.2,"foodCostPercentage":26.26}},"impactOfDecreasingTotalCost":{"5%Decrease":{"newTotalCost":7.1725,"grossProfit":17.8275,"ingredientCostRatio":28.8},"10%Decrease":{"newTotalCost":6.795,"grossProfit":18.205,"ingredientCostRatio":27.18},"15%Decrease":{"newTotalCost":6.4175,"grossProfit":18.5825,"ingredientCostRatio":25.67}},"ingredientCostComparison":{"octopusBabyFresh":{"currentCost":4.91,"averageCostInAustralia":4.5,"suggestedAction":"Consider sourcing from suppliers offering a price closer to the average to save on costs."},"citrusOil":{"currentCost":0.14,"averageCostInAustralia":0.12,"suggestedAction":"Negotiate with current supplier or find an alternative supplier to reduce costs."},"herbSalad":{"currentCost":0,"averageCostInAustralia":0,"suggestedAction":"No action required as cost is already optimized."},"sweetPotatoPuree":{"currentCost":0,"averageCostInAustralia":0,"suggestedAction":"No action required as cost is already optimized."}},"strategiesToOptimizeFoodCostAndGrossProfit":{"reduceIngredientCosts":{"actions":["Negotiate better pricing with current suppliers.","Source alternative suppliers for better rates.","Buy ingredients in bulk to take advantage of volume discounts."]},"reduceLabourCosts":{"actions":["Streamline kitchen operations to reduce prep time.","Cross-train staff to improve efficiency.","Utilize part-time or temporary staff during peak hours."]},"maintainOrImproveFoodCostPercentage":{"actions":["Regularly review and adjust portion sizes to minimize waste.","Implement strict inventory management to reduce spoilage and overstocking.","Introduce seasonal menu items to take advantage of lower-cost ingredients."]}},"profitMarginComparison":{"currentProfitMargin":70.7,"averageProfitMarginInAustralia":65,"analysis":"The current profit margin of 70.7% is above the industry average of 65%. This indicates that the recipe is performing well in terms of profitability.","strategiesToAchieveOrExceedAverageProfitMargin":{"actions":["Continue to monitor and adjust pricing based on market trends.","Focus on maintaining high-quality ingredients while managing costs.","Invest in marketing to increase sales volume and capitalize on the high profit margin."]}},"additionalInfoAnswer":Answer ther this question ${additionalInfo}.provide few sentences "}}`;
};
