import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import { fileURLToPath } from 'url';
import { typeDefs, resolvers } from './schemas'; // you'll create these
import { authMiddleware } from './utils/auth.js';
import db from './config/connection.ts';
// Fixes __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3001;
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Apollo Server setup
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware, // attaches user to context if logged in
});
const startApolloServer = async () => {
    await server.start();
    server.applyMiddleware({ app });
    // Static assets for production
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/build')));
        app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../client/build/index.html')));
    }
    // Start server
    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`🌍 Server running on http://localhost:${PORT}`);
            console.log(`🚀 GraphQL endpoint at http://localhost:${PORT}${server.graphqlPath}`);
        });
    });
};
startApolloServer();
