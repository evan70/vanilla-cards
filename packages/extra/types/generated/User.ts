/**
 * User
 * Auto-generated from PHP class: Domain\Model\User
 * ⚠️  DO NOT EDIT - This file is auto-generated
 */
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'editor' | 'viewer' | 'user';
  avatar?: string | null;
  isActive: boolean;
  lastLoginAt?: string | null;
  lastLoginIp?: string | null;
  createdAt: string;
  updatedAt: string;
  assignedRoles: unknown[];
  permissions: unknown[];
  permissionCache: unknown[];
}

export function isUser(data: unknown): data is User {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof (data as User).id === 'string' &&
    typeof (data as User).name === 'string' &&
    typeof (data as User).email === 'string' &&
    typeof (data as User).password === 'string' &&
    typeof (data as User).role === 'string' &&
    ((data as User).avatar === undefined || (data as User).avatar === null || typeof (data as User).avatar === 'string') &&
    typeof (data as User).isActive === 'boolean' &&
    ((data as User).lastLoginAt === undefined || (data as User).lastLoginAt === null || typeof (data as User).lastLoginAt === 'string') &&
    ((data as User).lastLoginIp === undefined || (data as User).lastLoginIp === null || typeof (data as User).lastLoginIp === 'string') &&
    typeof (data as User).createdAt === 'string' &&
    typeof (data as User).updatedAt === 'string' &&
    Array.isArray((data as User).assignedRoles) &&
    Array.isArray((data as User).permissions) &&
    Array.isArray((data as User).permissionCache)
  );
}
