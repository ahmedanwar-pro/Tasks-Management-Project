import type { ReactElement } from 'react';
import { Input } from '@/components/ui';
import { SearchIcon } from '../icons/projects-list-icons';

export function ProjectsSearchInput(): ReactElement {
  return (
    <div className="mb-5 md:mb-5">
      <Input
        aria-label="Search projects"
        className="h-14 w-full max-w-[352px] rounded-md border-[#d9e2f2] bg-white px-4 shadow-[0px_1px_2px_rgba(16,24,40,0.04)] md:rounded-[10px]"
        fullWidth
        iconLeft={<SearchIcon className="text-[#7d89b0]" />}
        inputClassName="text-[14px] leading-6 placeholder:text-[#8a94b2]"
        placeholder="Search projects..."
        radius="md"
        type="search"
        variant="bordered"
      />
    </div>
  );
}
