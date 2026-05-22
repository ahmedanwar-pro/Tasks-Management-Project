import type { ReactElement } from 'react';

export function SignUpIntro(): ReactElement {
  return (
    <div className="pt-8 pb-10 md:pt-0">
      <div className="flex flex-col gap-[6.875px] md:items-center md:gap-2">
        <h1 className="leading-display text-text-primary text-[28px] font-semibold tracking-[-0.8px] md:text-center md:text-[30px] md:leading-9 md:tracking-[-0.75px]">
          Create your workspace
        </h1>
        <p className="text-body-sm text-text-secondary md:leading-base md:text-text-tertiary max-w-85.5 leading-[22.75px] md:max-w-none md:text-center">
          <span className="md:hidden">
            Join the curated environment for institutional trust and task
            precision.
          </span>
          <span className="hidden md:inline">
            Join the editorial approach to task management.
          </span>
        </p>
      </div>
    </div>
  );
}
