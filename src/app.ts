import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import path from 'path';

import auth from './middlewares/auth';
import routes from './routes';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(auth().initialize());
app.use('/', routes);

interface IError extends Error {
  status: number;
  data?: any;
}

// eslint-disable-next-line no-unused-vars
app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World!');
});

// eslint-disable-next-line no-unused-vars
app.use((err: IError, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message,
  });
});

export default app;
