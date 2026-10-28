/**
 * Role-Based Access Control Middleware:
 * Verifies that the authenticated user possesses at least one of the permitted roles.
 */
export function permit(...roles) {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ error: 'Unauthenticated request' });
    }

    if (roles.includes(req.user.role)) {
      return next();
    }

    return res.status(403).json({
      error: `Access Denied: Role '${req.user.role}' lacks permission for this action. Allowed: ${roles.join(', ')}`
    });
  };
}

export default permit;
