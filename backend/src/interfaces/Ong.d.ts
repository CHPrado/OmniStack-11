import { Request } from 'express';

export interface OngProps extends Request {
  name: string;
  email: string;
  whatsapp: string;
  city: string;
  uf: string;
}
