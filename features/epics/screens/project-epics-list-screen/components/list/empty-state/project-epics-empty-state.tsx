import { createElement, type ReactElement } from 'react';
import { EmptyStateAction } from './empty-state-action';
import { EmptyStateContent } from './empty-state-content';
import { EmptyStateFeatureCards } from './empty-state-feature-cards';
import { EmptyStateIllustration } from './empty-state-illustration';

type ProjectEpicsEmptyStateProps = {
  projectId: string;
};

export function ProjectEpicsEmptyState({
  projectId,
}: ProjectEpicsEmptyStateProps): ReactElement {
  return createElement(
    'section',
    {
      'aria-labelledby': 'project-epics-empty-title',
      className:
        'relative flex min-h-[calc(100dvh-8rem)] w-full items-center justify-center overflow-hidden px-6 py-12 sm:px-8 lg:min-h-[calc(100dvh-4rem)] lg:px-8',
      style: {
        backgroundImage:
          'radial-gradient(circle at 50% 0%, rgba(215,226,255,0.55) 0, rgba(215,226,255,0) 280px)',
      },
    },
    createElement(
      'div',
      {
        className: 'flex w-full max-w-[672px] flex-col items-center',
      },
      createElement(EmptyStateIllustration),
      createElement(
        'div',
        {
          className: 'mt-10 md:mt-12',
        },
        createElement(EmptyStateContent),
      ),
      createElement(
        'div',
        {
          className: 'mt-9 md:mt-[39.75px]',
        },
        createElement(EmptyStateAction, { projectId }),
      ),
      createElement(
        'div',
        {
          className: 'mt-16 w-full md:mt-20',
        },
        createElement(EmptyStateFeatureCards),
      ),
    ),
  );
}
