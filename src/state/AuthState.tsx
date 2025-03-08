import React, { createContext, useContext, useState, useEffect } from 'react';
import { SessionUser, User } from '../types/User.js';

const loadUsersFromStorage = (): Map<string, User> => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? new Map(JSON.parse(storedUsers)) : new Map();
};

const saveUsersToStorage = (users: Map<string, User>) => {
    localStorage.setItem('users', JSON.stringify(Array.from(users.entries())));
};

const usersDb = loadUsersFromStorage();

interface AuthContextType {
    user: SessionUser | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<SessionUser | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const hashPassword = (password: string): string => {
        return btoa(password);
    };

    const login = async (email: string, password: string) => {
        const hashedPassword = hashPassword(password);
        const user = usersDb.get(email);

        console.log('Tentativa de login com:', { email, hashedPassword });
        console.log('Usuários no banco:', Array.from(usersDb.entries()));

        if (user && user.password === hashedPassword) {
            const sessionUser: SessionUser = {
                id: user.id,
                email: user.email,
                token: `token-${Math.random().toString(36).substr(2)}`,
                name: user.name,
            };
            setUser(sessionUser);
            localStorage.setItem('user', JSON.stringify(sessionUser));
            console.log('Login bem-sucedido:', sessionUser);
            return;
        }
        throw new Error('Credenciais inválidas');
    };

    const register = async (email: string, password: string, name: string) => {
        if (usersDb.has(email)) {
            throw new Error('Email already registered');
        }

        const hashedPassword = hashPassword(password);
        const userId = Math.random().toString(36).substr(2);
        const newUser: User = {
            id: userId,
            email,
            name,
            password: hashedPassword,
        };

        usersDb.set(email, newUser);
        saveUsersToStorage(usersDb);
        const sessionUser: SessionUser = {
            id: userId,
            email,
            token: `token-${Math.random().toString(36).substr(2)}`,
            name,
        };
        setUser(sessionUser);
        localStorage.setItem('user', JSON.stringify(sessionUser));
        console.log('User registered:', newUser);
        console.log('All users:', Array.from(usersDb.entries()));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        console.log('Logout realizado');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                register,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};