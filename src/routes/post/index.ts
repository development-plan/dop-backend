import express, { Router } from 'express';

import create from './create';
import edit from './edit';
import like from './like';
import remove from './remove';
import view from './view';

const router: express.IRouter = Router();

router.use('/', create);
router.use('/', edit);
router.use('/', like);
router.use('/', remove);
router.use('/', view);

export default router;
