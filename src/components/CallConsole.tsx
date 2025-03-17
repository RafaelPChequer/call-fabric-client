import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCall } from '../state/CallState.js';
import { useAuth } from '../state/AuthState.js';

interface CallConsoleProps {
  onAddressStatusChange?: (username: string, address: string, status: 'used') => void;
  refreshComponent?: () => void;
}

export const CallConsole: React.FC<CallConsoleProps> = ({ onAddressStatusChange, refreshComponent }) => {
  const [status, setStatus] = useState('Not Connected');
  const [roomName, setRoomName] = useState("my_video_room_" + Date.now());
  const [errorMessage, setErrorMessage] = useState("");
  const { call, setCall, handleDisconnect } = useCall();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
  const API_TOKEN = import.meta.env.VITE_API_TOKEN;
  const SPACE_URL = import.meta.env.VITE_SPACE_URL;

  if (!PROJECT_ID || !API_TOKEN || !SPACE_URL) {
    throw new Error("Environment variables VITE_PROJECT_ID, VITE_API_TOKEN or VITE_SPACE_URL are not defined.");
  }

  useEffect(() => {
    if (location.state?.selectedAddress) {
      setRoomName(location.state.selectedAddress);
    }
  }, [location.state]);

  const createRoomAndGetToken = async () => {
    if (onAddressStatusChange && user?.id) {
      console.log("Room: ", roomName);
      onAddressStatusChange(user.id, roomName, 'used');
    }

    try {
      const roomData = {
        name: roomName,
        display_name: "My Video Room",
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

      const tokenConfig = {
        method: "get",
        url: `${SPACE_URL}/api/video/conferences/${roomId}/conference_tokens`,
        auth: {
          username: PROJECT_ID,
          password: API_TOKEN,
        },
      };

      const tokenResponse = await axios(tokenConfig);
      const tokensArray = tokenResponse.data.data;

      if (!Array.isArray(tokensArray)) {
        throw new Error("The 'data' property in the tokens response is not an array.");
      }

      const guestToken = tokensArray.find((t) => t.name === "Guest")?.token;
      if (!guestToken) {
        throw new Error("Guest token not found in the response.");
      }

      setStatus('Connected');
      setErrorMessage("");
      setCall({ state: 'active', token: guestToken, roomName, userName: user?.id || "Guest" }); // Use subscriber_id
      navigate('/call');
    } catch (error) {
      console.error("Error creating room or getting token:", error);
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response
            ? `Error ${error.response.status}: ${JSON.stringify(error.response.data)}`
            : `Error: ${error.message}`
        );
      } else if (error instanceof Error) {
        setErrorMessage(`Error: ${error.message}`);
      } else {
        setErrorMessage("Unknown error");
      }
      if (refreshComponent) {
        setTimeout(() => {
          refreshComponent();
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (!call) {
      setStatus('Not Connected');
      setErrorMessage('');
      setRoomName("my_video_room_" + Date.now());
    }
  }, [call]);

  const onDisconnect = () => {
    handleDisconnect();
    setStatus('Not Connected');
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
          <label htmlFor="username" className="form-label pr-4">
            UserID:
          </label>
          <span className="form-control border border-gray-200 rounded bg-gray-100 px-2 py-1">
            {user?.id || "Guest"}
          </span>
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
      {errorMessage && (
        <p
          style={{
            color: "red",
            maxHeight: "3rem",
            overflowY: "auto",
            marginTop: "0.5rem",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {errorMessage}
        </p>
      )}
      <div className="text-center mt-3 text-gray-500">
        <small>
          Status: <span>{status}</span>
        </small>
      </div>
    </div>
  );
};

export default CallConsole;
