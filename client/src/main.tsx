import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import App from './App';
import client from './apolloClient';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <Router>
        <App>
          <Routes>
            <Route path="/" element={<SearchBooks />} />
            <Route path="/saved" element={<SavedBooks />} />
            <Route path="*" element={<h1 className="display-2">Wrong page!</h1>} />
          </Routes>
        </App>
      </Router>
    </React.StrictMode>
  </ApolloProvider>
);
