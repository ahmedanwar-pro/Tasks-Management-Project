export type StatisticsDateRange = {
  endDate: string;
  startDate: string;
};

const millisecondsPerDay = 24 * 60 * 60 * 1000;

export function fromStatisticsDateInputValue(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) {
    return null;
  }

  const date = new Date(
    Number(match[1]),
    Number(match[2]) - 1,
    Number(match[3]),
  );

  if (
    date.getFullYear() !== Number(match[1]) ||
    date.getMonth() !== Number(match[2]) - 1 ||
    date.getDate() !== Number(match[3])
  ) {
    return null;
  }

  return date;
}

export function toStatisticsDateInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function getDefaultStatisticsDateRange(
  today = new Date(),
): StatisticsDateRange {
  const startDate = new Date(today);
  startDate.setHours(0, 0, 0, 0);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  return {
    endDate: toStatisticsDateInputValue(endDate),
    startDate: toStatisticsDateInputValue(startDate),
  };
}

export function getStatisticsDateRangeError(
  range: StatisticsDateRange,
): string | null {
  const startDate = fromStatisticsDateInputValue(range.startDate);
  const endDate = fromStatisticsDateInputValue(range.endDate);

  if (!startDate || !endDate) {
    return 'Select both a start date and an end date.';
  }

  const inclusiveDayCount =
    Math.round((endDate.getTime() - startDate.getTime()) / millisecondsPerDay) +
    1;

  if (inclusiveDayCount < 1) {
    return 'End date must be on or after the start date.';
  }

  if (inclusiveDayCount > 7) {
    return 'Date range cannot be longer than 7 days.';
  }

  return null;
}

export function shiftStatisticsDateRange(
  range: StatisticsDateRange,
  days: number,
): StatisticsDateRange {
  const startDate = fromStatisticsDateInputValue(range.startDate);
  const endDate = fromStatisticsDateInputValue(range.endDate);

  if (!startDate || !endDate) {
    return range;
  }

  startDate.setDate(startDate.getDate() + days);
  endDate.setDate(endDate.getDate() + days);

  return {
    endDate: toStatisticsDateInputValue(endDate),
    startDate: toStatisticsDateInputValue(startDate),
  };
}

export function formatStatisticsDateRange(range: StatisticsDateRange): string {
  const startDate = fromStatisticsDateInputValue(range.startDate);
  const endDate = fromStatisticsDateInputValue(range.endDate);

  if (!startDate || !endDate) {
    return 'Select dates';
  }

  const start = startDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });
  const end = endDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year:
      startDate.getFullYear() === endDate.getFullYear() ? undefined : 'numeric',
  });

  return `${start} - ${end}, ${endDate.getFullYear()}`;
}

export function getStatisticsRangeDates(range: StatisticsDateRange): Date[] {
  const startDate = fromStatisticsDateInputValue(range.startDate);
  const endDate = fromStatisticsDateInputValue(range.endDate);

  if (!startDate || !endDate || startDate > endDate) {
    return [];
  }

  const dates: Date[] = [];
  const cursor = new Date(startDate);

  while (cursor <= endDate && dates.length < 7) {
    dates.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }

  return dates;
}
