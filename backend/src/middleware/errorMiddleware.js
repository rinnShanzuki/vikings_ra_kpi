/**
 * Centralized Error Handling Middleware
 */
export function errorMiddleware(err, req, res, next) {
  console.error('[System Error]:', err);

  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    error: message,
    timestamp: new Date().toISOString()
  });
}

export default errorMiddleware;
