// Opción 1: Todo en ES Modules (recomendado si usas type: "module" en package.json)
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index.js';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api', routes);

// Para verificar que la API esté funcionando
app.get('/api', (req, res) => {
  res.send('API funcionando correctamente');
});

export { app, prisma };