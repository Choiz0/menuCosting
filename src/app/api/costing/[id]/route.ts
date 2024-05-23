import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CostingResult from '@/app/models/CostingResult';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
    const { id } = params;
   
  if (!id) {
    return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
  }

  try {
    const result = await CostingResult.findOne({ recipeId: id });
    if (!result) {
      return NextResponse.json({ success: false, error: "result not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    const result = await CostingResult.create(body);
    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) { 
  await dbConnect();
  const { id } = params;

  if (!id) {
    return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const result = await CostingResult.findOneAndUpdate(
      { recipeId: id },
      body,
      { new: true, runValidators: true }
    );
    if (!result) {
      return NextResponse.json({ success: false, error: "result not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}