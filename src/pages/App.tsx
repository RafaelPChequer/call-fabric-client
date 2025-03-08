import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { CallProvider } from '../state/CallState.js';
import { AuthProvider, useAuth } from '../state/AuthState.js';
import { Navbar } from '../components/Navbar.js';
import { CallConsole } from '../components/CallConsole.js';
import { CallPage } from './CallPage.js';
import SubscriberPage from './SubscriberPage.js';
import SubscriberSignupSignin from '../components/SubscriberSignupSignin.js';
import Directory from "../components/Directory.js";

const AppContent: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [refreshKey, setRefreshKey] = useState(0);

    const handleAddressSelect = (address: string, username: string) => {
        navigate('/', { state: { selectedAddress: address, selectedUsername: username } });
    };

    interface Address {
        address: string;
        status: string;
    }

    const handleAddressStatusChange = (username: string, address: string, status: 'used') => {
        console.log(`Address ${address} for ${username} changed to ${status}`);

        const storedData = localStorage.getItem('userAddresses');
        console.log(`Stored Data: ${storedData}`);

        const userAddresses: [string, Address[]][] = storedData ? JSON.parse(storedData) : [];
        console.log(`Parsed userAddresses:`, userAddresses);

        let userEntry = userAddresses.find(([name]) => name === username);
        console.log(`Found userEntry:`, userEntry);

        if (!userEntry) {
            userEntry = [username, []];
            userAddresses.push(userEntry);
            console.log(`Created new userEntry:`, userEntry);
        }

        const addresses: Address[] = userEntry[1];
        console.log(`Addresses array:`, addresses);

        const addressIndex = addresses.findIndex((addr) => {
            console.log(`Comparing: ${addr.address} === ${address}`);
            return addr.address === address;
        });
        console.log(`addressIndex: ${addressIndex}`);

        if (addressIndex !== -1) {
            addresses[addressIndex].status = status;
            console.log(`Updated address at index: ${addressIndex}`);
        } else {
            addresses.push({ address, status });
            console.log(`Added new address, index was: ${addressIndex}`);
        }

        localStorage.setItem('userAddresses', JSON.stringify(userAddresses));
        console.log(`Saved to localStorage:`, localStorage.getItem('userAddresses'));
    };

    const refreshComponents = () => {
        setRefreshKey((prev) => prev + 1);
    };

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
                                        <CallConsole
                                            key={`call-console-${refreshKey}`}
                                            onAddressStatusChange={handleAddressStatusChange}
                                            refreshComponent={refreshComponents}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <Directory
                                            key={`directory-${refreshKey}`}
                                            onSelectAddress={handleAddressSelect}
                                            onAddressStatusChange={handleAddressStatusChange}
                                        />
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
            <AuthProvider>
                <Router>
                    <AppContent />
                </Router>
            </AuthProvider>
        </CallProvider>
    );
};