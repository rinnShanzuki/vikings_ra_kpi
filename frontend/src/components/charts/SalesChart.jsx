import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

export default function SalesChart({ rows = [], height = 300 }) {
  const formatMoney = (val) => '₱' + Number(val || 0).toLocaleString('en-PH');

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={rows} margin={{ top: 10, right: 20, left: 20, bottom: 0 }}>
          <defs>
            <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B1A1A" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#8B1A1A" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.06)" />
          <XAxis
            dataKey="date"
            stroke="#888888"
            tickFormatter={(date) => (date ? date.slice(5) : '')}
            tick={{ fill: '#CCCCCC', fontSize: 12 }}
          />
          <YAxis
            stroke="#888888"
            tickFormatter={(val) => `₱${(val / 1000).toFixed(0)}k`}
            tick={{ fill: '#888888', fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              background: '#222222',
              borderColor: '#333333',
              borderRadius: '8px',
              color: '#ffffff',
              boxShadow: '0 4px 16px rgba(0,0,0,0.6)'
            }}
            formatter={(value) => [formatMoney(value), 'Gross Sales']}
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#8B1A1A"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#salesGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
