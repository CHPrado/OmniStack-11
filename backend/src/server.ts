import cors from 'cors';
import express from 'express';
import http from 'http';

import routes from './routes';

class Server {
  public server: http.Server;

  private express: express.Application;

  public constructor() {
    this.express = express();

    this.server = new (http.Server)(this.express);

    this.middlewares();
  }

  private middlewares(): void {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(routes);
  }
}

export default new Server().server;
