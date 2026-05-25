import type { ReactElement } from 'react';
import { IconButton, Logo } from '@/components/ui';
import { LayoutIcon } from '../layout-icons';

type MobileHeaderBrandProps = {
  menuOpen: boolean;
  onOpenMenu: () => void;
};

export function MobileHeaderBrand({
  menuOpen,
  onOpenMenu,
}: MobileHeaderBrandProps): ReactElement {
  return (
    <div className="flex items-center gap-4 lg:hidden">
      <IconButton
        aria-controls="mobile-app-navigation"
        aria-expanded={menuOpen}
        aria-label="Open navigation menu"
        className="size-6.5!"
        icon={<LayoutIcon className="size-[18px]" name="menu" />}
        onClick={onOpenMenu}
        size="sm"
        variant="ghost"
      />
      <Logo className="[&>svg]:hidden" size="md" />
    </div>
  );
}
