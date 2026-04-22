/**
 * Password
 * Auto-generated from PHP class: Domain\ValueObjects\Password
 * ⚠️  DO NOT EDIT - This file is auto-generated
 */
export interface Password {
  hashedPassword: string;
}

export function isPassword(data: unknown): data is Password {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof (data as Password).hashedPassword === 'string'
  );
}
