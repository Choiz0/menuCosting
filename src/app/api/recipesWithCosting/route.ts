import dbConnect from '../../../lib/mongodb';
import Recipe from '@/app/models/Recipe';
import CostingResult from '@/app/models/CostingResult';
import { NextRequest, NextResponse } from 'next/server';

// Handle GET requests
export async function GET() {
  await dbConnect();
  try {
    const recipes = await Recipe.find({}).lean();
    const costingResults = await CostingResult.find({}).lean();

    const mergedData = recipes.map(recipe => {
      const costing = costingResults.find(cr => cr.recipeId.toString() === recipe._id.toString());
      return {
        ...recipe,
        costingResult: costing || null,
      };
    });

    return NextResponse.json({ success: true, data: mergedData }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
