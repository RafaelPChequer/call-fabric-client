import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCall } from '../state/CallState.js';

export const CallConsole: React.FC = () => {
    const [status, setStatus] = useState('Not Connected');
    const [token, setToken] = useState<string | null>(null);
    const [roomName, setRoomName] = useState("my_video_room_" + Date.now());
    const [userName, setUserName] = useState("João");
    const [errorMessage, setErrorMessage] = useState("");
    const { call, setCall, handleDisconnect } = useCall();
    const navigate = useNavigate();

    const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
    const API_TOKEN = import.meta.env.VITE_API_TOKEN;
    const SPACE_URL = import.meta.env.VITE_SPACE_URL;

    if (!PROJECT_ID || !API_TOKEN || !SPACE_URL) {
        throw new Error("Variáveis de ambiente REACT_APP_PROJECT_ID, REACT_APP_API_TOKEN ou REACT_APP_SPACE_URL não estão definidas.");
    }

    const createRoomAndGetToken = async () => {
        try {
            const roomData = {
                name: roomName,
                display_name: "Minha Sala de Vídeo",
                size: "medium",
                quality: "1080p",
                layout: "grid-responsive",
                enable_room_previews: true,
                enable_chat: true,
            };

            const roomConfig = {
                method: "post",
                url: `${SPACE_URL}/api/video/conferences`,
                auth: {
                    username: PROJECT_ID,
                    password: API_TOKEN,
                },
                data: roomData,
            };

            const roomResponse = await axios(roomConfig);
            const roomId = roomResponse.data.id;
            console.log("Sala criada com ID:", roomId);

            console.log("Obtendo token de convidado...");
            const tokenConfig = {
                method: "get",
                url: `${SPACE_URL}/api/video/conferences/${roomId}/conference_tokens`,
                auth: {
                    username: PROJECT_ID,
                    password: API_TOKEN,
                },
            };
            console.log("tokenConfig", tokenConfig);

            const tokenResponse = await axios(tokenConfig);
            console.log("tokenResponse", tokenResponse);
            const tokensArray = tokenResponse.data.data;
            console.log("tokensArray", tokensArray);

            if (!Array.isArray(tokensArray)) {
                throw new Error("A propriedade 'data' na resposta dos tokens não é um array.");
            }

            const guestToken = tokensArray.find((t) => t.name === "Guest")?.token;
            console.log("guestToken", guestToken);
            if (!guestToken) {
                throw new Error("Token de convidado não encontrado na resposta.");
            }

            setToken(guestToken);
            setStatus('Connected');
            setErrorMessage("");
            setCall({ state: 'active', token: guestToken, roomName, userName });
            console.log("CallPage is null, resetting state...");
            navigate('/call');
        } catch (error: unknown) {
            console.error("Erro ao criar sala ou obter token:", error);
            if (axios.isAxiosError(error)) {
                setErrorMessage(
                    error.response
                        ? `Erro ${error.response.status}: ${JSON.stringify(error.response.data)}`
                        : `Erro: ${error.message}`
                );
            } else if (error instanceof Error) {
                setErrorMessage(`Erro: ${error.message}`);
            } else {
                setErrorMessage("Erro desconhecido");
            }
        }
    };

    useEffect(() => {
        if (!call) {
            console.log("CallPage is null, resetting state...");
            setStatus('Not Connected');
            setToken(null);
            setErrorMessage('');
            setRoomName("my_video_room_" + Date.now());
        }
    }, [call]);

    const onDisconnect = () => {
        handleDisconnect();
        setStatus('Not Connected');
        setToken(null);
        setErrorMessage('');
        setRoomName("my_video_room_" + Date.now());
        navigate('/');
    };

    return (
        <div className="card p-4 bg-white rounded border border-gray-300">
            <h1 className="font-bold text-xl pb-4">Connect</h1>
            <div className="mb-3">
                <div className="block py-4">
                    <label htmlFor="destination" className="form-label pr-4">
                        Address:
                    </label>
                    <input
                        type="text"
                        className="form-control border border-gray-200 rounded"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                    />
                </div>
                <div className="block py-4">
                    <label htmlFor="destination" className="form-label pr-4">
                        Username:
                    </label>
                    <input
                        type="text"
                        className="form-control border border-gray-200 rounded"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex gap-2">
                {status === 'Connected' ? (
                    <button
                        className="bg-red-800 text-white rounded w-full"
                        onClick={onDisconnect}
                    >
                        Disconnect
                    </button>
                ) : (
                    <button
                        className="bg-green-800 text-white rounded w-full"
                        onClick={createRoomAndGetToken}
                    >
                        Dial
                    </button>
                )}
            </div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <div className="text-center mt-3 text-gray-500">
                <small>
                    Status: <span>{status}</span>
                </small>
            </div>
        </div>
    );
};