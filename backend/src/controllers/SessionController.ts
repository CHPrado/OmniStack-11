import { Request, Response } from 'express';

import connection from '../database/connection';
import { OngProps } from '../interfaces';

interface CustomRequest extends Request {
  body: OngProps;
}

export default {
  async create(request: CustomRequest, response: Response): Promise<Response> {
    const { id } = request.body;

    const ong = await connection<OngProps>('ongs')
      .where('id', id)
      .select('name')
      .first();

    if (!ong) {
      return response.status(400).json({ error: 'No ONG found with this ID' });
    }

    return response.json(ong);
  },
};
