'use client';

import type { Session } from '@supabase/supabase-js';
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type InvitationSessionState = {
  error: Error | null;
  isPending: boolean;
  retry: () => void;
  session: Session | null;
};

type InvitationSessionValue = Omit<InvitationSessionState, 'retry'>;

const disabledSessionState: InvitationSessionValue = {
  error: null,
  isPending: false,
  session: null,
};

export function useInvitationSession(enabled: boolean): InvitationSessionState {
  const [retryCount, setRetryCount] = useState(0);
  const [state, setState] = useState<InvitationSessionValue>({
    error: null,
    isPending: true,
    session: null,
  });

  const retry = useCallback(() => {
    setState({ error: null, isPending: true, session: null });
    setRetryCount((count) => count + 1);
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let isActive = true;

    async function hydrateSession(): Promise<void> {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (!isActive) {
          return;
        }

        setState({
          error,
          isPending: false,
          session: error ? null : data.session,
        });
      } catch (error) {
        if (isActive) {
          setState({
            error:
              error instanceof Error
                ? error
                : new Error('Unable to verify the current session.'),
            isPending: false,
            session: null,
          });
        }
      }
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (isActive && event !== 'INITIAL_SESSION') {
        setState({ error: null, isPending: false, session });
      }
    });

    void hydrateSession();

    return () => {
      isActive = false;
      subscription.unsubscribe();
    };
  }, [enabled, retryCount]);

  return { ...(enabled ? state : disabledSessionState), retry };
}
