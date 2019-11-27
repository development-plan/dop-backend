import express, { Router } from 'express';

import auth from './auth';
import post from './post';

const router: express.IRouter = Router();

router.use('/auth', auth);
router.use('/post', post);

export default router;
