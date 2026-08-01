import { z } from 'zod';
import type { loginSchema, registerSchema } from '../validators/auth';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  username?: string;
  phone?: string | null;
  image?: string | null;
  emailVerified?: Date | null;
  status: string;
  createdAt: Date;
}

export interface AuthSession {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  ipAddress?: string | null;
  userAgent?: string | null;
}

export interface AuthResponse {
  success: boolean;
  user?: AuthUser;
  session?: AuthSession;
  error?: string;
  message?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
