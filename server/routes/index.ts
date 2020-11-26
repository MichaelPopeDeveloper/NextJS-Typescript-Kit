import { Router } from 'express';

import { APIRouter } from './API';

export const MainRouter = Router()
    .use('/api', APIRouter)
    .get('/', (req, res) => res.send('Hello World!'))