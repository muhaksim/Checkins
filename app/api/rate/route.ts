// app/api/submitRating/route.ts
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

// Define your schema for structured output
interface RatingResponse {
  userName: string;
  rating: number;
  feedback: string;
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(req: Request) {
  try {
    const { userName } = await req.json();

    // Define the rating schema
    const ratingSchema = {
      type: 'object',
      properties: {
        userName: { type: 'string' },
        rating: { type: 'number', minimum: 1, maximum: 5 },
        feedback: { type: 'string' },
      },
      required: ['userName', 'rating', 'feedback'],
    };

    // Create a completion request for structured outputs
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that rates the user\'s experience after a call.',
        },
        {
          role: 'user',
          content: `The call with ${userName} just ended. Please provide a rating out of 5 and brief feedback.`,
        },
      ],
      functions: [{
        name: 'provideRating',
        description: 'Provide a rating and feedback for the user\'s call experience',
        parameters: ratingSchema
      }],
      function_call: { name: 'provideRating' }
    });

    const ratingResponse: RatingResponse = JSON.parse(completion.choices[0].message.function_call?.arguments || '{}');

    return NextResponse.json({
      success: true,
      data: ratingResponse,
    });

  } catch (error) {
    console.error('Error in LLM rating request:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to get LLM rating.',
    });
  }
}