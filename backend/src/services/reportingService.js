import reportModel from '../models/reportModel.js';

export function salesSummary(query = {}) {
  return reportModel.findSales(query);
}

export function inventorySummary() {
  return reportModel.findInventory();
}

export function hrSummary() {
  return reportModel.findHR();
}

export function feedbackSummary() {
  return reportModel.findFeedback();
}

export function financeSummary() {
  return reportModel.findFinancial();
}

export function dashboard() {
  return {
    sales: salesSummary(),
    inventory: inventorySummary(),
    hr: hrSummary(),
    feedback: feedbackSummary(),
    finance: financeSummary(),
    source: 'demo'
  };
}

export function consolidated() {
  return dashboard();
}

export const metrics = {
  total_sales: () => salesSummary().totalSales,
  net_income: () => financeSummary().netIncome,
  attendance_rate: () => hrSummary().attendanceRate,
  average_rating: () => feedbackSummary().averageRating,
  low_stock_items: () => inventorySummary().lowStock.length
};

export default {
  salesSummary,
  inventorySummary,
  hrSummary,
  feedbackSummary,
  financeSummary,
  dashboard,
  consolidated,
  metrics
};
