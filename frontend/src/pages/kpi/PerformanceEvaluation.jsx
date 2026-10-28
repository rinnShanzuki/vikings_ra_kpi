import React, { useEffect, useState } from 'react';
import kpiApi from '../../services/kpiApi';
import DataTable from '../../components/common/DataTable';
import { TrendingUp, RefreshCw } from 'lucide-react';

export default function PerformanceEvaluation() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = () => {
    setLoading(true);
    kpiApi.getKPIResults()
      .then(setResults)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const columns = [
    { key: 'name', header: 'Target Objective' },
    { key: 'metricKey', header: 'Indicator' },
    {
      key: 'actual',
      header: 'Actual Value',
      render: (val, row) => <strong style={{ color: '#fff' }}>{val} {row.unit}</strong>
    },
    {
      key: 'target',
      header: 'Goal Threshold',
      render: (val, row) => <span>{val} {row.unit}</span>
    },
    {
      key: 'achievementRate',
      header: 'Achievement %',
      render: (val) => (
        <span style={{ fontWeight: '700', color: val >= 100 ? '#34d399' : val >= 80 ? '#e0b0b0' : '#d4a0a0' }}>
          {val ?? '—'}%
        </span>
      )
    },
    {
      key: 'status',
      header: 'Audit Outcome',
      render: (val) => (
        <span className={`pill ${val === 'on_target' ? 'pill-good' : 'pill-warn'}`}>
          {val === 'on_target' ? 'Target Achieved' : 'Below Target'}
        </span>
      )
    },
    {
      key: 'evaluatedAt',
      header: 'Last Evaluated',
      render: (val) => <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{val ? new Date(val).toLocaleTimeString() : '—'}</span>
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="panel">
        <div className="panel-header">
          <div>
            <h3 className="panel-title">
              <TrendingUp size={18} color="#B03030" />
              Organizational Performance Evaluation Matrix
            </h3>
            <p className="panel-subtitle">Audited comparison of actual operational output versus established benchmarks</p>
          </div>
          <button onClick={loadData} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>
            <RefreshCw size={14} /> Re-evaluate Now
          </button>
        </div>

        {error && <div className="alert-box alert-error" style={{ marginBottom: '16px' }}>{error}</div>}

        {loading ? (
          <p>Evaluating live operational performance metrics...</p>
        ) : (
          <DataTable rows={results} columns={columns} />
        )}
      </div>
    </div>
  );
}
