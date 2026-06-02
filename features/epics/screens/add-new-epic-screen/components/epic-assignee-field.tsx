import type { ReactElement } from 'react';
import { FormField } from '@/components/forms';

function SelectChevron(): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className="size-icon-md text-text-tertiary pointer-events-none absolute top-1/2 right-4 -translate-y-1/2"
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m5 7.5 5 5 5-5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

export function EpicAssigneeField(): ReactElement {
  return (
    <FormField
      className="gap-2 lg:gap-4"
      label="Assignee"
      labelClassName="text-[11px] leading-[16.5px] tracking-[1.1px]"
    >
      {({ inputId, descriptionId }) => (
        <div className="relative w-full">
          <select
            aria-describedby={descriptionId}
            className="bg-primary-container-muted text-text-primary focus-visible:outline-primary text-body-md h-(--control-height-xl) w-full appearance-none rounded-sm border border-transparent px-4 pr-10 leading-relaxed transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
            defaultValue=""
            id={inputId}
          >
            <option disabled value="">
              Select a member...
            </option>
          </select>
          <SelectChevron />
        </div>
      )}
    </FormField>
  );
}
