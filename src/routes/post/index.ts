import { Router } from 'express';

import create from './create';
import edit from './edit';
import like from './like';
import remove from './remove';
import view from './view';

const router = Router();

router.use('/create', create);
router.use('/edit', edit);
router.use('/like', like);
router.use('/remove', remove);
router.use('/view', view);

export default router;
