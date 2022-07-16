import express from 'express';
import next from 'next';
import botListController from '../controllers/botlistController';
import accountController from '../controllers/accountController';
import mongoose from 'mongoose';

const port = parseInt(process.env.PORT ?? '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.urlencoded({ extended: true }), express.json());

  server.get('/api/bot/', botListController.readAll);
  server.get('/api/bot/:botId', botListController.read);
  server.post('/api/bot/', botListController.write);
  server.delete('/api/bot/:botId', botListController.delete);

  server.get('/api/account/', accountController.readAll);
  server.get('/api/account/:accountId', accountController.read);
  server.post('/api/account/', accountController.write);
  server.delete('/api/account/:accountId', accountController.delete);

  server.all('*', (req, res) => {
    return handle(req, res)
  });

  server.listen(port, () => {
    console.log(`Ready on http://localhost:3000`);
  });

  mongoose.Promise = global.Promise;
  const db = mongoose.connection;
  db.on('error', console.error);
  db.once('open', () => {
    console.log('connected to mongo DB server');
  });
  mongoose.connect('mongodb://localhost/discordbots');

  module.exports = server;
});
