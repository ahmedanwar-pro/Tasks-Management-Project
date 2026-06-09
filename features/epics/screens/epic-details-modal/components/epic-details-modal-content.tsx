import type { ReactElement } from 'react';
import type { UpdateEpicRequest } from '../api';
import type { EpicDetailsDisplayData } from '../types';
import { EpicDetailsModalHeader } from './header/epic-details-modal-header';
import { EpicDetailsDescription } from './meta/epic-details-description';
import { EpicDetailsMetaGrid } from './meta/grid/epic-details-meta-grid';
import { EpicDetailsTasksSection } from './tasks/epic-details-tasks-section';

type EpicDetailsModalContentProps = {
  epic: EpicDetailsDisplayData;
  epicId: string;
  isSaving: boolean;
  projectId: string;
  updateEpic: (request: UpdateEpicRequest) => Promise<unknown>;
};

export function EpicDetailsModalContent({
  epic,
  epicId,
  isSaving,
  projectId,
  updateEpic,
}: EpicDetailsModalContentProps): ReactElement {
  return (
    <>
      <EpicDetailsModalHeader
        disabled={isSaving}
        epic={epic}
        onTitleSave={(title) =>
          updateEpic({
            epicId,
            projectId,
            title,
          }).then(() => undefined)
        }
        projectId={projectId}
      />
      <div className="min-h-0 w-full flex-1 overflow-y-auto px-6 py-2 md:p-8">
        <div className="flex w-full flex-col gap-5 py-4 md:gap-8 md:py-0">
          <EpicDetailsDescription
            description={epic.description}
            descriptionValue={epic.descriptionValue}
            disabled={isSaving}
            key={epic.descriptionValue}
            onSave={(description) =>
              updateEpic({
                description: description || null,
                epicId,
                projectId,
              }).then(() => undefined)
            }
          />
          <EpicDetailsMetaGrid
            disabled={isSaving}
            epic={epic}
            onAssigneeSave={(assigneeId) =>
              updateEpic({
                assigneeId,
                epicId,
                projectId,
              }).then(() => undefined)
            }
            onDeadlineSave={(deadline) =>
              updateEpic({
                deadline,
                epicId,
                projectId,
              }).then(() => undefined)
            }
            projectId={projectId}
          />
          <EpicDetailsTasksSection taskCount={epic.taskCount} />
        </div>
      </div>
    </>
  );
}
