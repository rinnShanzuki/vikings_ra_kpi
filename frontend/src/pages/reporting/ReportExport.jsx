import React, { useState } from 'react';
import reportingApi from '../../services/reportingApi';
import { Download, FileSpreadsheet, CheckCircle2 } from 'lucide-react';

export default function ReportExport() {
  const [reportType, setReportType] = useState('sales');
  const [exporting, setExporting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleDownload = async () => {
    setExporting(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      await reportingApi.exportReport(reportType);
      setSuccessMsg(`Successfully generated and downloaded ${reportType}-report.csv`);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '780px' }}>
      <div className="panel">
        <div className="panel-header">
          <div>
            <h3 className="panel-title">
              <FileSpreadsheet size={18} color="#B03030" />
              Generate & Download Audit Reports
            </h3>
            <p className="panel-subtitle">Export formatted CSV files with UTF-8 BOM encoding for Microsoft Excel & Google Sheets</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '10px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>
              Select Dataset Category:
            </label>
            <select
              className="form-control"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              style={{ maxWidth: '320px' }}
            >
              <option value="sales">Sales & Revenue Transactions (Daily Ledger)</option>
              <option value="inventory">Inventory Stock & Reorder Points</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '10px' }}>
            <button
              onClick={handleDownload}
              disabled={exporting}
              className="btn btn-primary"
            >
              <Download size={16} />
              {exporting ? 'Generating CSV...' : 'Download CSV Report'}
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
        </div>
      </div>
    </div>
  );
}
