-- Add search support to get_projects while preserving legacy no-arg callers.

create or replace function public.get_projects(search_term text)
returns setof public.projects
language plpgsql
security definer
set search_path = ''
as $function$
declare
  normalized_search_term text := nullif(trim(search_term), '');
begin
  return query
  select p.*
  from public.projects p
  join public.project_members pm on pm.project_id = p.id
  where pm.user_id = auth.uid()
    and (
      normalized_search_term is null
      or p.name ilike '%' || normalized_search_term || '%'
    )
  order by p.created_at desc, p.id desc;
end;
$function$;

create or replace function public.get_projects()
returns setof public.projects
language plpgsql
security definer
set search_path = ''
as $function$
begin
  return query
  select *
  from public.get_projects('');
end;
$function$;

revoke all on function public.get_projects() from public, anon;
grant execute on function public.get_projects() to authenticated, service_role;

revoke all on function public.get_projects(text) from public, anon;
grant execute on function public.get_projects(text) to authenticated, service_role;
