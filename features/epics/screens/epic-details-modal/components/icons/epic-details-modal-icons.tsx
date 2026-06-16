import type { ReactElement, SVGAttributes } from 'react';
import { joinClasses } from '@/components/ui/utils';

type IconProps = {
  className?: string;
} & Omit<
  SVGAttributes<SVGSVGElement>,
  'children' | 'className' | 'height' | 'role' | 'viewBox' | 'width'
>;

export function CloseIcon({ className, ...props }: IconProps): ReactElement {
  return (
    <svg
      {...props}
      aria-hidden="true"
      className={joinClasses('size-[14px] shrink-0', className)}
      fill="none"
      focusable="false"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 1l12 12" />
      <path d="M13 1 1 13" />
    </svg>
  );
}

export function EpicKeyIcon({ className, ...props }: IconProps): ReactElement {
  return (
    <svg
      {...props}
      aria-hidden="true"
      className={joinClasses('h-[14px] w-5 shrink-0', className)}
      fill="none"
      focusable="false"
      viewBox="0 0 20 14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 10V4C0 3.45 0.195833 2.97917 0.5875 2.5875C0.979167 2.19583 1.45 2 2 2C2.55 2 3.02083 2.19583 3.4125 2.5875C3.80417 2.97917 4 3.45 4 4V10C4 10.55 3.80417 11.0208 3.4125 11.4125C3.02083 11.8042 2.55 12 2 12C1.45 12 0.979167 11.8042 0.5875 11.4125C0.195833 11.0208 0 10.55 0 10M7 14C6.45 14 5.97917 13.8042 5.5875 13.4125C5.19583 13.0208 5 12.55 5 12V2C5 1.45 5.19583 0.979167 5.5875 0.5875C5.97917 0.195833 6.45 0 7 0H13C13.55 0 14.0208 0.195833 14.4125 0.5875C14.8042 0.979167 15 1.45 15 2V12C15 12.55 14.8042 13.0208 14.4125 13.4125C14.0208 13.8042 13.55 14 13 14H7M16 10V4C16 3.45 16.1958 2.97917 16.5875 2.5875C16.9792 2.19583 17.45 2 18 2C18.55 2 19.0208 2.19583 19.4125 2.5875C19.8042 2.97917 20 3.45 20 4V10C20 10.55 19.8042 11.0208 19.4125 11.4125C19.0208 11.8042 18.55 12 18 12C17.45 12 16.9792 11.8042 16.5875 11.4125C16.1958 11.0208 16 10.55 16 10"
        fill="currentColor"
      />
    </svg>
  );
}

export function ListIcon({ className, ...props }: IconProps): ReactElement {
  return (
    <svg
      {...props}
      aria-hidden="true"
      className={joinClasses('w-4-5 h-4 shrink-0', className)}
      fill="none"
      focusable="false"
      viewBox="0 0 18 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 15V13H18V15H6M6 9V7H18V9H6M6 3V1H18V3H6M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14C0 13.45 0.195833 12.9792 0.5875 12.5875C0.979167 12.1958 1.45 12 2 12C2.55 12 3.02083 12.1958 3.4125 12.5875C3.80417 12.9792 4 13.45 4 14C4 14.55 3.80417 15.0208 3.4125 15.4125C3.02083 15.8042 2.55 16 2 16M2 10C1.45 10 0.979167 9.80417 0.5875 9.4125C0.195833 9.02083 0 8.55 0 8C0 7.45 0.195833 6.97917 0.5875 6.5875C0.979167 6.19583 1.45 6 2 6C2.55 6 3.02083 6.19583 3.4125 6.5875C3.80417 6.97917 4 7.45 4 8C4 8.55 3.80417 9.02083 3.4125 9.4125C3.02083 9.80417 2.55 10 2 10M2 4C1.45 4 0.979167 3.80417 0.5875 3.4125C0.195833 3.02083 0 2.55 0 2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0C2.55 0 3.02083 0.195833 3.4125 0.5875C3.80417 0.979167 4 1.45 4 2C4 2.55 3.80417 3.02083 3.4125 3.4125C3.02083 3.80417 2.55 4 2 4"
        fill="currentColor"
      />
    </svg>
  );
}

export function TaskCheckIcon({
  className,
  ...props
}: IconProps): ReactElement {
  return (
    <svg
      {...props}
      aria-hidden="true"
      className={joinClasses('size-5 shrink-0', className)}
      fill="none"
      focusable="false"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="10"
        cy="10"
        r="7.25"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m6.75 10.2 2 2 4.5-4.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function MoreVerticalIcon({
  className,
  ...props
}: IconProps): ReactElement {
  return (
    <svg
      {...props}
      aria-hidden="true"
      className={joinClasses('h-4 w-1 shrink-0', className)}
      fill="none"
      focusable="false"
      viewBox="0 0 4 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="2" cy="3" fill="currentColor" r="1" />
      <circle cx="2" cy="8" fill="currentColor" r="1" />
      <circle cx="2" cy="13" fill="currentColor" r="1" />
    </svg>
  );
}

export function CalendarIcon({ className, ...props }: IconProps): ReactElement {
  return (
    <svg
      {...props}
      aria-hidden="true"
      className={joinClasses('h-[15px] w-[13.5px] shrink-0', className)}
      fill="none"
      focusable="false"
      viewBox="0 0 13.5 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="md:hidden"
        d="M8.625 12C8.1 12 7.65625 11.8188 7.29375 11.4563C6.93125 11.0938 6.75 10.65 6.75 10.125C6.75 9.6 6.93125 9.15625 7.29375 8.79375C7.65625 8.43125 8.1 8.25 8.625 8.25C9.15 8.25 9.59375 8.43125 9.95625 8.79375C10.3188 9.15625 10.5 9.6 10.5 10.125C10.5 10.65 10.3188 11.0938 9.95625 11.4563C9.59375 11.8188 9.15 12 8.625 12M1.5 15C1.0875 15 0.734375 14.8531 0.440625 14.5594C0.146875 14.2656 0 13.9125 0 13.5V3C0 2.5875 0.146875 2.23437 0.440625 1.94062C0.734375 1.64687 1.0875 1.5 1.5 1.5H2.25V0H3.75V1.5H9.75V0H11.25V1.5H12C12.4125 1.5 12.7656 1.64687 13.0594 1.94062C13.3531 2.23437 13.5 2.5875 13.5 3V13.5C13.5 13.9125 13.3531 14.2656 13.0594 14.5594C12.7656 14.8531 12.4125 15 12 15H1.5M1.5 13.5H12V6H1.5V13.5M1.5 4.5H12V3H1.5V4.5"
        fill="currentColor"
      />
      <path
        className="hidden md:block"
        d="M1.5 15C1.0875 15 0.734375 14.8531 0.440625 14.5594C0.146875 14.2656 0 13.9125 0 13.5V3C0 2.5875 0.146875 2.23437 0.440625 1.94062C0.734375 1.64687 1.0875 1.5 1.5 1.5H2.25V0H3.75V1.5H9.75V0H11.25V1.5H12C12.4125 1.5 12.7656 1.64687 13.0594 1.94062C13.3531 2.23437 13.5 2.5875 13.5 3V13.5C13.5 13.9125 13.3531 14.2656 13.0594 14.5594C12.7656 14.8531 12.4125 15 12 15H1.5M1.5 13.5H12V6H1.5V13.5M1.5 4.5H12V3H1.5V4.5"
        fill="currentColor"
      />
    </svg>
  );
}

export function OverdueIcon({ className, ...props }: IconProps): ReactElement {
  return (
    <svg
      {...props}
      aria-hidden="true"
      className={joinClasses('size-[11.667px] shrink-0', className)}
      fill="none"
      focusable="false"
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6 3.25v3.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <circle cx="6" cy="8.75" fill="currentColor" r="0.75" />
    </svg>
  );
}

export function UnassignedIcon({
  className,
  ...props
}: IconProps): ReactElement {
  return (
    <svg
      {...props}
      aria-hidden="true"
      className={joinClasses('size-[11.5646px] shrink-0', className)}
      fill="none"
      focusable="false"
      viewBox="0 0 11.5646 11.5646"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.7333 11.5646L9.20208 10.0333H1.53125V8.4C1.53125 8.06944 1.61632 7.76562 1.78646 7.48854C1.9566 7.21146 2.18264 7 2.46458 6.85417C2.90208 6.63056 3.34687 6.45069 3.79896 6.31458C4.25104 6.17847 4.71042 6.07639 5.17708 6.00833L0 0.83125L0.83125 0L11.5646 10.7333L10.7333 11.5646M2.69792 8.86667H8.03542L6.28542 7.11667H6.19792C5.65347 7.11667 5.11389 7.18229 4.57917 7.31354C4.04444 7.44479 3.51458 7.64167 2.98958 7.90417C2.90208 7.95278 2.8316 8.02083 2.77813 8.10833C2.72465 8.19583 2.69792 8.29306 2.69792 8.4V8.86667M9.93125 6.85417C10.2132 6.99028 10.4368 7.19688 10.6021 7.47396C10.7674 7.75104 10.8549 8.05 10.8646 8.37083L8.91042 6.41667C9.08542 6.48472 9.25799 6.55278 9.42813 6.62083C9.59826 6.68889 9.76597 6.76667 9.93125 6.85417M7.48125 4.9875L6.62083 4.12708C6.84444 4.03958 7.02431 3.89618 7.16042 3.69688C7.29653 3.49757 7.36458 3.27639 7.36458 3.03333C7.36458 2.7125 7.25035 2.43785 7.02187 2.20937C6.7934 1.9809 6.51875 1.86667 6.19792 1.86667C5.95486 1.86667 5.73368 1.93472 5.53438 2.07083C5.33507 2.20694 5.19167 2.38681 5.10417 2.61042L4.24375 1.75C4.46736 1.41944 4.74931 1.16181 5.08958 0.977083C5.42986 0.792361 5.79931 0.7 6.19792 0.7C6.83958 0.7 7.38889 0.928472 7.84583 1.38542C8.30278 1.84236 8.53125 2.39167 8.53125 3.03333C8.53125 3.43194 8.43889 3.80139 8.25417 4.14167C8.06944 4.48194 7.81181 4.76389 7.48125 4.9875M8.03542 8.86667H2.69792C2.69792 8.86667 2.72465 8.86667 2.77813 8.86667H8.03542Z"
        fill="currentColor"
      />
    </svg>
  );
}
