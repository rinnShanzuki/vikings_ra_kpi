import { Router } from 'express';
import { permit } from '../middleware/roleMiddleware.js';
import kpiController from '../controllers/kpiController.js';

const router = Router();

const managerPermit = permit('Manager', 'Administrator');
const staffAndManagerPermit = permit('Manager', 'Authorized Staff', 'Administrator');

router.get('/', staffAndManagerPermit, kpiController.getKPIs);
router.get('/results', staffAndManagerPermit, kpiController.getKPIResults);
router.get('/alerts', managerPermit, kpiController.getKPIAlerts);
router.get('/history', staffAndManagerPermit, kpiController.getKPIHistory);
router.get('/:id', staffAndManagerPermit, kpiController.getKPIById);

router.post('/', managerPermit, kpiController.createKPI);
router.patch('/:id', managerPermit, kpiController.updateKPI);
router.delete('/:id', managerPermit, kpiController.deleteKPI);

export default router;
