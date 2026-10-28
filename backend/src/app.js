import express from 'express';
import cors from 'cors';
import env from './config/env.js';
import { authenticate } from './middleware/authMiddleware.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import reportingRoutes from './routes/reportingRoutes.js';
import kpiRoutes from './routes/kpiRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

const app = express();

app.use(cors({
  origin: env.FRONTEND_ORIGIN,
  credentials: true
}));

app.use(express.json({ limit: '100kb' }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    mode: env.DEMO_MODE ? 'demo' : 'production',
    uptime: process.uptime()
  });
});

// Protected API Routes
app.use('/api/dashboard', authenticate, dashboardRoutes);
app.use('/api/reports', authenticate, reportingRoutes);
app.use('/api/kpis', authenticate, kpiRoutes);

// Centralized Error Handling
app.use(errorMiddleware);

export default app;
