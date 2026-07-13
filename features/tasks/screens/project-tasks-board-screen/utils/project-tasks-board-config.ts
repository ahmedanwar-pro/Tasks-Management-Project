import type { TaskStatus } from '../../add-new-task-screen/add-new-task-form-schema';
import type { BoardStatusConfig } from '../types';

export const projectTasksBoardStatuses: BoardStatusConfig[] = [
  {
    accentClassName: 'bg-text-subtle',
    badgeClassName: 'bg-primary-container-muted text-text-secondary',
    chartClassName: 'text-text-subtle',
    label: 'TO DO',
    status: 'TO_DO',
    statisticsLabel: 'To Do',
  },
  {
    accentClassName: 'bg-primary-container',
    badgeClassName: 'bg-[#CDDDFF] text-[#374763]',
    chartClassName: 'text-primary-container',
    label: 'IN PROGRESS',
    status: 'IN_PROGRESS',
    statisticsLabel: 'In Progress',
  },
  {
    accentClassName: 'bg-danger',
    badgeClassName: 'bg-[#FFDAD6] text-[#93000A]',
    chartClassName: 'text-danger',
    label: 'BLOCKED',
    status: 'BLOCKED',
    statisticsLabel: 'Blocked',
  },
  {
    accentClassName: 'bg-text-tertiary',
    badgeClassName: 'bg-[#CDDDFF] text-[#51617E]',
    chartClassName: 'text-text-tertiary',
    label: 'IN REVIEW',
    status: 'IN_REVIEW',
    statisticsLabel: 'In Review',
  },
  {
    accentClassName: 'bg-info',
    badgeClassName: 'bg-primary-container-muted text-text-secondary',
    chartClassName: 'text-info',
    label: 'READY FOR QA',
    status: 'READY_FOR_QA',
    statisticsLabel: 'Ready for QA',
  },
  {
    accentClassName: 'bg-danger',
    badgeClassName: 'bg-primary-container-muted text-text-secondary',
    chartClassName: 'text-danger',
    label: 'REOPENED',
    status: 'REOPENED',
    statisticsLabel: 'Reopened',
  },
  {
    accentClassName: 'bg-success-icon',
    badgeClassName: 'bg-primary-container-muted text-text-secondary',
    chartClassName: 'text-success-icon',
    label: 'READY FOR PROD',
    status: 'READY_FOR_PRODUCTION',
    statisticsLabel: 'Ready for Production',
  },
  {
    accentClassName: 'bg-success-strong',
    badgeClassName: 'bg-success text-success-text',
    chartClassName: 'text-success-strong',
    label: 'COMPLETED',
    status: 'DONE',
    statisticsLabel: 'Done',
  },
];

export function isBoardStatus(value: string): value is TaskStatus {
  return projectTasksBoardStatuses.some(({ status }) => status === value);
}
