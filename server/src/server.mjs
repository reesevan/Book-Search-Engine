console.log('Starting server...');

try {
  const express = (await import('express')).default;
  console.log('✔ express loaded');
  const { ApolloServer } = await import('apollo-server-express');
  console.log('✔ ApolloServer loaded');
  const path = await import('path');
  const { fileURLToPath } = await import('url');
  const db = (await import('./config/connection.js')).default;
  console.log('✔ db connection loaded');
  const { authMiddleware } = await import('./utils/auth.js');
  console.log('✔ authMiddleware loaded');
  const { typeDefs, resolvers } = await import('./schemas/index.js');
  console.log('✔ typeDefs and resolvers loaded');

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const app = express();
  const PORT = process.env.PORT || 3001;

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });

  await server.start();
  server.applyMiddleware({ app });

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/build')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../../client/build/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
} catch (error) {
  console.error('❌ Import or server startup failed:', error);
  process.exit(1);
}
