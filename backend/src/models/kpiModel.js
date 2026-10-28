import database from '../config/database.js';

export const kpiModel = {
  findAll() {
    return database.readKpis();
  },

  findById(id) {
    const numericId = Number(id);
    return database.readKpis().find(item => item.id === numericId) || null;
  },

  create(data) {
    const list = database.readKpis();
    const nextId = list.length > 0 ? Math.max(...list.map(x => x.id)) + 1 : 1;

    const newKpi = {
      id: nextId,
      name: data.name.trim(),
      metricKey: data.metricKey,
      target: Number(data.target),
      comparison: data.comparison || 'at_least',
      unit: data.unit || '',
      createdAt: new Date().toISOString()
    };

    list.push(newKpi);
    database.writeKpis(list);
    return newKpi;
  },

  update(id, updates) {
    const list = database.readKpis();
    const numericId = Number(id);
    const index = list.findIndex(item => item.id === numericId);

    if (index === -1) return null;

    const existing = list[index];
    const updated = {
      ...existing,
      ...updates,
      id: numericId,
      target: updates.target !== undefined ? Number(updates.target) : existing.target,
      updatedAt: new Date().toISOString()
    };

    list[index] = updated;
    database.writeKpis(list);
    return updated;
  },

  delete(id) {
    const list = database.readKpis();
    const numericId = Number(id);
    const filtered = list.filter(item => item.id !== numericId);

    if (filtered.length === list.length) {
      return false;
    }

    database.writeKpis(filtered);
    return true;
  }
};

export default kpiModel;
