import { NextResponse } from 'next/server';
import type { ApiResponse } from './auth/types';

export function successResponse<T>(
  data: T,
  message?: string,
  status = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}

export function errorResponse(
  error: string,
  status = 400,
  details?: Record<string, string[]>
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error,
      message: details ? JSON.stringify(details) : undefined,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}

export function unauthorizedResponse(
  message = 'Authentication required'
): NextResponse<ApiResponse> {
  return errorResponse(message, 401);
}

export function forbiddenResponse(message = 'Insufficient permissions'): NextResponse<ApiResponse> {
  return errorResponse(message, 403);
}

export function notFoundResponse(message = 'Resource not found'): NextResponse<ApiResponse> {
  return errorResponse(message, 404);
}

export function conflictResponse(message = 'Resource already exists'): NextResponse<ApiResponse> {
  return errorResponse(message, 409);
}

export function validationErrorResponse(
  errors: Record<string, string[]>
): NextResponse<ApiResponse> {
  return errorResponse('Validation failed', 422, errors);
}

export function serverErrorResponse(message = 'Internal server error'): NextResponse<ApiResponse> {
  return errorResponse(message, 500);
}
