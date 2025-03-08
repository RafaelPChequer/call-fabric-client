import React, { useState } from 'react';
import { SubscriberSignupSignin } from '../components/SubscriberSignupSignin.js';
import { User } from '../types/User.js';

const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;
const SPACE_URL = import.meta.env.VITE_SPACE_URL;
const OAUTH_APPLICATION_ID = import.meta.env.VITE_OAUTH_APPLICATION_ID;
const SAT_CH = import.meta.env.VITE_SAT_CH;

interface TokenResponse {
    token: string;
}

export const SubscriberPage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState(false);

    const getSubscriberToken = async (reference: string, password: string): Promise<TokenResponse> => {
        const tokenRequest = {
            reference,
            password,
            application_id: OAUTH_APPLICATION_ID,
            ch: SAT_CH,
        };

        const response = await fetch(
            `https://${SPACE_URL}/api/fabric/subscribers/tokens`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(`${PROJECT_ID}:${API_TOKEN}`)}`,
                },
                body: JSON.stringify(tokenRequest),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    };

    const getUserInfo = async (accessToken: string): Promise<User> => {
        const response = await fetch(
            process.env.REACT_APP_OAUTH_USERINFO_URI || '',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    };

    const handleSubmit = async (reference: string, password: string) => {
        setIsLoading(true);
        setError(undefined);

        try {
            const tokenData = await getSubscriberToken(reference, password);
            const userInfo = await getUserInfo(tokenData.token);

            localStorage.setItem('subscriberToken', tokenData.token);
            setUser(userInfo);

            window.location.href = '/';
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>

            {user ? (
                <div className="container mt-5">
                    <h2>Welcome, {user.display_name}</h2>
                    <p>Email: {user.email}</p>
                    <button
                        className="btn btn-danger"
                        onClick={() => {
                            localStorage.removeItem('subscriberToken');
                            setUser(null);
                        }}
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <SubscriberSignupSignin onSubmit={handleSubmit} error={error} />
            )}
        </div>
    );
};