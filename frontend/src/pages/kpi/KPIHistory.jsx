import React, { useEffect, useState } from 'react';
import kpiApi from '../../services/kpiApi';
import { History } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

export default function KPIHistory() {
  const [historyData, setHistoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    kpiApi.getKPIHistory()
      .then(setHistoryData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="panel"><p>Loading historical performance trend...</p></div>;
  if (error) return <div className="alert-box alert-error">{error}</div>;
  if (!historyData) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="panel">
        <div className="panel-header">
          <div>
            <h3 className="panel-title">
              <History size={18} color="#B03030" />
              Target Compliance History (7-Day Trend)
            </h3>
            <p className="panel-subtitle">Percentage of organizational KPI targets satisfied daily</p>
          </div>
        </div>

        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historyData.historyTimeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.06)" />
              <XAxis dataKey="date" stroke="#888888" tick={{ fill: '#CCCCCC', fontSize: 12 }} />
              <YAxis domain={[0, 100]} stroke="#888888" tickFormatter={(v) => `${v}%`} tick={{ fill: '#888888', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  background: '#222222',
                  borderColor: '#333333',
                  borderRadius: '8px',
                  color: '#ffffff',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.6)'
                }}
                formatter={(v) => [`${v}%`, 'Compliance Rate']}
              />
              <Line
                type="monotone"
                dataKey="metPercent"
                stroke="#B03030"
                strokeWidth={3}
                dot={{ r: 5, fill: '#8B1A1A' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
