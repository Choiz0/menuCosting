import dbConnect from "../../../lib/mongodb";
import Recipe from "@/app/models/Recipe";


import { NextRequest, NextResponse } from 'next/server';


// Handle POST requests
export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    const recipe = await Recipe.create(body);
    return NextResponse.json({ success: true, data: recipe }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// Handle GET requests
// export async function GET() {
//   await dbConnect();
//   try {
//     const recipes = await Recipe.find({});
//     return NextResponse.json({ success: true, data: recipes }, { status: 200 });
//   } catch (error: any) {
//     return NextResponse.json({ success: false, error: error.message }, { status: 400 });
//   }
// }



// Handle GET requests
export async function GET(req: NextRequest,) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
  

    console.log("Received userId:", userId); // 디버깅을 위해 userId를 출력

    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 });
    }

    const recipes = await Recipe.find({ userId });
    return NextResponse.json({ success: true, data: recipes }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}