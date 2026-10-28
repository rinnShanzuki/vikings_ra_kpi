/**
 * Target and Metric Definitions Model.
 * Provides metadata for supported business metrics and schema validation.
 */

export const METRIC_DEFINITIONS = {
  total_sales: {
    key: 'total_sales',
    label: 'Total Gross Sales',
    category: 'Sales',
    defaultUnit: 'PHP',
    defaultComparison: 'at_least',
    description: 'Cumulative sales revenue across all restaurant orders'
  },
  net_income: {
    key: 'net_income',
    label: 'Net Operating Income',
    category: 'Finance',
    defaultUnit: 'PHP',
    defaultComparison: 'at_least',
    description: 'Bottom-line net profit after deducting all operational costs'
  },
  attendance_rate: {
    key: 'attendance_rate',
    label: 'Staff Attendance Rate',
    category: 'Human Resources',
    defaultUnit: '%',
    defaultComparison: 'at_least',
    description: 'Percentage of scheduled restaurant personnel present on duty'
  },
  average_rating: {
    key: 'average_rating',
    label: 'Customer Satisfaction Score',
    category: 'Customer Feedback',
    defaultUnit: '/5',
    defaultComparison: 'at_least',
    description: 'Average diner review score across buffet and beverage services'
  },
  low_stock_items: {
    key: 'low_stock_items',
    label: 'Low Stock Item Count',
    category: 'Inventory',
    defaultUnit: 'items',
    defaultComparison: 'at_most',
    description: 'Number of inventory commodities currently under their reorder threshold'
  }
};

export const targetModel = {
  getAllowedMetricKeys() {
    return Object.keys(METRIC_DEFINITIONS);
  },

  getMetricDefinition(key) {
    return METRIC_DEFINITIONS[key] || null;
  },

  getAllMetricDefinitions() {
    return Object.values(METRIC_DEFINITIONS);
  },

  validate(input) {
    if (!input || typeof input !== 'object') return { valid: false, message: 'Invalid payload' };
    if (!input.name || typeof input.name !== 'string' || input.name.trim().length === 0) {
      return { valid: false, message: 'KPI name is required' };
    }
    if (!input.metricKey || !this.getAllowedMetricKeys().includes(input.metricKey)) {
      return { valid: false, message: `Invalid metricKey. Allowed: ${this.getAllowedMetricKeys().join(', ')}` };
    }
    const numTarget = Number(input.target);
    if (!Number.isFinite(numTarget) || numTarget <= 0) {
      return { valid: false, message: 'Target must be a positive number' };
    }
    if (input.comparison && !['at_least', 'at_most'].includes(input.comparison)) {
      return { valid: false, message: 'Comparison must be either "at_least" or "at_most"' };
    }

    return { valid: true };
  }
};

export default targetModel;
