import type { ReactElement } from 'react';
import { ChevronIcon } from '../../icons/project-epics-icons';
import {
  disabledPageButtonClasses,
  secondaryPageButtonClasses,
} from './project-epics-pagination-styles';

type ProjectEpicsPaginationArrowButtonProps = {
  ariaLabel: string;
  disabled: boolean;
  direction: 'left' | 'right';
  onClick: () => void;
};

export function ProjectEpicsPaginationArrowButton({
  ariaLabel,
  disabled,
  direction,
  onClick,
}: ProjectEpicsPaginationArrowButtonProps): ReactElement {
  return (
    <button
      aria-label={ariaLabel}
      className={`${secondaryPageButtonClasses} ${disabledPageButtonClasses}`}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <ChevronIcon direction={direction} />
    </button>
  );
}
