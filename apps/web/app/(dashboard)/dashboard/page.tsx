'use client';

import { BookHeart, Users, Calendar, Activity, Plus, ArrowRight } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/stats-card';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const stats = [
  {
    title: 'Total Memories',
    value: 24,
    change: '+3',
    changeType: 'positive' as const,
    icon: 'BookHeart',
  },
  { title: 'Friends', value: 12, change: '+2', changeType: 'positive' as const, icon: 'Users' },
  {
    title: 'Upcoming Events',
    value: 5,
    change: '0',
    changeType: 'neutral' as const,
    icon: 'Calendar',
  },
  { title: 'This Week', value: 8, change: '+4', changeType: 'positive' as const, icon: 'Activity' },
];

const recentMemories = [
  { id: '1', title: 'Coffee with Sarah', date: '2 hours ago', type: 'Friends' },
  { id: '2', title: 'Team offsite planning', date: '1 day ago', type: 'Work' },
  { id: '3', title: 'Birthday dinner', date: '3 days ago', type: 'Family' },
];

const friendsActivity = [
  { id: '1', name: 'Sarah Chen', action: 'added a memory', time: '2h ago' },
  { id: '2', name: 'Alex Rivera', action: 'shared a timeline', time: '5h ago' },
  { id: '3', name: 'Jordan Lee', action: 'sent a reminder', time: '1d ago' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Welcome back, User 👋
          </h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Here&apos;s what&apos;s happening with your memories.
          </p>
        </div>
        <Button className="hidden sm:flex">
          <Plus className="mr-2 h-4 w-4" />
          New Memory
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Memories */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Memories</CardTitle>
              <Button variant="ghost" size="sm">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMemories.map((memory) => (
                <div
                  key={memory.id}
                  className="flex items-center justify-between rounded-xl border border-slate-100 p-4 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 dark:bg-sky-900/30">
                      <BookHeart className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{memory.title}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{memory.date}</p>
                    </div>
                  </div>
                  <Badge>{memory.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Friends Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Friends Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {friendsActivity.map((friend) => (
                <div key={friend.id} className="flex items-center gap-3">
                  <Avatar name={friend.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                      {friend.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {friend.action} · {friend.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: 'Add Memory', icon: BookHeart, color: 'sky' },
              { label: 'Add Friend', icon: Users, color: 'emerald' },
              { label: 'Set Reminder', icon: Calendar, color: 'amber' },
              { label: 'View Timeline', icon: Activity, color: 'purple' },
            ].map((action) => (
              <button
                key={action.label}
                className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 p-4 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/50"
              >
                <action.icon className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
