import type { ReactElement } from 'react';

type ProjectTasksBoardResultEmptyProps = {
  isSearchActive: boolean;
};

export function ProjectTasksBoardResultEmpty({
  isSearchActive,
}: ProjectTasksBoardResultEmptyProps): ReactElement {
  return (
    <div
      className="border-border-strong bg-surface-low/30 sticky left-0 mb-4 flex min-h-16 w-full items-center justify-center rounded-md border border-dashed px-4 py-3 text-center"
      role="status"
    >
      <p className="text-text-subtle text-body-sm font-medium">
        {isSearchActive
          ? 'No tasks found matching your search'
          : 'No tasks found for this project'}
      </p>
    </div>
  );
}
