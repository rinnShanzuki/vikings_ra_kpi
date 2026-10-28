/**
 * Export helpers for generating RFC-4180 compliant CSV exports with Excel-compatible UTF-8 BOM.
 */

export function convertToCsv(rows) {
  if (!rows || rows.length === 0) {
    return '\ufeff';
  }

  const keys = Object.keys(rows[0]);
  const header = keys.map(k => `"${String(k).replaceAll('"', '""')}"`).join(',');

  const body = rows.map(row => {
    return keys
      .map(k => {
        const val = row[k] ?? '';
        const formatted = typeof val === 'object' ? JSON.stringify(val) : String(val);
        return `"${formatted.replaceAll('"', '""')}"`;
      })
      .join(',');
  });

  // Prepend UTF-8 Byte Order Mark (\ufeff) so Microsoft Excel opens it with proper UTF-8 decoding
  return '\ufeff' + [header, ...body].join('\r\n');
}

export function sendCsvResponse(res, filename, csvContent) {
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  return res.send(csvContent);
}
