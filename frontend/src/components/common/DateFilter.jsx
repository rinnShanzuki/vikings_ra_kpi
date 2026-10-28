import React, { useState } from 'react';
import { Filter, RotateCcw } from 'lucide-react';

export default function DateFilter({ onApply, onReset }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleApply = (e) => {
    e.preventDefault();
    onApply({ from, to });
  };

  const handleReset = () => {
    setFrom('');
    setTo('');
    if (onReset) onReset();
  };

  return (
    <form className="filter-bar" onSubmit={handleApply}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
        <Filter size={16} />
        <span style={{ fontSize: '13px', fontWeight: '600' }}>Filter Range:</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>From</label>
        <input
          type="date"
          className="form-control"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>To</label>
        <input
          type="date"
          className="form-control"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px' }}>
        Apply Filter
      </button>

      {(from || to) && (
        <button
          type="button"
          onClick={handleReset}
          className="btn btn-secondary"
          style={{ padding: '8px 14px' }}
        >
          <RotateCcw size={14} />
          Reset
        </button>
      )}
    </form>
  );
}
