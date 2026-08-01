'use client';

import { useSession } from '@/lib/auth/client';
import LogoutButton from './logout-button';

export default function UserNav() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <div className="text-sm">
        <p className="font-medium text-gray-900">{session.user.name}</p>
        <p className="text-gray-500">{session.user.email}</p>
      </div>
      <LogoutButton />
    </div>
  );
}
