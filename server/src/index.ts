import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import sendContactRouter from './routes/send-contact';

const app = express();

const PORT = Number(process.env.PORT ?? 4000);

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ?? '*',
    methods: ['POST', 'GET', 'OPTIONS'],
  }),
);
app.use(express.json({ limit: '250kb' }));

app.use(sendContactRouter);

app.get('/health', (_req: express.Request, res: express.Response) => {
  res.status(200).json({ ok: true });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[hookah-contact-backend] listening on :${PORT}`);
});
