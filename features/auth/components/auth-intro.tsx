import type { ReactElement, ReactNode } from 'react';

type AuthIntroProps = {
  description: ReactNode;
  title: ReactNode;
};

export function AuthIntro({
  description,
  title,
}: AuthIntroProps): ReactElement {
  return (
    <div className="pt-8 pb-10 md:pt-0">
      <div className="flex flex-col gap-[6.875px] md:items-center md:gap-2">
        <h1 className="leading-display text-text-primary text-[28px] font-semibold tracking-[-0.8px] md:text-center md:text-[30px] md:leading-9 md:tracking-[-0.75px]">
          {title}
        </h1>
        <p className="text-body-sm text-text-secondary md:leading-base md:text-text-tertiary max-w-85.5 leading-[22.75px] md:max-w-none md:text-center">
          {description}
        </p>
      </div>
    </div>
  );
}
