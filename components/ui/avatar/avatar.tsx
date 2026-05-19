/* eslint-disable @next/next/no-img-element */
import type { HTMLAttributes, ReactElement } from 'react';
import { joinClasses } from '../utils';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type AvatarStatus = 'online' | 'offline' | 'busy';

type AvatarProps = {
  src?: string;
  initials?: string;
  name?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  className?: string;
} & Omit<HTMLAttributes<HTMLSpanElement>, 'children' | 'className'>;

const baseClasses =
  'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-surface-high font-sans font-bold tracking-normal text-text-primary shadow-sm';

const sizeClasses: Record<AvatarSize, string> = {
  xs: 'size-5 text-label-sm leading-compact',
  sm: 'size-6 text-label-sm leading-compact',
  md: 'size-7 text-label-sm leading-compact',
  lg: 'size-8 text-label-sm leading-compact',
  xl: 'size-10 text-body-md leading-relaxed',
  '2xl': 'size-12 text-body-sm leading-base',
};

const statusClasses: Record<AvatarStatus, string> = {
  online: 'bg-success-strong',
  offline: 'bg-text-subtle',
  busy: 'bg-danger',
};

const statusSizeClasses: Record<AvatarSize, string> = {
  xs: 'size-1.5',
  sm: 'size-1.5',
  md: 'size-2',
  lg: 'size-2',
  xl: 'size-2.5',
  '2xl': 'size-2.5',
};

function getInitials(name?: string): string {
  if (!name) {
    return '';
  }

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();
}

export function Avatar({
  src,
  initials,
  name,
  size = 'xl',
  status,
  className,
  ...props
}: AvatarProps): ReactElement {
  const avatarInitials = initials ?? getInitials(name);
  const label = name ?? avatarInitials;
  const ariaLabel = status && label ? `${label}, ${status}` : label;

  return (
    <span
      {...props}
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel || undefined}
      className={joinClasses(baseClasses, sizeClasses[size], className)}
      role={ariaLabel ? 'img' : undefined}
    >
      {src ? (
        <img alt="" className="size-full object-cover" src={src} />
      ) : (
        <span aria-hidden="true">{avatarInitials}</span>
      )}
      {status ? (
        <span
          aria-hidden="true"
          className={joinClasses(
            'absolute bottom-0 right-0 rounded-lg ring-2 ring-surface',
            statusClasses[status],
            statusSizeClasses[size],
          )}
        />
      ) : null}
    </span>
  );
}
