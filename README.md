# VikingsERP Management Suite

A **single project** with exactly two application folders:

- `backend/`: Node.js + Express REST API for Reporting & Analytics and Business Performance & KPI Management.
- `frontend/`: React + Vite management dashboard for both modules.

## Requirements
- Node.js 20+ and npm

## Quick start (VS Code)
1. Extract ZIP and open the `VikingsERP-Management` folder in VS Code.
2. In terminal 1:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   npm run dev
   ```
   On Windows PowerShell, use `Copy-Item .env.example .env` instead of `cp` if needed.
3. In terminal 2:
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   npm run dev
   ```
4. Open **http://localhost:5173**. Backend health check: **http://localhost:5001/api/health**.

## Implemented features
- Management dashboard with summary cards and sales chart
- Sales, inventory, HR, customer feedback, and finance analytics using labeled demo data
- Consolidated overview and CSV exports (sales, inventory)
- KPI target creation, listing, deletion, evaluations, achievement calculations, and alerts
- Frontend demo role selector and backend role restrictions
- KPI targets persist locally in `backend/data/kpis.json` (created automatically)

## API
- `GET /api/health`
- `GET /api/reports/dashboard|sales|inventory|hr|feedback|financial|consolidated|metrics`
- `GET /api/reports/export?type=sales` or `?type=inventory`
- `GET /api/kpis`, `POST /api/kpis`, `PATCH /api/kpis/:id`, `DELETE /api/kpis/:id`
- `GET /api/kpis/results`, `GET /api/kpis/alerts`

## IMPORTANT: Demo vs production
**This is a working starter prototype, not a production-ready integrated ERP.** The other VikingsERP modules' API specifications, central authentication implementation, and central database credentials were not supplied. Therefore:
- Sales, inventory, HR, feedback and finance values are **sample data** in `backend/src/data/mock.js`.
- KPI targets are stored in a **local JSON file**, not in the central ERP database.
- The `x-demo-role` request header is **unsafe for production** and must be replaced with verified central authentication and RBAC. `DEMO_MODE=false` blocks protected API routes until this is implemented.
- Export supports **CSV**; PDF/Excel exports are future enhancements.
- External module integrations, real database migrations, pagination, audit logs, automated tests, and deployment hardening remain to be built.

## Integration approach
Replace the mock data imports in `backend/src/services/reportingService.js` with calls to the other teams' authenticated REST APIs via an application/integration layer. Keep KPI definitions owned by this backend and use the central VikingsERP database through the application layer. Avoid direct reads of other teams' private tables.

## Demo roles
Use the role dropdown in the top-right to simulate Manager, Accounting, Authorized Staff or Administrator permissions. It is for UI testing only. Managers have reporting and KPI access; Accounting can view financial reports; Authorized Staff can export reports and read KPI summaries in this prototype. The administrator's notification integration is not yet implemented.
