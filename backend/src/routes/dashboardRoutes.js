import { Router } from 'express';
import { permit } from '../middleware/roleMiddleware.js';
import dashboardController from '../controllers/dashboardController.js';

const router = Router();

// Executive Dashboard view is accessible by Managers and Administrators
router.get('/', permit('Manager', 'Administrator'), dashboardController.getDashboard);

export default router;
