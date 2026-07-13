import type { StatisticsSectionState } from '../types';

export function toStatisticsSectionState<TData>({
  data,
  error,
  isFetching,
  isPending,
  refetch,
}: {
  data: TData | undefined;
  error: Error | null;
  isFetching: boolean;
  isPending: boolean;
  refetch: () => unknown;
}): StatisticsSectionState<TData> {
  return {
    data: data ?? null,
    error,
    isFetching,
    isPending,
    onRetry: () => {
      void refetch();
    },
    showSkeleton: isPending && data === undefined,
  };
}
