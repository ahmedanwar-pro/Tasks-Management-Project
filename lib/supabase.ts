import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const sessionOnlyPreferenceKey = 'taskly.auth.session-only';

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
}

if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
}

function isBrowser() {
  return typeof window !== 'undefined';
}

function isSessionOnly() {
  return (
    isBrowser() &&
    window.sessionStorage.getItem(sessionOnlyPreferenceKey) === 'true'
  );
}

const authStorage = {
  getItem(key: string) {
    if (!isBrowser()) {
      return null;
    }

    if (isSessionOnly()) {
      return (
        window.sessionStorage.getItem(key) ?? window.localStorage.getItem(key)
      );
    }

    return (
      window.localStorage.getItem(key) ?? window.sessionStorage.getItem(key)
    );
  },
  removeItem(key: string) {
    if (!isBrowser()) {
      return;
    }

    window.localStorage.removeItem(key);
    window.sessionStorage.removeItem(key);
  },
  setItem(key: string, value: string) {
    if (!isBrowser()) {
      return;
    }

    if (isSessionOnly()) {
      window.sessionStorage.setItem(key, value);
      window.localStorage.removeItem(key);
      return;
    }

    window.localStorage.setItem(key, value);
    window.sessionStorage.removeItem(key);
  },
};

export function setAuthSessionPersistence(rememberMe: boolean) {
  if (!isBrowser()) {
    return () => undefined;
  }

  const previousPreference = window.sessionStorage.getItem(
    sessionOnlyPreferenceKey,
  );

  if (rememberMe) {
    window.sessionStorage.removeItem(sessionOnlyPreferenceKey);
  } else {
    window.sessionStorage.setItem(sessionOnlyPreferenceKey, 'true');
  }

  return () => {
    if (previousPreference === null) {
      window.sessionStorage.removeItem(sessionOnlyPreferenceKey);
      return;
    }

    window.sessionStorage.setItem(sessionOnlyPreferenceKey, previousPreference);
  };
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storage: authStorage,
  },
});
