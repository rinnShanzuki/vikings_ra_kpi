/**
 * Integration Service:
 * Acts as the anti-corruption and abstraction layer communicating with external
 * VikingsERP microservices (Point of Sale, Inventory Warehouse, Human Resources, Accounting).
 * Falls back to local datasets during local prototype execution.
 */
import reportModel from '../models/reportModel.js';

export const integrationService = {
  async fetchPosSales(query = {}) {
    // In production: fetch authenticated external POS REST endpoint
    return reportModel.findSales(query);
  },

  async fetchWarehouseInventory() {
    // In production: fetch authenticated external Inventory REST endpoint
    return reportModel.findInventory();
  },

  async fetchStaffAttendance() {
    // In production: fetch authenticated external HR/Biometrics REST endpoint
    return reportModel.findHR();
  },

  async fetchCustomerFeedback() {
    // In production: fetch authenticated external Feedback/Review REST endpoint
    return reportModel.findFeedback();
  },

  async fetchGeneralLedgerFinance() {
    // In production: fetch authenticated external Financial/GL REST endpoint
    return reportModel.findFinancial();
  }
};

export default integrationService;
