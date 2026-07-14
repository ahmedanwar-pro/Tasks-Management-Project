-- Return project lists with the newest projects first so newly created
-- projects appear at the top of the first pagination page.

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
  where pm.user_id = auth.uid()
  order by p.created_at desc, p.id desc;
end;
$function$;
