import type { ReactElement } from 'react';

type EditableValidationMessageProps = {
  id: string;
  message: string;
};

export function EditableValidationMessage({
  id,
  message,
}: EditableValidationMessageProps): ReactElement {
  return (
    <span
      className="flex items-center gap-2 text-label-md font-medium leading-tight tracking-normal text-danger"
      id={id}
      role="alert"
    >
      <svg
        aria-hidden="true"
        className="size-[13.333px] shrink-0"
        fill="none"
        viewBox="0 0 14 14"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="7" cy="7" r="5.75" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M7 3.75v3.75"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <circle cx="7" cy="10" fill="currentColor" r="0.75" />
      </svg>
      <span>{message}</span>
    </span>
  );
}
