import mongoose from 'mongoose';

import app from './app';

const PORT = process.env.PORT || 5000;

mongoose.connect(
  process.env.MONGO_URI || 'mongodb://localhost:27017/test',
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      throw err;
    }
    // tslint:disable-next-line:no-console
    console.log('Conncected to mongodb');
  },
);

app.listen(
  PORT,
  // tslint:disable-next-line:no-console
  () => console.log(`Listening on: http://localhost:${PORT}`),
);
