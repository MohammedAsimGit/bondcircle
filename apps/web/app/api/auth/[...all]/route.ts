import { auth } from '@/lib/auth/config';
import { NextRequest, NextResponse } from 'next/server';

async function handler(request: NextRequest) {
  try {
    console.log('[Auth] Request:', request.method, request.url);
    const response = await auth.handler(request);
    console.log('[Auth] Response status:', response.status);
    return response;
  } catch (error) {
    console.error('[Auth] FATAL ERROR:', error);
    console.error('[Auth] Error stack:', error instanceof Error ? error.stack : 'No stack');
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}

export const GET = handler;
export const POST = handler;
