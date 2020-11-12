import express from 'express';
import dotenv from 'dotenv';

import User from './Models/User';

import passport from './Auth';


// Routes
import { MainRouter } from './routes';

// Controllers
import { YelpAPIController } from './Controllers/API/Yelp';

import mongooseLoader from './Loaders';

const PORT = process.env.PORT || 8080;

const apiKey = process.env.YelpAPIKey || 'LLCfy5izZ6oILXdNzt4CyVRLpT13LolHPDBmLyIfI2g7ejMqI17QPAGch4RDEj_T7Syhh2wfsyHUj-wqHXm7B_gLpieYrzWoVMFpYP77pwjmSYG4tuttS34yKkSmX3Yx';

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

startSever();


