import { supabase } from '@/lib/supabase';

const getProjectsRpcName = 'get_projects';

export type GetProjectsRequest = {
  limit: number;
  offset: number;
  searchTerm?: string;
};

export type ProjectResponse = {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
};

export type GetProjectsResponse = {
  projects: ProjectResponse[];
  totalCount: number;
};

export class ProjectsUnauthorizedError extends Error {
  readonly status = 401;

  constructor() {
    super('Your session has expired. Please log in again.');
    this.name = 'ProjectsUnauthorizedError';
  }
}

type ProjectsApiError = {
  code?: string;
  message?: string;
  status?: number;
};

function isUnauthorizedResponse(error: ProjectsApiError): boolean {
  return (
    error.status === 401 ||
    error.code === 'PGRST301' ||
    /jwt|unauthorized|authentication/i.test(error.message ?? '')
  );
}

async function requireProjectsSession(): Promise<void> {
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
}

export async function getProjects({
  limit,
  offset,
  searchTerm,
}: GetProjectsRequest): Promise<GetProjectsResponse> {
  await requireProjectsSession();

  const normalizedSearchTerm = searchTerm?.trim() ?? '';

  // The configured Supabase client applies its active session token to this RPC.
  const { count, data, error } = await supabase
    .rpc(
      getProjectsRpcName,
      { search_term: normalizedSearchTerm },
      {
        count: 'exact',
        get: true,
      },
    )
    .range(offset, offset + limit - 1);

  if (error) {
    if (isUnauthorizedResponse(error)) {
      throw new ProjectsUnauthorizedError();
    }

    throw error;
  }

  const projects = (data ?? []) as ProjectResponse[];

  return {
    projects,
    totalCount: count ?? projects.length,
  };
}

export function isProjectsUnauthorizedError(
  error: unknown,
): error is ProjectsUnauthorizedError {
  return (
    error instanceof ProjectsUnauthorizedError ||
    (error instanceof Error && 'status' in error && error.status === 401)
  );
}
