import reportModel from '../models/reportModel.js';

export const analyticsService = {
  getSalesBreakdown(query = {}) {
    const salesData = reportModel.findSales(query);
    const categoryTotals = {};
    const itemTotals = {};

    for (const record of salesData.daily) {
      categoryTotals[record.category] = (categoryTotals[record.category] || 0) + record.amount;
      itemTotals[record.item] = (itemTotals[record.item] || 0) + record.amount;
    }

    const categories = Object.entries(categoryTotals).map(([name, total]) => ({
      name,
      total,
      percentage: salesData.totalSales > 0 ? Number(((total / salesData.totalSales) * 100).toFixed(1)) : 0
    }));

    const topItems = Object.entries(itemTotals)
      .map(([name, total]) => ({ name, total }))
      .sort((a, b) => b.total - a.total);

    return {
      ...salesData,
      categories,
      topItems
    };
  },

  getInventoryRisks() {
    const inv = reportModel.findInventory();
    const criticallyLow = inv.items.filter(item => item.quantity <= item.reorderPoint / 2);

    return {
      totalItems: inv.items.length,
      lowStockItems: inv.lowStock,
      criticallyLowItems: criticallyLow,
      stockHealthPercent: inv.items.length > 0 
        ? Number((((inv.items.length - inv.lowStock.length) / inv.items.length) * 100).toFixed(1))
        : 100
    };
  },

  getFeedbackSentiment() {
    const fb = reportModel.findFeedback();
    const total = fb.totalResponses || 1;

    return {
      ...fb,
      positivePercent: Number(((fb.positive / total) * 100).toFixed(1)),
      neutralPercent: Number(((fb.neutral / total) * 100).toFixed(1)),
      negativePercent: Number(((fb.negative / total) * 100).toFixed(1))
    };
  }
};

export default analyticsService;
