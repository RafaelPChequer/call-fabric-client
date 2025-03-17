import React, { useState, useEffect } from 'react';
import { useAuth } from '../state/AuthState.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SPACE_URL = import.meta.env.VITE_SPACE_URL;
const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

interface AuthData {
  token: string;
  subscriber_id: string;
}

interface AxiosError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const SubscriberSignupSignin: React.FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [authData, setAuthData] = useState<AuthData | null>(null);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const tokenRequest = {
      reference: login,
      password: password,
    };

    try {
      const res = await axios.post(`${SPACE_URL}/api/fabric/subscribers/tokens`, tokenRequest, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(`${PROJECT_ID}:${API_TOKEN}`)}`,
        },
      });
      console.log(res);
      setAuthData({
        token: res.data.token,
        subscriber_id: res.data.subscriber_id,
      });
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      setError(axiosError.response?.data?.message || "Error sending data");
      setAuthData(null);
    }
  };

  useEffect(() => {
    if (authData) {
      signIn(authData.token, authData.subscriber_id);
      navigate('/', { replace: true });
    }
  }, [authData, signIn, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h3 className="text-2xl font-bold mb-6">Sign Up/Login</h3>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="login" className="block text-sm font-medium mb-1">
              Reference
            </label>
            <input
              type="text"
              id="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-800 text-white p-2 rounded hover:bg-green-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubscriberSignupSignin;
