import type { ReactElement } from 'react';
import { Input } from '@/components/ui';
import { SearchIcon } from '../icons/project-epics-icons';

type ProjectEpicsSearchInputProps = {
  onChange: (value: string) => void;
  value: string;
};

export function ProjectEpicsSearchInput({
  onChange,
  value,
}: ProjectEpicsSearchInputProps): ReactElement {
  return (
    <Input
      aria-label="Search epics"
      className="h-12 rounded-md text-[14px] leading-normal lg:w-[303px] lg:min-w-[300px] lg:gap-0 lg:rounded-xs lg:px-3"
      fullWidth
      iconLeft={<SearchIcon className="text-text-muted lg:size-[10.5px]" />}
      inputClassName="placeholder:text-text-muted/60 lg:placeholder:text-text-muted"
      onChange={(event) => {
        onChange(event.target.value);
      }}
      placeholder="Search Epics..."
      type="search"
      value={value}
    />
  );
}
