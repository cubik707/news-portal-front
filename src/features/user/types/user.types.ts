import { UserRole } from './user-role.enum.ts';

export type User = {
  id: number;
  username: string;
  email: string;
  lastName: string;
  firstName: string;
  surname?: string;
  position: string;
  department: string;
  avatarUrl?: string;
  roles: UserRole[];
  approved: boolean;
};

export type UserForNews = {
  id: number;
  lastName: string;
  firstName: string;
  surname?: string;
  avatarUrl?: string;
};

export type RoleObj = {
  role: UserRole;
}

export type UserFieldObject = Partial<
  Pick<User, Exclude<keyof User, 'id' | 'roles' | 'approved'>>
>;