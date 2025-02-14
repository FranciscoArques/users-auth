import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import authRoutes from './src/services/login/LoginService';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', (req: Request, res: Response) => {
  res.send({ status: 'ok', message: 'Health check passed!' });
});

app.use('/auth', authRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
