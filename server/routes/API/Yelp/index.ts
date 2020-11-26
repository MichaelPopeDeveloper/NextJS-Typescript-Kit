import { Router } from 'express';

import { YelpAPIController } from '../../../Controllers/API/Yelp';

export const YelpRouter = Router()
    .get('/search/:search/:location', async (req, res) => {
        const businesses = await YelpAPIController.search(req.params.search, req.params.location);
        res.json(businesses);
    })
    .get('/reviews/:id', async (req, res) => {
        const reviews = await YelpAPIController.reviews(req.params.id);
        res.json(reviews);
    });