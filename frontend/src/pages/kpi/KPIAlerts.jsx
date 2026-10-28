import React, { useEffect, useState } from 'react';
import kpiApi from '../../services/kpiApi';
import DataTable from '../../components/common/DataTable';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function KPIAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    kpiApi.getKPIAlerts()
      .then(setAlerts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="panel"><p>Checking for operational KPI alerts...</p></div>;
  if (error) return <div className="alert-box alert-error">{error}</div>;

  const columns = [
    { key: 'name', header: 'Underperforming KPI' },
    { key: 'metricKey', header: 'Metric Domain' },
    {
      key: 'actual',
      header: 'Actual Recorded',
      render: (val, row) => <span style={{ color: '#d4a0a0', fontWeight: '700' }}>{val} {row.unit}</span>
    },
    {
      key: 'target',
      header: 'Expected Target',
      render: (val, row) => <span>{val} {row.unit}</span>
    },
    {
      key: 'achievementRate',
      header: 'Achievement Rate',
      render: (val) => (
        <span style={{ color: '#fbbf24', fontWeight: '700' }}>
          {val ?? '—'}%
        </span>
      )
    },
    {
      key: 'priority',
      header: 'Severity',
      render: () => <span className="pill pill-danger">High Priority</span>
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="panel">
        <div className="panel-header">
          <div>
            <h3 className="panel-title">
              <AlertTriangle size={18} color="#B03030" />
              Active KPI Variance Alerts
            </h3>
            <p className="panel-subtitle">Immediate operational exceptions where branch outputs fall below defined thresholds</p>
          </div>
          <NavLink to="/kpi/evaluation" className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: '12px' }}>
            View Full Evaluation Matrix
          </NavLink>
        </div>

        {alerts.length === 0 ? (
          <div className="alert-box alert-success" style={{ marginTop: '10px' }}>
            <CheckCircle2 size={18} />
            <span>All monitored KPI targets are currently healthy and meeting expectations.</span>
          </div>
        ) : (
          <div>
            <div className="alert-box alert-error" style={{ marginBottom: '20px' }}>
              <AlertTriangle size={18} />
              <span>{alerts.length} target(s) require management review and operational corrective action.</span>
            </div>
            <DataTable rows={alerts} columns={columns} />
          </div>
        )}
      </div>
    </div>
  );
}
