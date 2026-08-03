import { auth } from '@/lib/auth/config';
import { NextRequest, NextResponse } from 'next/server';

async function handler(request: NextRequest) {
  try {
    const response = await auth.handler(request);

    const nextResponse = new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: new Headers(),
    });

    const setCookieHeaders = response.headers.getSetCookie?.() ?? [];
    if (setCookieHeaders.length > 0) {
      for (const header of setCookieHeaders) {
        nextResponse.headers.append('set-cookie', header);
      }
    } else {
      const single = response.headers.get('set-cookie');
      if (single) {
        nextResponse.headers.set('set-cookie', single);
      }
    }

    response.headers.forEach((value, key) => {
      if (key.toLowerCase() !== 'set-cookie') {
        nextResponse.headers.set(key, value);
      }
    });

    return nextResponse;
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}

export const GET = handler;
export const POST = handler;
