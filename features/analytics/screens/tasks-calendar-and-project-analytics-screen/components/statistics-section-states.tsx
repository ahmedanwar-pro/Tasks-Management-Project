import type { ReactElement } from 'react';
import { Button, Card } from '@/components/ui';

export function SkeletonBlock({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`bg-surface-muted block animate-pulse rounded-xs ${className}`}
    />
  );
}

export function RefreshingIndicator({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <span
      aria-hidden="true"
      className="text-text-muted text-[10px] leading-[15px] font-bold tracking-[0.08em] uppercase"
    >
      Refreshing…
    </span>
  );
}

export function SectionBackgroundError({
  message,
  onRetry,
  show,
}: {
  message: string;
  onRetry: () => void;
  show: boolean;
}) {
  if (!show) return null;

  return (
    <div
      className="text-danger flex items-center gap-2 text-xs font-medium"
      role="alert"
    >
      <span>{message}</span>
      <button
        className="focus-visible:outline-primary rounded-xs underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2"
        onClick={onRetry}
        type="button"
      >
        Retry
      </button>
    </div>
  );
}

export function SectionError({
  className,
  message,
  onRetry,
  title,
}: {
  className?: string;
  message: string;
  onRetry: () => void;
  title: string;
}): ReactElement {
  return (
    <Card
      className={`flex flex-col items-start justify-center gap-3 p-5 lg:p-6 ${className ?? ''}`}
      padding="none"
      role="alert"
    >
      <h3 className="text-text-primary text-base font-bold">{title}</h3>
      <p className="text-text-secondary text-sm">{message}</p>
      <Button onClick={onRetry} size="sm" variant="secondary">
        Retry
      </Button>
    </Card>
  );
}
