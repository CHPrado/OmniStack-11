import * as crypto from 'crypto';

export default function generateUniqueId(): string {
  return crypto.randomBytes(4).toString('HEX');
}
