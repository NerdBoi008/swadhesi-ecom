import { BaseEntity } from "./core";

type AdminRole = 'SuperAdmin' | 'Admin' | 'Editor' | 'Viewer';

export interface AdminUser extends BaseEntity {
  username: string;
  password_hash: string;
  role: AdminRole;
  email?: string;
  last_login?: Date;
  permissions?: string[]; // Fine-grained permissions
}