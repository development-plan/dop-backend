import express, { Router } from 'express';
import multer from 'multer';
import path from 'path';

const router: express.IRouter = Router();

type TDiskStorageOptions
  = (req: Express.Request, file: Express.Multer.File, callback:
      (error: Error | null, destination: string) => void) => void;

const destination: TDiskStorageOptions = (req, file, cb) => {
  cb(null, 'uploads/');
};

const filename: TDiskStorageOptions = (req, file, cb) => {
  cb(null, new Date().getTime() + path.extname(file.originalname));
};

const upload: typeof multer.prototype = multer({
  dest: 'uploads/',
  storage: multer.diskStorage({
    destination,
    filename,
  }),
});

router.post('/', upload.single('image'), (req, res) => {
  const imagePath: string = req.file.path;
  return res.json({ path: imagePath });
});

export default router;
