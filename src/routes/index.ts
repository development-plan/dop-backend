import express, { Router } from 'express';

import auth from './auth';
import post from './post';
import upload from './upload';

const router: express.IRouter = Router();

router.use('/auth', auth);
router.use('/post', post);
router.use('/upload', upload);

export default router;
