import React from 'react';

export default function DataTable({ rows, columns, emptyMessage = 'No records available' }) {
  if (!rows || rows.length === 0) {
    return <p style={{ color: 'var(--text-muted)', padding: '16px 0' }}>{emptyMessage}</p>;
  }

  const effectiveColumns = columns || Object.keys(rows[0]).map(key => ({
    key,
    header: key.replaceAll(/([A-Z])/g, ' $1')
  }));

  return (
    <div className="table-responsive">
      <table className="data-table">
        <thead>
          <tr>
            {effectiveColumns.map(col => (
              <th key={col.key}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={row.id || idx}>
              {effectiveColumns.map(col => {
                const val = row[col.key];
                return (
                  <td key={col.key}>
                    {col.render ? col.render(val, row) : (typeof val === 'object' ? JSON.stringify(val) : String(val ?? '—'))}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
