import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { VideoConference } from '@signalwire-community/react';
import { useCall } from '../state/CallState.js';

export const CallPage: React.FC = () => {
    const { call, handleDisconnect } = useCall();
    const navigate = useNavigate();
    const roomSessionRef = useRef<any>(null);

    const onEndCall = async () => {
        try {
            if (roomSessionRef.current) {
                await roomSessionRef.current.leave();
            }
            handleDisconnect();
            window.location.href = '/';
        } catch (error) {
            console.error('Error ending call:', error);
            handleDisconnect();
            window.location.href = '/';
        }
    };

    useEffect(() => {
        if (!call) {
            console.log("No active call, redirecting to home...");
            navigate('/');
        }

        return () => {
            if (roomSessionRef.current) {
                roomSessionRef.current.leave().catch((error: any) => {
                    console.error('Error during cleanup:', error);
                });
            }
        };
    }, [call, navigate]);

    if (!call) {
        return (
            <div className="container mx-auto py-5">
                <p>No active call</p>
                <button
                    className="px-4 bg-red-900 text-white rounded hover:bg-red-800"
                    onClick={() => navigate('/')}
                >
                    Main Menu
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-5 px-4 bg-white rounded border border-gray-300 mt-4">
            <h2 className="text-2xl font-bold mb-3">Call</h2>
            <div>
                <p>State: {call.state}</p>
                <p>Token: {call.token}</p>
                <p>UserName: {call.userName}</p>
                <div style={{ maxWidth: "800px", margin: "20px auto" }}>
                    <VideoConference
                        key={`${call.token}-${Date.now()}`}
                        token={call.token}
                        userName={call.userName}
                        onRoomReady={(roomSession) => {
                            console.log("Room session ready:", roomSession);
                            roomSessionRef.current = roomSession;
                        }}
                    />
                </div>
                <button
                    className="px-4 bg-red-900 text-white rounded"
                    onClick={onEndCall}
                >
                    End Call
                </button>
            </div>
        </div>
    );
};