import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Call, CallClient } from '../types/User.js';

interface CallContextType {
    call: Call | null;
    setCall: (call: Call | null) => void;
    client: CallClient | null;
    setClient: (client: CallClient | null) => void;
    handleDisconnect: () => void;
}

const CallState = createContext<CallContextType | undefined>(undefined);

export const CallProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [call, setCall] = useState<Call | null>(null);
    const [client, setClient] = useState<CallClient | null>(null);

    const handleDisconnect = () => {
        setCall(null);
        setClient(null);
    };

    return (
        <CallState.Provider value={{ call, setCall, client, setClient, handleDisconnect }}>
            {children}
        </CallState.Provider>
    );
};

export const useCall = (): CallContextType => {
    const context = useContext(CallState);
    if (!context) {
        throw new Error('useCall must be used within a CallProvider');
    }
    return context;
};