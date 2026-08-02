export interface User {
  id: string;
  name: string;
  email: string;
  username?: string;
  image?: string;
  emailVerified: boolean;
  status: string;
  createdAt: string;
}

export interface Memory {
  id: string;
  title: string;
  content?: string;
  memoryDate?: string;
  location?: string;
  visibility: 'PRIVATE' | 'FRIENDS' | 'PUBLIC';
  createdAt: string;
}

export interface Friend {
  id: string;
  name: string;
  email: string;
  image?: string;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'BLOCKED';
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

export interface StatsCard {
  title: string;
  value: number | string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: string;
}
