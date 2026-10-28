import { Router } from 'express';
import { permit } from '../middleware/roleMiddleware.js';
import reportingController from '../controllers/reportingController.js';
import dashboardController from '../controllers/dashboardController.js';

const router = Router();

const managerPermit = permit('Manager', 'Administrator');

router.get('/dashboard', managerPermit, dashboardController.getDashboard);
router.get('/sales', managerPermit, reportingController.getSales);
router.get('/inventory', managerPermit, reportingController.getInventory);
router.get('/hr', managerPermit, reportingController.getHR);
router.get('/feedback', managerPermit, reportingController.getFeedback);
router.get('/financial', permit('Manager', 'Accounting', 'Administrator'), reportingController.getFinancial);
router.get('/consolidated', managerPermit, reportingController.getConsolidated);
router.get('/metrics', permit('Manager', 'Authorized Staff', 'Administrator'), reportingController.getMetrics);
router.get('/export', permit('Manager', 'Authorized Staff', 'Administrator'), reportingController.exportReport);

export default router;
