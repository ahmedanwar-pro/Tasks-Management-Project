/* eslint-disable @next/next/no-img-element */
import type { HTMLAttributes, ReactElement } from 'react';
import { getUserInitials } from '@/components/layout/utils/get-user-initials';
import { joinClasses } from '../utils';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type AvatarStatus = 'online' | 'offline' | 'busy';
type AvatarTone = 'default' | 'custom';

type AvatarProps = {
  src?: string;
  initials?: string;
  name?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  tone?: AvatarTone;
  className?: string;
} & Omit<HTMLAttributes<HTMLSpanElement>, 'children' | 'className'>;

const baseClasses =
  'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-lg font-sans font-bold tracking-normal shadow-sm';

const toneClasses: Record<AvatarTone, string> = {
  default: 'bg-surface-high text-text-primary',
  custom: '',
};

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

export function Avatar({
  src,
  initials,
  name,
  size = 'xl',
  status,
  tone = 'default',
  className,
  ...props
}: AvatarProps): ReactElement {
  const avatarInitials = initials ?? getUserInitials(name ?? '');
  const label = name ?? avatarInitials;
  const ariaLabel = status && label ? `${label}, ${status}` : label;

  return (
    <span
      {...props}
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel || undefined}
      className={joinClasses(
        baseClasses,
        toneClasses[tone],
        sizeClasses[size],
        className,
      )}
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
            'ring-surface absolute right-0 bottom-0 rounded-lg ring-2',
            statusClasses[status],
            statusSizeClasses[size],
          )}
        />
      ) : null}
    </span>
  );
}
