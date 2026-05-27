import Link from 'next/link';
import type { ReactElement } from 'react';
import { EmptyState } from '@/components/ui';

function PlusIcon(): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className="size-icon-md"
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 15H11V11H15V9H11V5H9V9H5V11H9V15V15M10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20V20M10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18V18M10 10V10V10V10V10V10V10V10V10V10"
        fill="currentColor"
      />
    </svg>
  );
}

function CompassIcon(): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className="h-[42.308px] w-6.25"
      fill="none"
      viewBox="0 0 25 42.3077"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.33654 42.3077L0 39.6923L6.45193 21.8942C6.78847 22.1891 7.13703 22.4223 7.49761 22.5937C7.85819 22.7652 8.23078 22.907 8.6154 23.0192L2.31732 40.4519L0.33654 42.3077V42.3077M24.6635 42.3077L22.6827 40.4519L16.3846 23.0192C16.7692 22.907 17.1418 22.7652 17.5024 22.5937C17.863 22.4223 18.2115 22.1891 18.5481 21.8942L25 39.6923L24.6635 42.3077V42.3077M12.5 18.75C10.7692 18.75 9.29488 18.141 8.07693 16.9231C6.85898 15.7051 6.25 14.2308 6.25 12.5C6.25 10.875 6.75881 9.51522 7.77644 8.42067C8.79407 7.32612 9.95192 6.67307 11.25 6.46153V0H13.75V6.46153C15.0481 6.67307 16.2059 7.32612 17.2236 8.42067C18.2412 9.51522 18.75 10.875 18.75 12.5C18.75 14.2308 18.141 15.7051 16.9231 16.9231C15.7051 18.141 14.2308 18.75 12.5 18.75V18.75M12.5 16.25C13.5289 16.25 14.4111 15.8822 15.1466 15.1466C15.8822 14.4111 16.25 13.5288 16.25 12.5C16.25 11.4712 15.8822 10.5889 15.1466 9.85337C14.4111 9.1178 13.5289 8.75001 12.5 8.75001C11.4712 8.75001 10.589 9.1178 9.85338 9.85337C9.1178 10.5889 8.75002 11.4712 8.75002 12.5C8.75002 13.5288 9.1178 14.4111 9.85338 15.1466C10.589 15.8822 11.4712 16.25 12.5 16.25V16.25"
        fill="currentColor"
      />
    </svg>
  );
}

function BlueprintLayersIcon(): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className="w-4-5 h-[19.05px]"
      fill="none"
      viewBox="0 0 18 19.05"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 19.05L0 12.05L1.65 10.8L9 16.5L16.35 10.8L18 12.05L9 19.05V19.05M9 14L0 7L9 0L18 7L9 14V14M9 7V7V7V7V7V7M9 11.45L14.75 7L9 2.55L3.25 7L9 11.45V11.45"
        fill="currentColor"
      />
    </svg>
  );
}

function DraftingTriangleIcon(): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className="size-[17.017px]"
      fill="none"
      viewBox="0 0 17.0175 17.0175"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.2 17.0175C1.58333 17.0175 1.0625 16.805 0.6375 16.38C0.2125 15.955 0 15.4341 0 14.8175V1.11746C0 0.634127 0.225 0.296627 0.675 0.10496C1.125 -0.0867063 1.51667 -0.015873 1.85 0.31746L4.1 2.56746L2.75 3.91746L3.45 4.61746L4.8 3.26746L7.4 5.86746L6.05 7.21746L6.75 7.91746L8.1 6.56746L10.7 9.16746L9.35 10.5175L10.05 11.2175L11.4 9.86746L14 12.4675L12.65 13.8175L13.35 14.5175L14.7 13.1675L16.7 15.1675C17.0333 15.5008 17.1042 15.8925 16.9125 16.3425C16.7208 16.7925 16.3833 17.0175 15.9 17.0175H2.2V17.0175M3 14.0175H11.3L3 5.71746V14.0175V14.0175V14.0175V14.0175"
        fill="currentColor"
      />
    </svg>
  );
}

function ProjectsEmptyIllustration(): ReactElement {
  return (
    <div className="bg-surface-low relative flex size-full items-center justify-center overflow-hidden rounded-md">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(180deg, var(--color-primary) 12px, transparent 12px), linear-gradient(90deg, var(--color-primary) 12px, transparent 12px)',
        }}
      />
      <div className="bg-primary-container-muted text-primary flex size-16 items-center justify-center rounded-lg shadow-[0px_20px_25px_-5px_rgba(4,27,60,0.05),0px_8px_10px_-6px_rgba(4,27,60,0.05)] lg:size-24">
        <CompassIcon />
      </div>
      <div className="bg-surface text-primary absolute top-[16%] right-[13%] flex size-9 -rotate-6 items-center justify-center rounded-sm shadow-sm lg:top-[37.62px] lg:right-[37.63px] lg:size-12">
        <BlueprintLayersIcon />
      </div>
      <div className="bg-surface text-text-muted absolute bottom-[14%] left-[13%] flex size-8 rotate-12 items-center justify-center rounded-sm shadow-sm lg:bottom-[44.29px] lg:left-[36.28px] lg:size-10">
        <DraftingTriangleIcon />
      </div>
    </div>
  );
}

export function ProjectsEmptyState(): ReactElement {
  return (
    <EmptyState
      action={
        <Link
          className="text-text-inverse focus-visible:outline-primary text-body-md from-primary to-primary-container hover:from-primary-container hover:to-primary active:from-primary active:to-primary inline-flex h-(--control-height-2xl) shrink-0 items-center justify-center gap-2 rounded-md border border-transparent bg-linear-to-r px-8 font-sans leading-relaxed font-semibold tracking-normal whitespace-nowrap shadow-sm transition-colors duration-150 focus-visible:outline focus-visible:outline-offset-2 md:h-15! md:gap-[11.99px]! md:rounded-sm md:border-0! md:bg-[linear-gradient(167.24619143753972deg,var(--color-primary),var(--color-primary-container))]! md:px-8 md:text-[18px]! md:leading-[28px]! md:font-bold md:shadow-[0px_25px_50px_-12px_rgba(0,61,155,0.3)]!"
          href="/projects/new"
        >
          <PlusIcon />
          <span>Create New Project</span>
        </Link>
      }
      className="[&_h1]:text-headline-md lg:[&_h1]:leading-display [&_p]:text-body-md [&_p]:text-text-secondary lg:[&_p]:text-body-lg min-h-[calc(100dvh-8rem)] gap-6 px-6 py-12 lg:min-h-[calc(100dvh-4rem)] lg:gap-10.75 [&_h1]:font-semibold lg:[&_h1]:text-[36px] lg:[&_h1]:tracking-[-0.9px] [&>div:first-child]:mb-0 [&>div:first-child]:size-48 lg:[&>div:first-child]:size-72 [&>div:nth-child(2)]:gap-4"
      description="You don’t have any projects yet. Start by defining your first architectural workspace to begin tracking tasks and epics."
      icon={<ProjectsEmptyIllustration />}
      size="lg"
      title="No Projects"
      titleAs="h1"
      variant="plain"
    />
  );
}
