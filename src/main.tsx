import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n'; // Import the i18n configuration

// A simple fallback component to show while translations are loading
const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f8f5f0' }}>
    <p style={{ fontFamily: 'sans-serif', fontSize: '1.2rem', color: '#205D37' }}>Cargando...</p>
  </div>
);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<LoadingFallback />}>
      <App />
    </Suspense>
  </React.StrictMode>
);
