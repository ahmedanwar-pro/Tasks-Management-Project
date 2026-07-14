-- Restore the previous unordered get_projects implementation.

create or replace function public.get_projects()
returns setof projects
language plpgsql
security definer
as $function$
begin
  return query
  select p.*
  from projects p
  join project_members pm on pm.project_id = p.id
  where pm.user_id = auth.uid();
end;
$function$;
