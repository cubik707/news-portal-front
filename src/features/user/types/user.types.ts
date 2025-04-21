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