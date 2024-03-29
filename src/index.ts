import mongoose from 'mongoose';

import app from './app';

const PORT: number | string = process.env.PORT || 5000;

// fix all mongoose deprecation warnings
['useNewUrlParser', 'useFindAndModify', 'useCreateIndex', 'useUnifiedTopology']
  .forEach((option, idx) => {
    mongoose.set(option, idx !== 1);
  });

mongoose.connect(
  'mongodb://localhost:27017/test',
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      throw err;
    }
    // tslint:disable-next-line:no-console
    console.log('Conncected to mongodb');
  },
);

app
  // tslint:disable-next-line:no-console
  .listen(PORT, () => console.log(`Listening on: http://localhost:${PORT}`));
