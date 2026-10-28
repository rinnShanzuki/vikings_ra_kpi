import env from '../config/env.js';

export const ALLOWED_DEMO_ROLES = [
  'Manager',
  'Accounting',
  'Authorized Staff',
  'Administrator'
];

/**
 * Authentication Middleware:
 * In DEMO_MODE, simulates session role extraction from the 'x-demo-role' header.
 * When DEMO_MODE is disabled, blocks unauthenticated requests until central SSO/JWT is connected.
 */
export function authenticate(req, res, next) {
  if (!env.DEMO_MODE) {
    return res.status(503).json({
      error: 'Central authentication integration is required before production deployment.'
    });
  }

  const role = req.get('x-demo-role') || 'Manager';

  if (!ALLOWED_DEMO_ROLES.includes(role)) {
    return res.status(401).json({
      error: `Unknown demo role: "${role}". Allowed roles: ${ALLOWED_DEMO_ROLES.join(', ')}`
    });
  }

  req.user = {
    id: 'demo-user-001',
    name: `Demo ${role}`,
    role
  };

  next();
}

export default authenticate;
