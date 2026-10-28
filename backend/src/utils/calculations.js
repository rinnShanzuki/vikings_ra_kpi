/**
 * Mathematical and statistical utility functions for reporting and KPI evaluations.
 */

export function calculateAchievementRate(actual, target) {
  if (!target || target === 0) return 0;
  return Number(((actual / target) * 100).toFixed(1));
}

export function determineKPIStatus(actual, target, comparison = 'at_least') {
  const isMet = comparison === 'at_most' ? actual <= target : actual >= target;
  return isMet ? 'on_target' : 'below_target';
}

export function calculateAttendanceRate(present, total) {
  if (!total || total === 0) return 0;
  return Number(((present / total) * 100).toFixed(2));
}

export function calculateProfitMargin(revenue, netIncome) {
  if (!revenue || revenue === 0) return 0;
  return Number(((netIncome / revenue) * 100).toFixed(2));
}

export function formatCurrency(amount, currency = 'PHP') {
  return `${currency} ${Number(amount || 0).toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}
