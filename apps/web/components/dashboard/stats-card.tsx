import {
  BookHeart,
  Users,
  Calendar,
  Activity,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: number | string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: string;
}

const iconMap = {
  BookHeart,
  Users,
  Calendar,
  Activity,
};

const changeColors = {
  positive: 'text-emerald-500',
  negative: 'text-red-500',
  neutral: 'text-slate-400',
};

const changeIcons = {
  positive: TrendingUp,
  negative: TrendingDown,
  neutral: Minus,
};

export function StatsCard({ title, value, change, changeType = 'neutral', icon }: StatsCardProps) {
  const Icon = iconMap[icon as keyof typeof iconMap] || Activity;
  const ChangeIcon = changeIcons[changeType];

  return (
    <Card className="relative overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 dark:bg-sky-900/30">
            <Icon className="h-6 w-6 text-sky-600 dark:text-sky-400" />
          </div>
          {change && (
            <div
              className={cn(
                'flex items-center gap-1 text-sm font-medium',
                changeColors[changeType]
              )}
            >
              <ChangeIcon className="h-4 w-4" />
              <span>{change}</span>
            </div>
          )}
        </div>
        <div className="mt-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-sky-400 to-blue-600" />
    </Card>
  );
}
