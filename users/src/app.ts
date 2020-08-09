import express, { Application } from 'express'
import * as bodyParser from 'body-parser'
import cors from 'cors'

import { Routes } from './routes'
import mongoose from 'mongoose';

class App {

  public app: Application;

  constructor() {
    this.app = express();
    this.config(this.app);
    this.routing(this.app);
  }

  private config(app: Application): void {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    this.connectionToDatabase();
  }

  private routing(app: Application): void {
    const routesList: Routes = new Routes();
    routesList.routes(app);
  }

  private connectionToDatabase() {
    mongoose.Promise = global.Promise;
    const PORT = process.env.MONGO_PORT;
    const hostname = process.env.MONGO_HOSTNAME;
    mongoose.connect(`mongodb://${hostname}:${PORT}/users`, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
      .then(() => {
        console.log("connexion réussie")
      }).catch((err) => {
        console.log(err)
      });
  }
}

export default new App().app;