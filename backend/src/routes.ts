
import { celebrate, Segments, Joi } from 'celebrate';
import express from 'express';

import IncidentController from './controllers/IncidentController';
import OngController from './controllers/OngController';
import ProfileController from './controllers/ProfileController';
import SessionController from './controllers/SessionController';

class Routes {
  public routes: express.Router;

  public constructor() {
    this.routes = express.Router();

    this.setRoutes();
  }

  private setRoutes(): void {
    this.routes.post('/sessions', SessionController.create);

    this.routes.get('/ongs', OngController.index);

    this.routes.post('/ongs', celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
      }),
    }), OngController.create);

    this.routes.get('/profile', celebrate({
      [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
      }).unknown(),
    }), ProfileController.index);

    this.routes.get('/incidents', celebrate({
      [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
      }),
    }), IncidentController.index);

    this.routes.post('/incidents', IncidentController.create);

    this.routes.delete('/incidents/:id', celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
      }),
    }), IncidentController.delete);
  }
}

export default new Routes().routes;
