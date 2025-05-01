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
  roles: UserRole[];
};

export type UserForNews = {
  fullName: string;
  avatarUrl?: string;
};

export type UserWithoutRoles = Omit<User, 'roles'>;

export type UserFieldObject = Partial<
  Pick<User, Exclude<keyof User, 'id' | 'roles'>>
>;