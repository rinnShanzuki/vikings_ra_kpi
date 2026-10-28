import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';

export default function InventoryChart({ items = [], height = 300 }) {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={items} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.06)" />
          <XAxis dataKey="item" stroke="#888888" tick={{ fill: '#CCCCCC', fontSize: 12 }} />
          <YAxis stroke="#888888" tick={{ fill: '#888888', fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              background: '#222222',
              borderColor: '#333333',
              borderRadius: '8px',
              color: '#ffffff',
              boxShadow: '0 4px 16px rgba(0,0,0,0.6)'
            }}
          />
          <Legend />
          <Bar dataKey="quantity" name="Current Stock" fill="#8B1A1A" radius={[4, 4, 0, 0]} />
          <Bar dataKey="reorderPoint" name="Reorder Point" fill="#888888" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
