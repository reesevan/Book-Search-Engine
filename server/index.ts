import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { authMiddleware } from './utils/auth.js';
import connectDB from './config/connection';

import typeDefs from './schemas/typeDefs.js';
import resolvers from './schemas/resolvers.js';

const app = express();
const PORT = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  // Connect to the DB first
  await connectDB();

  // Setup Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => authMiddleware({ req }),
    })
  );

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
  }

  // Start Express server
  app.listen(PORT, () => {
    console.log(`🌍 Server running at http://localhost:${PORT}`);
    console.log(`🚀 GraphQL endpoint at http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
