import React, { FormEvent, useState } from 'react';

interface SubscriberSignupSigninProps {
    onSubmit: (reference: string, password: string) => Promise<void>;
    error?: string;
}

export const SubscriberSignupSignin: React.FC<SubscriberSignupSigninProps> = ({ onSubmit, error }) => {
    const [reference, setReference] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await onSubmit(reference, password);
        } catch (err) {
            console.error('Submission error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mt-5 bg-white rounded border border-gray-300 p-4">
            <h2 className="text-xl font-bold mb-4">Subscriber Signin/Signup</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="reference" className="form-label">Reference:</label>
                    <input
                        type="text"
                        className="form-control border border-gray-300 rounded ml-4"
                        id="reference"
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                        disabled={isLoading}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input
                        type="password"
                        className="form-control border border-gray-300 rounded ml-4"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-green-800 rounded px-2 text-white w-1/4"
                    disabled={isLoading}
                >
                    {isLoading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};