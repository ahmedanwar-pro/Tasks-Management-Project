import type { ReactElement } from 'react';

export function ProjectTip(): ReactElement {
  return (
    <aside className="bg-surface-low mt-12 rounded-md p-6 lg:mt-0 lg:flex lg:items-start lg:gap-3 lg:rounded-none">
      <svg
        aria-hidden="true"
        className="text-text-tertiary size-icon-sm mt-0.5 hidden shrink-0 lg:block"
        fill="none"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.5 9a3.5 3.5 0 0 1-2 3.16V14H8.5v-1.84A3.5 3.5 0 1 1 13.5 9ZM8.5 17h3"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.3"
        />
      </svg>
      <p className="text-label-md text-text-tertiary leading-[19.5px]">
        <strong className="block font-bold lg:inline">Pro Tip</strong>
        <span className="mt-2 block font-normal lg:mt-0 lg:inline">
          <span className="hidden lg:inline">: </span>
          You can invite project members and assign epics immediately after the
          initial creation process.
        </span>
      </p>
    </aside>
  );
}
