export type ProjectMemberRole = 'Owner' | 'Admin' | 'Member' | 'Viewer';

export type ProjectMember = {
  id: string;
  name: string;
  email: string;
  initials: string;
  avatarUrl?: string;
  role: ProjectMemberRole;
  avatarTone: 'primary' | 'success' | 'soft';
};
