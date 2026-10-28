import * as kpiService from '../services/kpiService.js';
import targetModel from '../models/targetModel.js';

export const kpiController = {
  getKPIs(req, res, next) {
    try {
      res.json(kpiService.list());
    } catch (err) {
      next(err);
    }
  },

  getKPIById(req, res, next) {
    try {
      const kpi = kpiService.getById(req.params.id);
      if (!kpi) {
        return res.status(404).json({ error: 'KPI target not found' });
      }
      res.json(kpi);
    } catch (err) {
      next(err);
    }
  },

  createKPI(req, res, next) {
    try {
      const validation = targetModel.validate(req.body);
      if (!validation.valid) {
        return res.status(400).json({ error: validation.message });
      }

      const created = kpiService.create(req.body);
      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  },

  updateKPI(req, res, next) {
    try {
      const existing = kpiService.getById(req.params.id);
      if (!existing) {
        return res.status(404).json({ error: 'KPI target not found' });
      }

      const merged = { ...existing, ...req.body };
      const validation = targetModel.validate(merged);
      if (!validation.valid) {
        return res.status(400).json({ error: validation.message });
      }

      const updated = kpiService.update(existing.id, req.body);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  },

  deleteKPI(req, res, next) {
    try {
      const removed = kpiService.remove(req.params.id);
      if (!removed) {
        return res.status(404).json({ error: 'KPI target not found' });
      }
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  },

  getKPIResults(req, res, next) {
    try {
      res.json(kpiService.results());
    } catch (err) {
      next(err);
    }
  },

  getKPIAlerts(req, res, next) {
    try {
      res.json(kpiService.alerts());
    } catch (err) {
      next(err);
    }
  },

  getKPIHistory(req, res, next) {
    try {
      res.json(kpiService.history());
    } catch (err) {
      next(err);
    }
  }
};

export default kpiController;
