// Opción 1: Todo en ES Modules (recomendado si usas type: "module" en package.json)
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index.js';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import path from 'path';
import router from './routes/pagesRoutes.js';
import { fileURLToPath } from 'url';
import setupSwagger from './config/swaggerConfig.js';

const prisma = new PrismaClient();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use('/', router);
// Routes
app.use('/api/v1', routes);
setupSwagger(app);


export { app, prisma };