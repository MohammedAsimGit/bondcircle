import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass';
}

function Card({ className, variant = 'default', ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border transition-all duration-200',
        {
          'border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800/50':
            variant === 'default',
          'border-white/20 bg-white/10 backdrop-blur-xl shadow-xl dark:border-white/10 dark:bg-white/5':
            variant === 'glass',
        },
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-6 pt-6', className)} {...props} />;
}

function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-6 pb-6', className)} {...props} />;
}

function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-lg font-semibold text-slate-900 dark:text-white', className)}
      {...props}
    />
  );
}

export { Card, CardHeader, CardContent, CardTitle };
