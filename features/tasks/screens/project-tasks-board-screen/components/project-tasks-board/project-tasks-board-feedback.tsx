import type { ReactElement } from 'react';
import {
  ProjectTasksBoardError,
  ProjectTasksBoardResultEmpty,
  ProjectTasksBoardStatusUpdateError,
} from '../states';

export const projectTasksBoardErrorId = 'project-tasks-board-error';

type ProjectTasksBoardFeedbackProps = {
  hasBoardError: boolean;
  hasStatusUpdateError: boolean;
  isBoardEmpty: boolean;
  isSearchActive: boolean;
  isSearchPending: boolean;
  onRetryBoard: () => void;
};

export function ProjectTasksBoardFeedback({
  hasBoardError,
  hasStatusUpdateError,
  isBoardEmpty,
  isSearchActive,
  isSearchPending,
  onRetryBoard,
}: ProjectTasksBoardFeedbackProps): ReactElement {
  return (
    <>
      {hasBoardError && !isSearchPending ? (
        <div className="sticky left-0 mb-4 w-full">
          <ProjectTasksBoardError
            id={projectTasksBoardErrorId}
            message={isSearchActive ? 'Failed to search tasks' : undefined}
            onRetry={onRetryBoard}
          />
        </div>
      ) : null}
      {isBoardEmpty && !isSearchPending ? (
        <ProjectTasksBoardResultEmpty isSearchActive={isSearchActive} />
      ) : null}
      {hasStatusUpdateError ? <ProjectTasksBoardStatusUpdateError /> : null}
    </>
  );
}
