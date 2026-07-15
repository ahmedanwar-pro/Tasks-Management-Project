import type { ReactElement } from 'react';
import { ProjectsLoadingCard } from './projects-loading-card';

const loadingCards = Array.from({ length: 6 }, (_, index) => index);

export function ProjectsLoadingGrid(): ReactElement {
  return (
    <div aria-hidden="true" className="mt-6 opacity-55 lg:mt-10">
      <div className="mb-5">
        <div className="flex h-14 w-full max-w-[352px] items-center gap-3 rounded-md border border-[#d9e2f2] bg-white px-4 shadow-[0px_1px_2px_rgba(16,24,40,0.04)] md:rounded-[10px]">
          <div className="size-5 rounded-full bg-[#e2e9f7] animate-pulse" />
          <div className="h-4 w-28 rounded-xs bg-[#e2e9f7] animate-pulse" />
        </div>
      </div>
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
        {loadingCards.map((card) => (
          <ProjectsLoadingCard key={card} />
        ))}
      </div>
    </div>
  );
}
