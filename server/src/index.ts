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
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['POST', 'GET', 'OPTIONS'],
    credentials: true,
  }),
);
app.use(express.json({ limit: '250kb' }));
app.use(express.urlencoded({ extended: true, limit: '250kb' }));

app.use(sendContactRouter);

// Add this here 👇
app.get("/", (_req, res) => {
  res.json({
    status: "Backend is running"
  });
});
console.log('CONTACT_ADMIN_EMAIL =', process.env.CONTACT_ADMIN_EMAIL);
app.get('/health', (_req: express.Request, res: express.Response) => {
  res.status(200).json({ ok: true });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[hookah-contact-backend] listening on :${PORT}`);
  console.log(`[hookah-contact-backend] allowed origin: http://localhost:5173`);
});
