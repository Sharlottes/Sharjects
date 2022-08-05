import express from 'express';
import next from 'next';
import accountController from './controllers/accountController';
import mongoose from 'mongoose';

const port = parseInt(process.env.PORT ?? '3000') || 3000;

const app = next({
  dev: process.env.NODE_ENV !== 'production',
  dir: 'src/client/'
});
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    server.use(express.urlencoded({ extended: true }), express.json());

    server.get('/api/account/', accountController.read);
    server.post('/api/account/', accountController.write);
    server.delete('/api/account/:userId', accountController.delete);

    server.all('*', (req, res) => handle(req, res));

    server.listen(port, () => {
      console.log(`Ready on http://localhost:${port}`);
    });
    /*
    mongoose.Promise = global.Promise;
    const db = mongoose.connection;
    db.on('error', e => console.error(`
      ============ | Mongo DB Error | ============
                        \n${e}\n
      ============================================
    `));
    db.once('open', () => {
      console.log('connected to mongo DB server');
    });
    mongoose.connect(process.env.MONGODB_URI);
    */
    module.exports = server;
  })
  .catch(console.error);
