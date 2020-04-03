import { Request, Response } from 'express';

import connection from '../database/connection';
import { OngProps } from '../interfaces';
import generateUniqueId from '../utils/generateUniqueId';

interface CustomRequest extends Request {
  body: OngProps;
}

export default {
  async index(request: Request, response: Response): Promise<Response> {
    const ongs = await connection<OngProps>('ongs').select('*');

    return response.json(ongs);
  },

  async create(request: CustomRequest, response: Response): Promise<Response> {
    const {
      name, email, whatsapp, city, uf,
    } = request.body;

    const id = generateUniqueId();

    await connection<OngProps>('ongs').insert({
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
