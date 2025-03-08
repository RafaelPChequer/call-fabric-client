import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { CallProvider } from '../state/CallState.js';
import { AuthProvider, useAuth } from '../state/AuthState.js';
import { Navbar } from '../components/Navbar.js';
import { CallConsole } from '../components/CallConsole.js';
import { CallPage } from './CallPage.js';
import SubscriberPage from './SubscriberPage.js';
import SubscriberSignupSignin from '../components/SubscriberSignupSignin.js';

const AppContent: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="container mx-auto pt-5">
                <h1 className="text-3xl font-bold mb-3">Call Fabric Demo</h1>
                <hr className="border-0 h-0.5 bg-gray-300 rounded" />
                <Routes>
                    <Route
                        path="/"
                        element={
                            isAuthenticated ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-3">
                                    <div className="col-span-1">
                                        <CallConsole />
                                    </div>
                                </div>
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/call"
                        element={isAuthenticated ? <CallPage /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/subscriber"
                        element={isAuthenticated ? <SubscriberPage /> : <Navigate to="/login" />}
                    />
                    <Route path="/login" element={<SubscriberSignupSignin />} />
                </Routes>
            </div>
        </div>
    );
};

export const App: React.FC = () => {
    return (
        <CallProvider>
            <Router>
                <AppContent />
            </Router>
        </CallProvider>
    );
};