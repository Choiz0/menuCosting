import connectDB from "../../../lib/mongodb";
import Recipe from "../../models/Recipe";

export async function GET() {
  try {
    await connectDB();
    return new Response(
      JSON.stringify({ message: "Database connection successful!" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Database connection failed.",
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
