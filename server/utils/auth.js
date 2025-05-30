import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'mysecret';
const expiration = '2h';

export function authMiddleware({ req }) {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim(); // Bearer <token>
  }

  if (!token) {
    return {};  // No token, return empty context
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    return { user: data };  // Attach user to context
  } catch {
    console.log('Invalid token');
    return {};  // Return empty context on failure
  }
}
