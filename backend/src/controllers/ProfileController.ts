import { Request, Response } from 'express';

import connection from '../database/connection';

export default {
  async index(request: Request, response: Response): Promise<Response> {
    const ongId = request.headers.authorization;

    const incidents = await connection('incidents')
      .where('ongId', ongId)
      .select('*');

    return response.json(incidents);
  },
};
