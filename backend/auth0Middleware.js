import dotenv from 'dotenv';

dotenv.config();

// Dummy middleware - no authentication required
export const checkJwt = (req, res, next) => {
  next();
};

// Error handling middleware
export const handleJwtErrors = (err, req, res, next) => {
  console.error('Error:', err);
  next(err);
};
