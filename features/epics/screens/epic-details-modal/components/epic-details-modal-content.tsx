import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { EpicFormFeedback } from '../../shared/components';
import type { UpdateEpicRequest } from '../api';
import type { EpicDetailsTaskSuccessType } from '../utils/epic-details-task-navigation';
import type { EpicDetailsDisplayData } from '../types';
import {
  epicUpdateErrorMessage,
  epicUpdateSuccessMessage,
} from '../utils/epic-update-feedback-messages';
import { EpicDetailsModalHeader } from './header/epic-details-modal-header';
import { EpicDetailsDescription } from './meta/epic-details-description';
import { EpicDetailsMetaGrid } from './meta/grid/epic-details-meta-grid';
import { EpicDetailsTasksSection } from './tasks/epic-details-tasks-section';

const epicUpdateSuccessToastDurationMs = 4000;
const epicUpdateSuccessToastCollapseDurationMs = 450;

type EpicDetailsModalContentProps = {
  epic: EpicDetailsDisplayData;
  epicId: string;
  initialPage: number;
  projectId: string;
  shouldUseHistoryBack?: boolean;
  taskSuccessType?: EpicDetailsTaskSuccessType;
  updateEpic: (request: UpdateEpicRequest) => Promise<unknown>;
};

export function EpicDetailsModalContent({
  epic,
  epicId,
  initialPage,
  projectId,
  shouldUseHistoryBack = false,
  taskSuccessType,
  updateEpic,
}: EpicDetailsModalContentProps): ReactElement {
  const [feedback, setFeedback] = useState<{
    error?: string;
    success?: string;
  } | null>(null);
  const [isSuccessFeedbackVisible, setIsSuccessFeedbackVisible] =
    useState(false);

  async function handleUpdateEpic(request: UpdateEpicRequest): Promise<void> {
    setFeedback(null);
    setIsSuccessFeedbackVisible(false);

    try {
      await updateEpic(request);
      setFeedback({ success: epicUpdateSuccessMessage });
      setIsSuccessFeedbackVisible(true);
    } catch (error) {
      setFeedback({ error: epicUpdateErrorMessage });
      throw error;
    }
  }

  useEffect(() => {
    if (!isSuccessFeedbackVisible) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsSuccessFeedbackVisible(false);
    }, epicUpdateSuccessToastDurationMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isSuccessFeedbackVisible]);

  useEffect(() => {
    if (isSuccessFeedbackVisible || !feedback?.success) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setFeedback(null);
    }, epicUpdateSuccessToastCollapseDurationMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [feedback?.success, isSuccessFeedbackVisible]);

  return (
    <>
      <EpicDetailsModalHeader
        currentPage={initialPage}
        epic={epic}
        onTitleSave={(title) =>
          handleUpdateEpic({
            epicId,
            projectId,
            title,
          })
        }
        projectId={projectId}
        shouldUseHistoryBack={shouldUseHistoryBack}
      />
      <div className="min-h-0 w-full min-w-0 flex-1 overflow-y-auto px-6 py-2 md:p-8">
        <div className="flex w-full min-w-0 flex-col py-4 md:py-0">
          {feedback ? (
            <EpicFormFeedback
              error={feedback.error}
              onSuccessClose={() => setIsSuccessFeedbackVisible(false)}
              success={feedback.success}
              visible={isSuccessFeedbackVisible}
            />
          ) : null}
          <div className="flex w-full min-w-0 flex-col gap-5 md:gap-8">
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
            <EpicDetailsTasksSection
              currentPage={initialPage}
              epicId={epicId}
              projectId={projectId}
              successType={taskSuccessType}
            />
          </div>
        </div>
      </div>
    </>
  );
}
