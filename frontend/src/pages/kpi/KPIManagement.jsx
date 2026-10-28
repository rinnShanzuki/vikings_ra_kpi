import React, { useEffect, useState } from 'react';
import kpiApi from '../../services/kpiApi';
import DataTable from '../../components/common/DataTable';
import { Settings, Plus, Trash2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function KPIManagement() {
  const [kpis, setKpis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const loadKpis = () => {
    setLoading(true);
    kpiApi.getKPIs()
      .then(setKpis)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadKpis();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete KPI "${name}"?`)) return;

    try {
      await kpiApi.deleteKPI(id);
      setMsg(`KPI "${name}" deleted.`);
      loadKpis();
    } catch (err) {
      setError(err.message);
    }
  };

  const columns = [
    { key: 'name', header: 'KPI Name' },
    { key: 'metricKey', header: 'Bound Metric' },
    {
      key: 'target',
      header: 'Target Threshold',
      render: (val, row) => <span>{val} {row.unit}</span>
    },
    {
      key: 'comparison',
      header: 'Condition',
      render: (val) => (
        <span className="pill pill-info">
          {val === 'at_most' ? 'Maximum (≤)' : 'Minimum (≥)'}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (_, row) => (
        <button
          onClick={() => handleDelete(row.id, row.name)}
          className="btn btn-danger"
          style={{ padding: '6px 12px', fontSize: '12px' }}
        >
          <Trash2 size={13} /> Delete
        </button>
      )
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="panel">
        <div className="panel-header">
          <div>
            <h3 className="panel-title">
              <Settings size={18} color="#B03030" />
              Configured KPI Registry
            </h3>
            <p className="panel-subtitle">Manage organizational targets, modify evaluation criteria, and define metrics</p>
          </div>
          <NavLink to="/kpi/targets" className="btn btn-primary">
            <Plus size={16} /> Create New Target
          </NavLink>
        </div>

        {msg && <div className="alert-box alert-success" style={{ marginBottom: '16px' }}>{msg}</div>}
        {error && <div className="alert-box alert-error" style={{ marginBottom: '16px' }}>{error}</div>}

        {loading ? (
          <p>Loading configured targets...</p>
        ) : (
          <DataTable rows={kpis} columns={columns} />
        )}
      </div>
    </div>
  );
}
