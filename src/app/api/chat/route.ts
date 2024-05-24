import { NextRequest, NextResponse } from 'next/server';
import openai from '../../../lib/openai';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    console.log("Received prompt:", prompt); // 디버깅을 위해 prompt를 출력

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You are professional Restaurant Consultant." },
        { role: "user", content: prompt },
       
      ],
    
      temperature: 0.6,
    });

    console.log("OpenAI response:", response); // OpenAI 응답을 출력

    return NextResponse.json({ result: response.choices[0].message.content });
  } catch (error: any) {
    console.error("Error generating response from OpenAI API:", error); // 오류를 콘솔에 출력
    return NextResponse.json({ error: 'Error generating response from OpenAI API', details: error.message }, { status: 500 });
  }
}
