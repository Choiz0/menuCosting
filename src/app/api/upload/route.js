import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import { revalidatePath } from "next/cache";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    await fs.writeFile(`./public/uploads/${file.name}`, buffer);
    revalidatePath("/");

    return NextResponse.json({
      status: "success",
      path: `/uploads/${file.name}`,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: "fail", error: e.message });
  }
}
