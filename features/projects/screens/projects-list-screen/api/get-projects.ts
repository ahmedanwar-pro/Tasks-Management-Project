import { supabase } from '@/lib/supabase';

export type GetProjectsRequest = Record<string, never>;

export type ProjectResponse = {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
};

export type GetProjectsResponse = ProjectResponse[];

export class ProjectsUnauthorizedError extends Error {
  readonly status = 401;

  constructor() {
    super('Your session has expired. Please log in again.');
    this.name = 'ProjectsUnauthorizedError';
  }
}

function isUnauthorizedResponse(error: {
  code?: string;
  message?: string;
  status?: number;
}): boolean {
  return (
    error.status === 401 ||
    error.code === 'PGRST301' ||
    /jwt|unauthorized|authentication/i.test(error.message ?? '')
  );
}

export async function getProjects(): Promise<GetProjectsResponse> {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    if (isUnauthorizedResponse(sessionError)) {
      throw new ProjectsUnauthorizedError();
    }

    throw sessionError;
  }

  if (!session?.access_token) {
    throw new ProjectsUnauthorizedError();
  }

  // The configured Supabase client applies its active session token to this RPC.
  const { data, error } = await supabase.rpc('get_projects', undefined, {
    get: true,
  });

  if (error) {
    if (isUnauthorizedResponse(error)) {
      throw new ProjectsUnauthorizedError();
    }

    throw error;
  }

  return (data ?? []) as GetProjectsResponse;
}

export function isProjectsUnauthorizedError(
  error: unknown,
): error is ProjectsUnauthorizedError {
  return (
    error instanceof ProjectsUnauthorizedError ||
    (error instanceof Error && 'status' in error && error.status === 401)
  );
}
