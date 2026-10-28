import api, { formatErrorMessage } from './api';

export const kpiApi = {
  async getKPIs() {
    try {
      const response = await api.get('/kpis');
      return response.data;
    } catch (err) {
      throw new Error(formatErrorMessage(err));
    }
  },

  async getKPIById(id) {
    try {
      const response = await api.get(`/kpis/${id}`);
      return response.data;
    } catch (err) {
      throw new Error(formatErrorMessage(err));
    }
  },

  async createKPI(payload) {
    try {
      const response = await api.post('/kpis', payload);
      return response.data;
    } catch (err) {
      throw new Error(formatErrorMessage(err));
    }
  },

  async updateKPI(id, payload) {
    try {
      const response = await api.patch(`/kpis/${id}`, payload);
      return response.data;
    } catch (err) {
      throw new Error(formatErrorMessage(err));
    }
  },

  async deleteKPI(id) {
    try {
      await api.delete(`/kpis/${id}`);
      return true;
    } catch (err) {
      throw new Error(formatErrorMessage(err));
    }
  },

  async getKPIResults() {
    try {
      const response = await api.get('/kpis/results');
      return response.data;
    } catch (err) {
      throw new Error(formatErrorMessage(err));
    }
  },

  async getKPIAlerts() {
    try {
      const response = await api.get('/kpis/alerts');
      return response.data;
    } catch (err) {
      throw new Error(formatErrorMessage(err));
    }
  },

  async getKPIHistory() {
    try {
      const response = await api.get('/kpis/history');
      return response.data;
    } catch (err) {
      throw new Error(formatErrorMessage(err));
    }
  }
};

export default kpiApi;
