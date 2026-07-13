import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import './config/database';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import teamsRouter from './routes/teams';
import usersRouter from './routes/users';
import workoutsRouter from './routes/workouts';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-${port}.app.github.dev`
  : `http://localhost:${port}`;

app.use(cors());
app.use(express.json());

app.get('/api/', (_req, res) => {
  res.json({
    message: 'OctoFit Tracker API',
    baseUrl,
    routes: [
      '/api/users/',
      '/api/teams/',
      '/api/activities/',
      '/api/leaderboard/',
      '/api/workouts/',
    ],
  });
});

app.use('/api/users/', usersRouter);
app.use('/api/teams/', teamsRouter);
app.use('/api/activities/', activitiesRouter);
app.use('/api/leaderboard/', leaderboardRouter);
app.use('/api/workouts/', workoutsRouter);

app.listen(port, () => {
  console.log(`OctoFit Tracker API running at ${baseUrl}`);
});