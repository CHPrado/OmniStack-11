import crypto from 'crypto';
import { Request, Response } from 'express';

import connection from '../database/connection';
import { OngProps } from '../interfaces';

export default {
  async index(request: Request, response: Response): Promise<Response> {
    const ongs = await connection<OngProps>('ongs').select('*');

    return response.json(ongs);
  },

  async create(request: Request, response: Response): Promise<Response> {
    const {
      name, email, whatsapp, city, uf,
    } = request.body;

    const id = crypto.randomBytes(4).toString('HEX');

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });

    return response.json({ id });
  },
};
