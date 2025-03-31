import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const language = searchParams.get('language') || 'en-US';
    
    const flaskResponse = await fetch(
      `http://localhost:5000/transcribe?language=${language}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!flaskResponse.ok) {
      throw new Error('Failed to connect to transcription service');
    }

    return new NextResponse(flaskResponse.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}