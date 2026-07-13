import { supabase } from '@/lib/supabase';
import {
  isStatisticsUnauthorizedResponse,
  StatisticsUnauthorizedError,
} from './statistics-api-errors';

export async function requireStatisticsSession(): Promise<void> {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    if (isStatisticsUnauthorizedResponse(sessionError)) {
      throw new StatisticsUnauthorizedError();
    }

    throw sessionError;
  }

  if (!session?.access_token) {
    throw new StatisticsUnauthorizedError();
  }
}
