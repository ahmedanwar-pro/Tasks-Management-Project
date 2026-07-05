-- Make project invitations single-use and enforce membership uniqueness.
-- Existing accepted invitations predate accepted_at, so their timestamp is
-- backfilled with the migration execution time.

alter table public.project_invitations
  add column accepted_at timestamptz;

update public.project_invitations
set accepted_at = now()
where status = 'accepted';

alter table public.project_invitations
  alter column status set not null;

alter table public.project_invitations
  add constraint project_invitations_status_check
  check (status in ('pending', 'accepted', 'expired'));

alter table public.project_members
  add constraint project_members_project_id_user_id_key
  unique (project_id, user_id);

create or replace function public.accept_invitation(p_token text)
returns void
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_invite public.project_invitations%rowtype;
  v_user_id uuid;
  v_user_email text;
begin
  v_user_id := auth.uid();

  if v_user_id is null then
    raise sqlstate 'PT401'
      using message = 'Authentication required',
            detail = 'INVITATION_AUTHENTICATION_REQUIRED';
  end if;

  select *
  into v_invite
  from public.project_invitations
  where token = p_token
  for update;

  if not found then
    raise exception using
      message = 'Invalid invitation',
      detail = 'INVITATION_INVALID';
  end if;

  if v_invite.status = 'accepted' then
    raise sqlstate 'PT409'
      using message = 'Invitation already accepted',
            detail = 'INVITATION_ALREADY_ACCEPTED';
  end if;

  if v_invite.status = 'expired' or v_invite.expires_at < now() then
    raise exception using
      message = 'Invitation expired',
      detail = 'INVITATION_EXPIRED';
  end if;

  if v_invite.status <> 'pending' then
    raise exception using
      message = 'Invitation is not pending',
      detail = 'INVITATION_NOT_PENDING';
  end if;

  select email
  into v_user_email
  from auth.users
  where id = v_user_id;

  if v_user_email is null
     or lower(trim(v_user_email)) <> lower(trim(v_invite.email)) then
    raise sqlstate 'PT403'
      using message = 'Invitation email does not match the authenticated user',
            detail = 'INVITATION_EMAIL_MISMATCH';
  end if;

  if not exists (
    select 1
    from public.project_members
    where project_id = v_invite.project_id
      and user_id = v_user_id
  ) then
    insert into public.project_members (project_id, user_id, role)
    values (v_invite.project_id, v_user_id, 'member')
    on conflict on constraint project_members_project_id_user_id_key
    do nothing;
  end if;

  update public.project_invitations
  set status = 'accepted',
      accepted_at = now()
  where id = v_invite.id;
end;
$function$;

revoke all on function public.accept_invitation(text) from public, anon;
grant execute on function public.accept_invitation(text) to authenticated, service_role;
