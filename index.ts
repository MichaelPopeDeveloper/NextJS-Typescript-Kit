import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './Models/UserSchema';

import passport from './Auth';


// Routes
import { MainRouter } from './routes';

// Controllers
import { YelpAPIController } from './Controllers/API/Yelp';

import mongooseLoader from './Loaders';
import { Console } from 'console';

const PORT = process.env.PORT || 8080;

const apiKey: string = process.env.YelpAPIKey as string;

const startSever = async () => {


    // DATABASE_URL=mongodb://localhost/foodme


    // await mongoose.connect(process.env.DATABASE_URL as string, { useUnifiedTopology: true, useNewUrlParser: true })
    //     .then((db) => {
    //         db.connection.once('open', () => {
    //             console.log('Connected to the database');
    //         });

    //         db.connection.on('error', (error: any) => {
    //             console.log('Error: ', error);
    //         });
    //     })
    //     .catch((error) => { console.log('DB: Error: ', error) })



    const app = express();
    dotenv.config();
    YelpAPIController.init({ apiKey });


    // const db = await mongooseLoader();





    // const bob = new User({ name: 'Bob', username: 'bob1', password: 'lol' });

    // bob.save()
    //     .then((record) => console.log('Record: ', record));

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
        this.db = await mongooseLoader()
            .then(() => { console.log('Connected to db') })
            .catch((error: any) => { console.log('Error: ', error) });
    }

    private routes() {
        this.app.use('/', MainRouter);
    }
}

new Server().server();

