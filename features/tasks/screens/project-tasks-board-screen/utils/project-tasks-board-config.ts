import type { TaskStatus } from '../../add-new-task-screen/add-new-task-form-schema';
import type { BoardStatusConfig } from '../types';

export const projectTasksBoardStatuses: BoardStatusConfig[] = [
  {
    accentClassName: 'bg-text-subtle',
    badgeClassName: 'bg-surface-high text-text-primary',
    label: 'TO DO',
    status: 'TO_DO',
  },
  {
    accentClassName: 'bg-primary-container',
    badgeClassName: 'bg-primary-container/10 text-primary',
    label: 'IN PROGRESS',
    status: 'IN_PROGRESS',
  },
  {
    accentClassName: 'bg-danger',
    badgeClassName: 'bg-danger-container text-danger-text',
    label: 'BLOCKED',
    status: 'BLOCKED',
  },
  {
    accentClassName: 'bg-text-tertiary',
    badgeClassName: 'bg-surface-high text-text-tertiary',
    label: 'IN REVIEW',
    status: 'IN_REVIEW',
  },
  {
    accentClassName: 'bg-info',
    badgeClassName: 'bg-primary-container/10 text-info',
    label: 'READY FOR QA',
    status: 'READY_FOR_QA',
  },
  {
    accentClassName: 'bg-danger',
    badgeClassName: 'bg-danger-container text-danger-text',
    label: 'REOPENED',
    status: 'REOPENED',
  },
  {
    accentClassName: 'bg-success-icon',
    badgeClassName: 'bg-success-icon text-text-inverse',
    label: 'READY FOR PROD',
    status: 'READY_FOR_PRODUCTION',
  },
  {
    accentClassName: 'bg-success-strong',
    badgeClassName: 'bg-success text-success-text',
    label: 'DONE',
    status: 'DONE',
  },
];

export function isBoardStatus(value: string): value is TaskStatus {
  return projectTasksBoardStatuses.some(({ status }) => status === value);
}
