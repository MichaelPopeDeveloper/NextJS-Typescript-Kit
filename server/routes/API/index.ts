import {Router} from 'express';

import { YelpRouter } from './Yelp';

export const APIRouter = Router()
.use('/business', YelpRouter)
.get('/', (req, res) => res.send('API home page'));
