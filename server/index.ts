import express from 'express';
import dotenv from 'dotenv';
import next, { NextApiHandler } from 'next';
import mongoose from 'mongoose';
import User from './Models/UserSchema';

import passport from './Auth';

// Routes
import { MainRouter } from './routes';

// Controllers
import { YelpAPIController } from './Controllers/API/Yelp';

import mongooseLoader from './Loaders';
import { NextRouter } from 'next/dist/next-server/lib/router/router';

const PORT = process.env.PORT || 8080;

const apiKey: string = process.env.YelpAPIKey as string;

class Server {

    private port: number = (process.env.PORT as unknown) as number || 8080;
    private dev: boolean = process.env.NODE_ENV !== "production";
    private app: any;
    private handle: any;
    private _server: express.Express;
    private db: any;
    private passport: passport.Authenticator;

    constructor() {
        this.app = next({ dev: this.dev });
        this.handle = this.app.getRequestHandler();
        this.passport = passport;
        this.config();
    }

    private config() {
        dotenv.config();
    }

    public async startServer() {
        await this.initializeDB();
        this.app.prepare()
            .then(() => {
                this._server = express();
                this.routes();
                this._server.listen(this.port, async () => {
                    console.log('Listening on port: ', + this.port);
                })
            })
    }

    private authMiddleware() {
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }


    private async initializeDB() {
        this.db = await mongooseLoader()
            .then(() => { console.log('Connected to db') })
            .catch((error: any) => { console.log('Error: ', error) });
    }

    private routes() {
      //  this._server.use('/', MainRouter);
        this._server.get('*', (req, res) => this.handle(req, res));
    }
}

new Server().startServer();

