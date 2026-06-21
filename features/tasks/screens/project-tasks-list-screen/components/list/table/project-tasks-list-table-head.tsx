import type { ReactElement } from 'react';

export function ProjectTasksListTableHead(): ReactElement {
  return (
    <thead className="bg-surface-high/30">
      <tr>
        <th
          className="text-text-secondary w-[10%] px-6 py-4 text-left text-[11px] leading-[14px] font-bold tracking-[0.55px] uppercase xl:w-[10.92%]"
          scope="col"
        >
          Task ID
        </th>
        <th
          className="text-text-secondary w-[31%] px-6 py-4 text-left text-[11px] leading-[14px] font-bold tracking-[0.55px] uppercase xl:w-[36.95%]"
          scope="col"
        >
          Title
        </th>
        <th
          className="text-text-secondary w-[17%] px-6 py-4 text-left text-[11px] leading-[14px] font-bold tracking-[0.55px] uppercase xl:w-[14.3%]"
          scope="col"
        >
          Status
        </th>
        <th
          className="text-text-secondary w-[13%] py-4 pr-4 pl-8 text-left text-[11px] leading-[14px] font-bold tracking-[0.55px] uppercase xl:w-[13.45%] xl:px-6"
          scope="col"
        >
          Due Date
        </th>
        <th
          className="text-text-secondary w-[18%] py-4 pr-4 pl-8 text-left text-[11px] leading-[14px] font-bold tracking-[0.55px] uppercase xl:w-[14.58%] xl:px-6"
          scope="col"
        >
          Assignee
        </th>
        <th
          aria-label="Settings"
          className="text-text-secondary w-[11%] py-4 pr-4 pl-1 text-right text-[11px] leading-[14px] font-bold tracking-[0.55px] uppercase xl:w-[9.8%] xl:pr-6 xl:pl-2"
          scope="col"
        />
      </tr>
    </thead>
  );
}
