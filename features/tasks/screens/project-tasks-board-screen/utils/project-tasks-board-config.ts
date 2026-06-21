import type { TaskStatus } from '../../add-new-task-screen/add-new-task-form-schema';
import type { BoardStatusConfig } from '../types';

export const projectTasksBoardStatuses: BoardStatusConfig[] = [
  {
    accentClassName: 'bg-text-subtle',
    badgeClassName: 'bg-primary-container-muted text-text-secondary',
    label: 'TO DO',
    status: 'TO_DO',
  },
  {
    accentClassName: 'bg-primary-container',
    badgeClassName: 'bg-[#CDDDFF] text-[#374763]',
    label: 'IN PROGRESS',
    status: 'IN_PROGRESS',
  },
  {
    accentClassName: 'bg-danger',
    badgeClassName: 'bg-[#FFDAD6] text-[#93000A]',
    label: 'BLOCKED',
    status: 'BLOCKED',
  },
  {
    accentClassName: 'bg-text-tertiary',
    badgeClassName: 'bg-[#CDDDFF] text-[#51617E]',
    label: 'IN REVIEW',
    status: 'IN_REVIEW',
  },
  {
    accentClassName: 'bg-info',
    badgeClassName: 'bg-primary-container-muted text-text-secondary',
    label: 'READY FOR QA',
    status: 'READY_FOR_QA',
  },
  {
    accentClassName: 'bg-danger',
    badgeClassName: 'bg-primary-container-muted text-text-secondary',
    label: 'REOPENED',
    status: 'REOPENED',
  },
  {
    accentClassName: 'bg-success-icon',
    badgeClassName: 'bg-primary-container-muted text-text-secondary',
    label: 'READY FOR PROD',
    status: 'READY_FOR_PRODUCTION',
  },
  {
    accentClassName: 'bg-success-strong',
    badgeClassName: 'bg-success text-success-text',
    label: 'COMPLETED',
    status: 'DONE',
  },
];

export function isBoardStatus(value: string): value is TaskStatus {
  return projectTasksBoardStatuses.some(({ status }) => status === value);
}
