import type { ReactElement } from 'react';
import { EmptyStateFeatureCard } from './empty-state-feature-card';
import { HierarchyIcon, SparklesIcon, VelocityIcon } from './empty-state-icons';

const featureCards = [
  {
    description:
      'Define the broad objectives that span across multiple cycles.',
    icon: <SparklesIcon />,
    title: 'High-Level Goals',
  },
  {
    description:
      'Link individual tasks to parent epics for a consolidated view.',
    icon: <HierarchyIcon />,
    title: 'Hierarchy Design',
  },
  {
    description: 'Visualize percentage completion at a macro project level.',
    icon: <VelocityIcon />,
    title: 'Track Velocity',
  },
];

export function EmptyStateFeatureCards(): ReactElement {
  return (
    <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
      {featureCards.map((card) => (
        <EmptyStateFeatureCard
          description={card.description}
          icon={card.icon}
          key={card.title}
          title={card.title}
        />
      ))}
    </div>
  );
}
