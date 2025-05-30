import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import connectDB from './config/connection.js';  // your async connect function
import routes from './routes/index.js';

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise);
  if (reason instanceof Error) {
    console.error('Reason (error message):', reason.message);
    console.error('Stack trace:', reason.stack);
  } else {
    try {
      console.error('Reason (object):', JSON.stringify(reason, null, 2));
    } catch {
      console.error('Reason (non-serializable):', reason);
    }
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

async function startServer() {
  try {
    await connectDB();  // connect to MongoDB first
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
