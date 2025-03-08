import React from 'react';
import { useAuth } from '../state/AuthState.js';
import { Navigate } from 'react-router-dom';

const SubscriberPage: React.FC = () => {
    const { user, logout, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="container mx-auto p-4">
            <nav className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Subscriber Dashboard</h1>
                <button
                    onClick={logout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </nav>

            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl mb-4">User Information</h2>
                <ul className="list-group">
                    <li className="py-2">ID: {user?.id}</li>
                    <li className="py-2">Name: {user?.name}</li>
                    <li className="py-2">Email: {user?.email}</li>
                    <li className="py-2">Token: {user?.token}</li>
                </ul>
            </div>
        </div>
    );
};

export default SubscriberPage;