import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './pages/App.js';
import { AuthProvider } from './state/AuthState.js';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
);