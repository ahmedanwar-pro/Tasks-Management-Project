import type { ReactElement } from 'react';
import { Input } from '@/components/ui';
import { SearchIcon } from '../icons/project-epics-icons';

export function ProjectEpicsSearchInput(): ReactElement {
  return (
    <Input
      aria-label="Search epics"
      className="h-12 rounded-md text-[14px] leading-normal lg:min-w-[300px] lg:w-[303px] lg:gap-0 lg:rounded-xs lg:px-3"
      fullWidth
      iconLeft={<SearchIcon className="text-text-muted lg:size-[10.5px]" />}
      inputClassName="placeholder:text-text-muted/60 lg:placeholder:text-text-muted"
      placeholder="Search Epics..."
      type="search"
    />
  );
}
