import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import CostingResult from "@/app/models/CostingResult";

// Handle POST requests
export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    const costingResult = await CostingResult.create(body);
    return NextResponse.json(
      { success: true, data: costingResult },
      { status: 201 }
    );
  } catch (error:any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// Handle GET requests
export async function GET() {
  await dbConnect();
  try {
    const costingResults = await CostingResult.find({});
    return NextResponse.json(
      { success: true, data: costingResults },
      { status: 200 }
    );
  } catch (error:any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

