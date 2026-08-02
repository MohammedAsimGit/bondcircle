import { auth } from '@/lib/auth/config';
import { NextRequest, NextResponse } from 'next/server';

async function handler(request: NextRequest) {
  try {
    const response = await auth.handler(request);
    return response;
  } catch (error) {
    console.error('[Auth API Error]', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}

export const GET = handler;
export const POST = handler;
