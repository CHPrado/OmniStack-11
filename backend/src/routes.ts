
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
    this.routes.post('/ongs', OngController.create);

    this.routes.get('/profile', ProfileController.index);

    this.routes.get('/incidents', IncidentController.index);
    this.routes.post('/incidents', IncidentController.create);
    this.routes.delete('/incidents/:id', IncidentController.delete);
  }
}

export default new Routes().routes;
