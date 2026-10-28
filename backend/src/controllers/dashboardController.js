import * as reportService from '../services/reportingService.js';
import * as kpiService from '../services/kpiService.js';

export const dashboardController = {
  getDashboard(req, res, next) {
    try {
      const data = reportService.dashboard();
      const kpis = kpiService.results();

      res.json({
        ...data,
        kpiSummary: {
          totalTracked: kpis.length,
          metCount: kpis.filter(k => k.status === 'on_target').length,
          needsAttentionCount: kpis.filter(k => k.status !== 'on_target').length
        }
      });
    } catch (err) {
      next(err);
    }
  }
};

export default dashboardController;
