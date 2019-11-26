import { Router } from 'express';

import join from './join';
import login from './login';
import refresh from './refresh';

const router = Router();

router.use('/joins', join);
router.use('/login', login);
router.use('/refresh', refresh);

export default router;
