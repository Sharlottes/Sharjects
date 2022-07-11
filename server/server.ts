import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('test');
});

app.listen(port, () => {
  console.log(`Connext at http://localhost:${port}`);
});