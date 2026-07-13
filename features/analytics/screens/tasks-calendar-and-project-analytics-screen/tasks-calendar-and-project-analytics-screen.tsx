'use client';

import type { JSX } from 'react';
import { StatisticsPageShell } from './components/statistics-page-shell';
import { useStatisticsScreenData } from './hooks/use-statistics-screen-data';

export function MyStatisticsScreen(): JSX.Element {
  const screenData = useStatisticsScreenData();

  return <StatisticsPageShell screenData={screenData} />;
}

export function TasksCalendarAndProjectAnalyticsScreen(): JSX.Element {
  return <></>;
}
