import React from 'react';

export default function StatCard({ label, value, subtext, icon: Icon, badge }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <span className="stat-label">{label}</span>
        {Icon && (
          <div className="stat-icon">
            <Icon size={18} />
          </div>
        )}
      </div>
      <div className="stat-value">{value}</div>
      {(subtext || badge) && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {subtext && <span className="stat-subtext">{subtext}</span>}
          {badge}
        </div>
      )}
    </div>
  );
}
