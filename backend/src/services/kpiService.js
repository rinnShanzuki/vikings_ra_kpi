import kpiModel from '../models/kpiModel.js';
import targetModel from '../models/targetModel.js';
import { metrics } from './reportingService.js';
import { calculateAchievementRate, determineKPIStatus } from '../utils/calculations.js';

export const allowedMetrics = targetModel.getAllowedMetricKeys();

export function list() {
  return kpiModel.findAll();
}

export function getById(id) {
  return kpiModel.findById(id);
}

export function create(input) {
  return kpiModel.create(input);
}

export function update(id, input) {
  return kpiModel.update(id, input);
}

export function remove(id) {
  return kpiModel.delete(id);
}

export function results() {
  const allKpis = kpiModel.findAll();
  return allKpis.map(k => {
    const metricFn = metrics[k.metricKey];
    const actual = typeof metricFn === 'function' ? metricFn() : 0;
    const achievementRate = calculateAchievementRate(actual, k.target);
    const status = determineKPIStatus(actual, k.target, k.comparison);

    return {
      ...k,
      actual,
      achievementRate,
      status,
      evaluatedAt: new Date().toISOString(),
      source: 'demo'
    };
  });
}

export function alerts() {
  return results().filter(item => item.status !== 'on_target');
}

export function history() {
  // Generates timeline simulation for evaluation trend tracking
  const currentResults = results();
  const pastDays = [
    { date: '2026-10-05', metPercent: 75 },
    { date: '2026-10-06', metPercent: 80 },
    { date: '2026-10-07', metPercent: 85 },
    { date: '2026-10-08', metPercent: 70 },
    { date: '2026-10-09', metPercent: 90 },
    { date: '2026-10-10', metPercent: 88 },
    { date: '2026-10-11', metPercent: Math.round((currentResults.filter(k => k.status === 'on_target').length / (currentResults.length || 1)) * 100) }
  ];

  return {
    evaluations: currentResults,
    historyTimeline: pastDays
  };
}

export function validate(input) {
  return targetModel.validate(input).valid;
}

export default {
  allowedMetrics,
  list,
  getById,
  create,
  update,
  remove,
  results,
  alerts,
  history,
  validate
};
