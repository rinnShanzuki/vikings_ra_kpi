import * as reportService from '../services/reportingService.js';
import { convertToCsv, sendCsvResponse } from '../utils/exportHelper.js';

export const reportingController = {
  getSales(req, res, next) {
    try {
      const result = reportService.salesSummary(req.query);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  getInventory(req, res, next) {
    try {
      const result = reportService.inventorySummary();
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  getHR(req, res, next) {
    try {
      const result = reportService.hrSummary();
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  getFeedback(req, res, next) {
    try {
      const result = reportService.feedbackSummary();
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  getFinancial(req, res, next) {
    try {
      const result = reportService.financeSummary();
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  getConsolidated(req, res, next) {
    try {
      const result = reportService.consolidated();
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  getMetrics(req, res, next) {
    try {
      const metricsObj = Object.fromEntries(
        Object.entries(reportService.metrics).map(([key, fn]) => [key, fn()])
      );
      res.json(metricsObj);
    } catch (err) {
      next(err);
    }
  },

  exportReport(req, res, next) {
    try {
      const type = req.query.type || 'sales';
      const sources = {
        sales: () => reportService.salesSummary(req.query).daily,
        inventory: () => reportService.inventorySummary().items
      };

      if (!sources[type]) {
        return res.status(400).json({ error: 'Export type must be either "sales" or "inventory"' });
      }

      const rows = sources[type]();
      const csv = convertToCsv(rows);
      sendCsvResponse(res, `${type}-report.csv`, csv);
    } catch (err) {
      next(err);
    }
  }
};

export default reportingController;
