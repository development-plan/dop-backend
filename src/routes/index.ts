import express, { Router } from 'express';

import answer from './answer';
import auth from './auth';
import post from './post';
import search from './search';
import upload from './upload';

const router: express.IRouter = Router();

router.use('/answer', answer);
router.use('/auth', auth);
router.use('/post', post);
router.use('/search', search);
router.use('/upload', upload);

export default router;
