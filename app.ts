import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
require("./src/firebase/db");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', (req: Request, res: Response) => {
  res.send({ status: 'ok', message: 'Health check passed!' });
});

app.use('/auth', require('./src/services/login/LoginService'));
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
