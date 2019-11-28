import express, { Router } from 'express';

import create from './create';
import edit from './edit';
import like from './like';
import remove from './remove';

const router: express.IRouter = Router();

router.use('/', create);
router.use('/', edit);
router.use('/', like);
router.use('/', remove);

export default router;
