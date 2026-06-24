export type TaskDetailsPopupStateType = 'loading' | 'error' | 'empty';

export type TaskDetailsPopupStateContentProps = {
  message?: string;
  onRetry?: () => void;
  type: TaskDetailsPopupStateType;
};
