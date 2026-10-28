import { sales, inventory, hr, feedback, finance } from '../data/mock.js';

export const reportModel = {
  findSales(query = {}) {
    let filtered = [...sales];
    if (query.from) {
      filtered = filtered.filter(s => s.date >= query.from);
    }
    if (query.to) {
      filtered = filtered.filter(s => s.date <= query.to);
    }
    if (query.category) {
      filtered = filtered.filter(s => s.category.toLowerCase() === query.category.toLowerCase());
    }

    const totalSales = filtered.reduce((acc, curr) => acc + curr.amount, 0);
    const totalOrders = filtered.reduce((acc, curr) => acc + curr.orders, 0);

    return {
      currency: 'PHP',
      totalSales,
      totalOrders,
      averageOrderValue: totalOrders > 0 ? Number((totalSales / totalOrders).toFixed(2)) : 0,
      daily: filtered,
      source: 'demo'
    };
  },

  findInventory() {
    const lowStock = inventory.filter(item => item.quantity < item.reorderPoint);
    return {
      items: inventory,
      lowStock,
      totalItems: inventory.length,
      lowStockCount: lowStock.length,
      source: 'demo'
    };
  },

  findHR() {
    return {
      ...hr,
      source: 'demo'
    };
  },

  findFeedback() {
    return {
      ...feedback,
      source: 'demo'
    };
  },

  findFinancial() {
    return {
      ...finance,
      source: 'demo'
    };
  }
};

export default reportModel;
