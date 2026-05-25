'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactElement } from 'react';
import { Avatar, DropdownMenu } from '@/components/ui';
import { LogoutAction } from '../sidebar/logout-action';

type HeaderUserMenuProps = {
  displayName: string;
  initials?: string;
  isLogoutPending: boolean;
  onLogout: () => void;
};

export function HeaderUserMenu({
  displayName,
  initials,
  isLogoutPending,
  onLogout,
}: HeaderUserMenuProps): ReactElement {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent): void {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);

    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [menuOpen]);

  function handleLogout(): void {
    setMenuOpen(false);
    onLogout();
  }

  return (
    <div
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setMenuOpen(false);
        }
      }}
      ref={menuRef}
    >
      <DropdownMenu
        align="end"
        aria-label="Open user menu"
        contentClassName="w-40"
        disabled={isLogoutPending}
        label={
          <Avatar
            className="bg-primary-container! text-text-inverse! lg:rounded-md!"
            initials={initials}
            name={displayName}
            size="xl"
          />
        }
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setMenuOpen(false);
          }
        }}
        onOpenChange={setMenuOpen}
        open={menuOpen}
        size="sm"
        triggerClassName="size-10! min-w-0! p-0! lg:rounded-md!"
        variant="ghost"
      >
        <LogoutAction
          isPending={isLogoutPending}
          onLogout={handleLogout}
          presentation="menu"
        />
      </DropdownMenu>
    </div>
  );
}
