import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import kpiApi from '../../services/kpiApi';
import { Crosshair, CheckCircle2, ArrowLeft } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const METRIC_OPTIONS = [
  { key: 'total_sales', label: 'Total Sales (PHP)', defaultUnit: 'PHP', defComp: 'at_least' },
  { key: 'net_income', label: 'Net Income (PHP)', defaultUnit: 'PHP', defComp: 'at_least' },
  { key: 'attendance_rate', label: 'Staff Attendance Rate (%)', defaultUnit: '%', defComp: 'at_least' },
  { key: 'average_rating', label: 'Customer Rating (/5)', defaultUnit: '/5', defComp: 'at_least' },
  { key: 'low_stock_items', label: 'Low Stock Item Count', defaultUnit: 'items', defComp: 'at_most' }
];

export default function TargetManagement() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    metricKey: 'total_sales',
    target: '',
    comparison: 'at_least',
    unit: 'PHP'
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleMetricChange = (e) => {
    const selectedKey = e.target.value;
    const meta = METRIC_OPTIONS.find((m) => m.key === selectedKey);
    setFormData((prev) => ({
      ...prev,
      metricKey: selectedKey,
      unit: meta ? meta.defaultUnit : '',
      comparison: meta ? meta.defComp : 'at_least'
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      await kpiApi.createKPI(formData);
      setSuccessMsg('Target benchmark successfully registered!');
      setTimeout(() => {
        navigate('/kpi/manage');
      }, 1200);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '780px' }}>
      <div className="panel">
        <div className="panel-header">
          <div>
            <h3 className="panel-title">
              <Crosshair size={18} color="#B03030" />
              Configure Target Benchmark
            </h3>
            <p className="panel-subtitle">Define quantitative business objectives for performance monitoring</p>
          </div>
          <NavLink to="/kpi/manage" className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: '12px' }}>
            <ArrowLeft size={14} /> Back to Registry
          </NavLink>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '10px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>
              KPI Target Title *
            </label>
            <input
              required
              type="text"
              placeholder="e.g. Q4 Weekend Dinner Buffet Sales"
              className="form-control"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>
                Target Operational Metric *
              </label>
              <select
                className="form-control"
                value={formData.metricKey}
                onChange={handleMetricChange}
              >
                {METRIC_OPTIONS.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>
                Target Numeric Goal *
              </label>
              <input
                required
                type="number"
                step="any"
                min="0.01"
                placeholder="e.g. 150000"
                className="form-control"
                value={formData.target}
                onChange={(e) => setFormData({ ...formData, target: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>
                Comparison Condition *
              </label>
              <select
                className="form-control"
                value={formData.comparison}
                onChange={(e) => setFormData({ ...formData, comparison: e.target.value })}
              >
                <option value="at_least">At least (Target Met when Actual ≥ Goal)</option>
                <option value="at_most">At most (Target Met when Actual ≤ Goal)</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>
                Display Unit
              </label>
              <input
                type="text"
                placeholder="e.g. PHP, %, items"
                className="form-control"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              />
            </div>
          </div>

          <div style={{ marginTop: '10px' }}>
            <button type="submit" disabled={submitting} className="btn btn-primary">
              <Crosshair size={16} />
              {submitting ? 'Saving Target...' : 'Register KPI Target'}
            </button>
          </div>

          {successMsg && (
            <div className="alert-box alert-success">
              <CheckCircle2 size={16} />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="alert-box alert-error">
              <span>{errorMsg}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
