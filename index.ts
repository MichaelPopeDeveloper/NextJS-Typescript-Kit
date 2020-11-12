import express from 'express';
import dotenv from 'dotenv';

import User from './Models/UserSchema';

import passport from './Auth';


// Routes
import { MainRouter } from './routes';

// Controllers
import { YelpAPIController } from './Controllers/API/Yelp';

import mongooseLoader from './Loaders';

const PORT = process.env.PORT || 8080;

const apiKey: string = process.env.YelpAPIKey as string;

const startSever = async () => {
    const app = express();
    dotenv.config();
    YelpAPIController.init({ apiKey });
    const db = await mongooseLoader();

    db.once('open', () => {
        console.log('Connected to the database');
    });

    db.on('error', (error: any) => {
        console.log('Error: ', error);
    });

    const bob = new User({ name: 'Bob', username: 'bob1', password: 'lol' });

    bob.save()
        .then((record) => console.log('Record: ', record));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/', MainRouter);

    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
};

class Server {

    private port: number = (process.env.PORT as unknown) as number || 8080;
    private app: express.Express;
    private db: any;
    private passport: passport.Authenticator;

    constructor() {
        this.app = express();
        this.passport = passport;
        this.config();
    }

    private config() {
        dotenv.config();
    }

    public async server() {
        await this.initializeDB();
        // this.authMiddleware();
        this.routes();
        this.app.listen(this.port, async () => {
            console.log('Listening on port: ', + this.port);
        })
    }

    private authMiddleware() {
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }


    private async initializeDB() {
        this.db = await mongooseLoader();
    }

    private routes() {
        this.app.use('/', MainRouter);
    }
}

new Server().server();

