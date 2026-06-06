import type { ReactElement } from 'react';
import { ChevronIcon } from '../icons/projects-list-icons';
import {
  disabledPageButtonClasses,
  secondaryPageButtonClasses,
} from './projects-pagination-styles';

type ProjectsPaginationArrowButtonProps = {
  ariaLabel: string;
  disabled: boolean;
  direction: 'left' | 'right';
  onClick: () => void;
};

export function ProjectsPaginationArrowButton({
  ariaLabel,
  disabled,
  direction,
  onClick,
}: ProjectsPaginationArrowButtonProps): ReactElement {
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
