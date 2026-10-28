import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base directory for local JSON database storage
const DATA_DIR = path.resolve(__dirname, '../../data');
const KPIS_FILE = path.join(DATA_DIR, 'kpis.json');

const INITIAL_KPIS = [
  {
    id: 1,
    name: 'Monthly Sales Target',
    metricKey: 'total_sales',
    target: 150000,
    comparison: 'at_least',
    unit: 'PHP',
    createdAt: '2026-10-01T00:00:00.000Z'
  },
  {
    id: 2,
    name: 'Staff Attendance',
    metricKey: 'attendance_rate',
    target: 95,
    comparison: 'at_least',
    unit: '%',
    createdAt: '2026-10-01T00:00:00.000Z'
  },
  {
    id: 3,
    name: 'Low Stock Threshold Limit',
    metricKey: 'low_stock_items',
    target: 2,
    comparison: 'at_most',
    unit: 'items',
    createdAt: '2026-10-01T00:00:00.000Z'
  },
  {
    id: 4,
    name: 'Customer Satisfaction Score',
    metricKey: 'average_rating',
    target: 4.5,
    comparison: 'at_least',
    unit: '/5',
    createdAt: '2026-10-01T00:00:00.000Z'
  }
];

export const database = {
  getKpisFilePath() {
    return KPIS_FILE;
  },

  init() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(KPIS_FILE)) {
      fs.writeFileSync(KPIS_FILE, JSON.stringify(INITIAL_KPIS, null, 2), 'utf8');
    }
  },

  readKpis() {
    this.init();
    try {
      const content = fs.readFileSync(KPIS_FILE, 'utf8');
      return JSON.parse(content);
    } catch (err) {
      console.error('Error reading KPIs storage:', err);
      return [];
    }
  },

  writeKpis(data) {
    this.init();
    fs.writeFileSync(KPIS_FILE, JSON.stringify(data, null, 2), 'utf8');
  }
};

export default database;
