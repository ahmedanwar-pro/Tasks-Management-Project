import { useState } from 'react';
import type { ReactElement } from 'react';
import { EpicFormFeedback } from '../../shared/components';
import type { UpdateEpicRequest } from '../api';
import type { EpicDetailsDisplayData } from '../types';
import {
  epicUpdateErrorMessage,
  epicUpdateSuccessMessage,
} from '../utils/epic-update-feedback-messages';
import { EpicDetailsModalHeader } from './header/epic-details-modal-header';
import { EpicDetailsDescription } from './meta/epic-details-description';
import { EpicDetailsMetaGrid } from './meta/grid/epic-details-meta-grid';
import { EpicDetailsTasksSection } from './tasks/epic-details-tasks-section';

type EpicDetailsModalContentProps = {
  epic: EpicDetailsDisplayData;
  epicId: string;
  projectId: string;
  updateEpic: (request: UpdateEpicRequest) => Promise<unknown>;
};

export function EpicDetailsModalContent({
  epic,
  epicId,
  projectId,
  updateEpic,
}: EpicDetailsModalContentProps): ReactElement {
  const [feedback, setFeedback] = useState<{
    error?: string;
    success?: string;
  } | null>(null);

  async function handleUpdateEpic(request: UpdateEpicRequest): Promise<void> {
    setFeedback(null);

    try {
      await updateEpic(request);
      setFeedback({ success: epicUpdateSuccessMessage });
    } catch (error) {
      setFeedback({ error: epicUpdateErrorMessage });
      throw error;
    }
  }

  return (
    <>
      <EpicDetailsModalHeader
        epic={epic}
        onTitleSave={(title) =>
          handleUpdateEpic({
            epicId,
            projectId,
            title,
          })
        }
        projectId={projectId}
      />
      <div className="min-h-0 min-w-0 w-full flex-1 overflow-y-auto px-6 py-2 md:p-8">
        <div className="flex min-w-0 w-full flex-col gap-5 py-4 md:gap-8 md:py-0">
          {feedback ? (
            <EpicFormFeedback
              error={feedback.error}
              success={feedback.success}
            />
          ) : null}
          <EpicDetailsDescription
            description={epic.description}
            descriptionValue={epic.descriptionValue}
            key={epic.descriptionValue}
            onSave={(description) =>
              handleUpdateEpic({
                description: description || null,
                epicId,
                projectId,
              })
            }
          />
          <EpicDetailsMetaGrid
            epic={epic}
            onAssigneeSave={(assigneeId) =>
              handleUpdateEpic({
                assigneeId,
                epicId,
                projectId,
              })
            }
            onDeadlineSave={(deadline) =>
              handleUpdateEpic({
                deadline,
                epicId,
                projectId,
              })
            }
            projectId={projectId}
          />
          <EpicDetailsTasksSection taskCount={epic.taskCount} />
        </div>
      </div>
    </>
  );
}
