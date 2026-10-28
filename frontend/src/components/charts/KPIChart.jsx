import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';

export default function KPIChart({ kpis = [], height = 280 }) {
  const chartData = kpis.map(k => ({
    name: k.name.length > 18 ? k.name.slice(0, 16) + '...' : k.name,
    achievement: k.achievementRate || 0,
    status: k.status
  }));

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.06)" />
          <XAxis
            dataKey="name"
            stroke="#888888"
            tick={{ fill: '#CCCCCC', fontSize: 11 }}
            angle={-15}
            textAnchor="end"
          />
          <YAxis
            stroke="#888888"
            tick={{ fill: '#888888', fontSize: 12 }}
            tickFormatter={(val) => `${val}%`}
          />
          <Tooltip
            contentStyle={{
              background: '#222222',
              borderColor: '#333333',
              borderRadius: '8px',
              color: '#ffffff',
              boxShadow: '0 4px 16px rgba(0,0,0,0.6)'
            }}
            formatter={(val) => [`${val}%`, 'Achievement Rate']}
          />
          <Bar dataKey="achievement" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.status === 'on_target' ? '#8B1A1A' : '#A52A2A'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
