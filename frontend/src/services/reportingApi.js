import api, { formatErrorMessage } from './api';

export const reportingApi = {
  async getDashboard() {
    try {
      const response = await api.get('/reports/dashboard');
      return response.data;
    } catch (err) {
      throw new Error(formatErrorMessage(err));
    }
  },

  async getSales(params = {}) {
    try {
      const response = await api.get('/reports/sales', { params });
      return response.data;
    } catch (err) {
      throw new Error(formatErrorMessage(err));
    }
  },

  async getInventory() {
    try {
      const response = await api.get('/reports/inventory');
      return response.data;
    } catch (err) {
      throw new Error(formatErrorMessage(err));
    }
  },

  async getHR() {
    try {
      const response = await api.get('/reports/hr');
      return response.data;
    } catch (err) {
      throw new Error(formatErrorMessage(err));
    }
  },

  async getFeedback() {
    try {
      const response = await api.get('/reports/feedback');
      return response.data;
    } catch (err) {
      throw new Error(formatErrorMessage(err));
    }
  },

  async getFinancial() {
    try {
      const response = await api.get('/reports/financial');
      return response.data;
    } catch (err) {
      throw new Error(formatErrorMessage(err));
    }
  },

  async getConsolidated() {
    try {
      const response = await api.get('/reports/consolidated');
      return response.data;
    } catch (err) {
      throw new Error(formatErrorMessage(err));
    }
  },

  async getMetrics() {
    try {
      const response = await api.get('/reports/metrics');
      return response.data;
    } catch (err) {
      throw new Error(formatErrorMessage(err));
    }
  },

  async exportReport(type = 'sales', params = {}) {
    try {
      const response = await api.get('/reports/export', {
        params: { type, ...params },
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${type}-report.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      throw new Error(formatErrorMessage(err));
    }
  }
};

export default reportingApi;
