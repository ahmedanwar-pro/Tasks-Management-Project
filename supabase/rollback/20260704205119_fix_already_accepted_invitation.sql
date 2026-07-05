-- Emergency rollback for 20260704205119_fix_already_accepted_invitation.sql.
-- WARNING: dropping accepted_at permanently discards recorded acceptance times.

begin;

create or replace function public.accept_invitation(p_token text)
returns void
language plpgsql
security definer
as $function$
declare
  v_invite record;
begin
  select * into v_invite
  from project_invitations
  where token = p_token;

  if v_invite is null then
    raise exception 'Invalid invitation';
  end if;

  if v_invite.expires_at < now() then
    update project_invitations
    set status = 'expired'
    where id = v_invite.id;

    raise exception 'Invitation expired';
  end if;

  insert into project_members (project_id, user_id, role)
  values (v_invite.project_id, auth.uid(), 'member')
  on conflict do nothing;

  update project_invitations
  set status = 'accepted'
  where id = v_invite.id;
end;
$function$;

grant execute on function public.accept_invitation(text)
  to public, anon, authenticated, service_role;

alter table public.project_members
  drop constraint project_members_project_id_user_id_key;

alter table public.project_invitations
  drop constraint project_invitations_status_check;

alter table public.project_invitations
  alter column status drop not null;

alter table public.project_invitations
  drop column accepted_at;

commit;
