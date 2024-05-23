// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import openai from '../../../lib/openai';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

   console.log("Received prompt:", prompt); // 디버깅을 위해 prompt를 출력
  const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are professional Restaurant Consultant. " },
                { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
             
            temperature: 0.6,
          });
    return NextResponse.json({ result: response.choices[0].message.content });
  } catch (error) {
    return NextResponse.json({ error: 'Error generating response from OpenAI API' }, { status: 500 });
  }
}
