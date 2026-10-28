import React, { useEffect, useState } from 'react';
import kpiApi from '../../services/kpiApi';
import StatCard from '../../components/common/StatCard';
import KPIChart from '../../components/charts/KPIChart';
import { Target, CheckCircle2, AlertTriangle, Plus, ArrowUpRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function KPIDashboard() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    kpiApi.getKPIResults()
      .then(setResults)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="panel"><p>Loading KPI evaluations...</p></div>;
  if (error) return <div className="alert-box alert-error">{error}</div>;

  const metCount = results.filter((k) => k.status === 'on_target').length;
  const attentionCount = results.filter((k) => k.status !== 'on_target').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="stats-grid">
        <StatCard
          label="Tracked Metrics"
          value={results.length}
          subtext="Active performance goals"
          icon={Target}
        />
        <StatCard
          label="Targets Met"
          value={metCount}
          subtext={`${results.length > 0 ? Math.round((metCount / results.length) * 100) : 0}% success rate`}
          icon={CheckCircle2}
          badge={<span className="pill pill-good">Healthy</span>}
        />
        <StatCard
          label="Needs Attention"
          value={attentionCount}
          subtext="Metrics below set threshold"
          icon={AlertTriangle}
          badge={<span className={`pill ${attentionCount > 0 ? 'pill-danger' : 'pill-good'}`}>{attentionCount} Underperforming</span>}
        />
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <h3 className="panel-title">KPI Achievement Rate Distribution</h3>
            <p className="panel-subtitle">Performance percentage against defined organizational benchmarks</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <NavLink to="/kpi/manage" className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: '12px' }}>
              Manage KPIs <ArrowUpRight size={14} />
            </NavLink>
            <NavLink to="/kpi/targets" className="btn btn-primary" style={{ padding: '6px 14px', fontSize: '12px' }}>
              <Plus size={14} /> New Target
            </NavLink>
          </div>
        </div>
        <KPIChart kpis={results} height={280} />
      </div>

      <div>
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: '#fff' }}>
          Detailed Goal Trackers
        </h3>
        <div className="kpi-cards-grid">
          {results.map((k) => {
            const isMet = k.status === 'on_target';
            const rate = k.achievementRate ?? 0;
            return (
              <div key={k.id} className={`kpi-card ${isMet ? 'on-target' : 'below-target'}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <strong style={{ fontSize: '15px', color: '#fff' }}>{k.name}</strong>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Metric: {k.metricKey}
                    </div>
                  </div>
                  <span className={`pill ${isMet ? 'pill-good' : 'pill-warn'}`}>
                    {k.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="kpi-percentage">{rate}%</div>

                <div className="progress-track">
                  <div
                    className={`progress-fill ${isMet ? 'good' : 'warn'}`}
                    style={{ width: `${Math.max(0, Math.min(100, rate))}%` }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: 'var(--text-muted)' }}>
                  <span>Actual: <strong style={{ color: '#fff' }}>{k.actual}</strong></span>
                  <span>Target: <strong style={{ color: '#fff' }}>{k.target} {k.unit}</strong></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
