import type { ReactElement } from 'react';

function EditProjectIcon(): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className="text-primary-container hidden h-11 w-11.5 shrink-0 lg:block"
      fill="none"
      viewBox="0 0 46 44"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        fill="currentColor"
        fillOpacity="0.1"
        height="44"
        rx="4"
        width="46"
      />
      <path
        d="M22 32C16.48 32 12 27.52 12 22s4.48-10 10-10c2 0 3.86.59 5.42 1.61l-1.45 1.47A7.94 7.94 0 0 0 22 14a8 8 0 1 0 3.61 15.14l1.5 1.52A9.94 9.94 0 0 1 22 32Zm7-2v-3h-3v-2h3v-3h2v3h3v2h-3v3h-2Zm-8.4-3.4-4.25-4.25 1.4-1.4 2.85 2.85 10-10.03 1.4 1.4L20.6 26.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function EditProjectIntro(): ReactElement {
  return (
    <div className="flex items-center gap-4">
      <EditProjectIcon />
      <div className="flex flex-col gap-1 lg:gap-0">
        <h1 className="text-title-lg text-text-primary leading-title font-bold lg:hidden">
          Edit Project
        </h1>
        <h2 className="text-headline-md text-text-primary leading-section hidden font-semibold lg:block">
          Edit Project
        </h2>
        <p className="text-body-sm text-text-tertiary leading-base">
          Define the scope and foundational details of your project.
        </p>
      </div>
    </div>
  );
}
