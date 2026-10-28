import React, { useEffect, useState } from 'react';
import reportingApi from '../../services/reportingApi';
import StatCard from '../../components/common/StatCard';
import { Star, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';

export default function FeedbackAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    reportingApi.getFeedback()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="panel"><p>Loading customer reviews...</p></div>;
  if (error) return <div className="alert-box alert-error">{error}</div>;
  if (!data) return null;

  const total = data.totalResponses || 1;
  const posPct = Math.round((data.positive / total) * 100);
  const neuPct = Math.round((data.neutral / total) * 100);
  const negPct = Math.round((data.negative / total) * 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="stats-grid">
        <StatCard
          label="Average Guest Rating"
          value={`${data.averageRating} / 5.0`}
          subtext="High guest satisfaction"
          icon={Star}
        />
        <StatCard
          label="Total Responses"
          value={data.totalResponses}
          subtext="QR & Table feedback surveys"
          icon={MessageSquare}
        />
        <StatCard
          label="Positive Sentiments"
          value={data.positive}
          subtext={`${posPct}% satisfaction rate`}
          icon={ThumbsUp}
          badge={<span className="pill pill-good">{posPct}%</span>}
        />
        <StatCard
          label="Negative Sentiments"
          value={data.negative}
          subtext={`${negPct}% complaint frequency`}
          icon={ThumbsDown}
          badge={<span className="pill pill-danger">{negPct}%</span>}
        />
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <h3 className="panel-title">Sentiment Distribution</h3>
            <p className="panel-subtitle">Diner evaluation across Buffet, Ambient, and Service factors</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '650px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
              <span style={{ color: '#34d399', fontWeight: '600' }}>Positive (4 - 5 Stars)</span>
              <span>{data.positive} responses ({posPct}%)</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill good" style={{ width: `${posPct}%` }} />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
              <span style={{ color: '#fbbf24', fontWeight: '600' }}>Neutral (3 Stars)</span>
              <span>{data.neutral} responses ({neuPct}%)</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill warn" style={{ width: `${neuPct}%` }} />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
              <span style={{ color: '#d4a0a0', fontWeight: '600' }}>Negative (1 - 2 Stars)</span>
              <span>{data.negative} responses ({negPct}%)</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${negPct}%`, background: '#8B1A1A' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
