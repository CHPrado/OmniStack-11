import { Request, Response } from 'express';

import connection from '../database/connection';
import { OngIncidentProps, IncidentProps } from '../interfaces';

interface CustomRequest extends Request {
  body: IncidentProps;
  query: {
    page: number;
  };
}

export default {
  async index(request: CustomRequest, response: Response): Promise<Response> {
    const { page = 1 } = request.query;

    const [count] = await connection('incidents').count();

    const incidents: OngIncidentProps[] = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ongId')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf',
      ]);

    response.header('X-Total-Count', count['count(*)']);

    return response.json(incidents);
  },

  async create(request: CustomRequest, response: Response): Promise<Response> {
    const { title, description, value } = request.body;
    const ongId = request.headers.authorization;

    const [id] = await connection<IncidentProps>('incidents').insert({
      title,
      description,
      value,
      ongId,
    });

    return response.json({ id });
  },

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const ongId = request.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ongId')
      .first();

    if (incident.ongId !== ongId) {
      return response.status(401).json({ error: 'Operation not permited' });
    }

    await connection('incidents').where('id', id).delete();

    return response.status(204).send();
  },
};
