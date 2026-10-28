import React, { useEffect, useState } from 'react';
import reportingApi from '../../services/reportingApi';
import StatCard from '../../components/common/StatCard';
import { Users, UserCheck, UserX, Percent } from 'lucide-react';

export default function HRAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    reportingApi.getHR()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="panel"><p>Loading HR attendance metrics...</p></div>;
  if (error) return <div className="alert-box alert-error">{error}</div>;
  if (!data) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="stats-grid">
        <StatCard
          label="Total Headcount"
          value={data.totalStaff}
          subtext="Active restaurant roster"
          icon={Users}
        />
        <StatCard
          label="Present Today"
          value={data.presentToday}
          subtext="On-duty staff"
          icon={UserCheck}
        />
        <StatCard
          label="Absent Today"
          value={data.absentToday}
          subtext="Leave or unplanned absences"
          icon={UserX}
          badge={<span className={`pill ${data.absentToday > 3 ? 'pill-danger' : 'pill-good'}`}>{data.absentToday} Missing</span>}
        />
        <StatCard
          label="Attendance Rate"
          value={`${data.attendanceRate}%`}
          subtext="Shift attendance ratio"
          icon={Percent}
        />
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <h3 className="panel-title">Workforce Fulfillment Overview</h3>
            <p className="panel-subtitle">Daily restaurant shift punctuality and coverage</p>
          </div>
        </div>

        <div style={{ maxWidth: '600px', margin: '16px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
            <span>Shift Target: 95.0%</span>
            <strong style={{ color: data.attendanceRate >= 90 ? '#34d399' : '#fbbf24' }}>
              Actual: {data.attendanceRate}%
            </strong>
          </div>
          <div className="progress-track" style={{ height: '12px' }}>
            <div
              className={`progress-fill ${data.attendanceRate >= 90 ? 'good' : 'warn'}`}
              style={{ width: `${Math.min(100, data.attendanceRate)}%` }}
            />
          </div>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
          Real-time biometrics integration is active in demonstration mode. Shift records are updated every 30 minutes.
        </p>
      </div>
    </div>
  );
}
