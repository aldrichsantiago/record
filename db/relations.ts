import { relations } from 'drizzle-orm';
import { users } from './schema/users';
import { roles } from './schema/roles';
import { permissions } from './schema/permissions';
import { userRoles } from './schema/user_roles';
import { rolePermissions } from './schema/role_permissions';

export const usersRelations = relations(users, ({ many }) => ({
  roles: many(userRoles),
}));

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(userRoles),
  permissions: many(rolePermissions),
}));

export const permissionsRelations = relations(permissions, ({ many }) => ({
  roles: many(rolePermissions),
}));
