import { Card } from '@/components/ui';
import type { StatisticsProjectCount } from '../types';
import { formatCount } from '../utils/statistics-display-utils';
import {
  RefreshingIndicator,
  SectionBackgroundError,
  SkeletonBlock,
} from './statistics-section-states';

export function ProjectCountsCard({
  hasBackgroundError,
  isRefreshing,
  onRetry,
  projects,
}: {
  hasBackgroundError: boolean;
  isRefreshing: boolean;
  onRetry: () => void;
  projects: StatisticsProjectCount[];
}) {
  return (
    <Card className="min-h-39 p-5 lg:p-6" padding="none">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold">All Projects</h3>
        <RefreshingIndicator show={isRefreshing} />
      </div>
      <div className="mt-2">
        <SectionBackgroundError
          message="Project totals could not be refreshed."
          onRetry={onRetry}
          show={hasBackgroundError}
        />
      </div>
      {projects.length > 0 ? (
        <ul className="mt-5 flex flex-col gap-4">
          {projects.map((project) => (
            <li
              className="flex items-start justify-between gap-4 text-xs leading-4 font-bold"
              key={project.projectId}
            >
              <span className="text-text-secondary min-w-0 break-words">
                {project.projectName}
              </span>
              <span className="text-text-primary shrink-0 whitespace-nowrap">
                {formatCount(project.tasksCount)} Tasks
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div
          aria-live="polite"
          className="text-text-muted mt-5 text-sm"
          role="status"
        >
          No project tasks in this range.
        </div>
      )}
    </Card>
  );
}

export function ProjectCountsSkeleton() {
  return (
    <Card aria-busy="true" className="min-h-39 p-5 lg:p-6" padding="none">
      <SkeletonBlock className="h-6 w-28" />
      <div className="mt-5 flex flex-col gap-4">
        {[0, 1, 2].map((item) => (
          <div className="flex items-start justify-between gap-4" key={item}>
            <SkeletonBlock className="h-4 w-32" />
            <SkeletonBlock className="h-4 w-14" />
          </div>
        ))}
      </div>
    </Card>
  );
}
