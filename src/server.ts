import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import logger from './util/logger';
import swaggerDocs from './config/swaggerdocs';
import { connectDB } from './config/db';
import fileUpload from 'express-fileupload';

dotenv.config();
const app: Express = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(fileUpload());
app.use(cors());
app.use('/api', routes);
app.use(helmet());
app.use(
  cors({
    // origin: allowedOrigins,
    methods: 'GET,PUT,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  }),
);

connectDB();

app.get('/get', (req, res) => {
  res.send('Server is running');
});

const start = async () => {
  app.listen(port, async () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
  swaggerDocs(app);
};

start();
