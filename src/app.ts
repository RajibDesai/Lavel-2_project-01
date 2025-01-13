import express, { Application } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route.js';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/students', StudentRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

export default app;
