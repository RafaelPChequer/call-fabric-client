import React, { useState } from 'react';
import { useCall } from '../state/CallState.js';
import { ButtonGroup } from './ButtonGroup.js';

export const Controls: React.FC = () => {
    const { call } = useCall();
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState(false);

    const toggleAudio = () => {
        if (isMuted) {
            call?.audioUnmute();
            setIsMuted(false);
        } else {
            call?.audioMute();
            setIsMuted(true);
        }
    };

    const toggleVideo = () => {
        if (isVideoMuted) {
            call?.videoUnmute();
            setIsVideoMuted(false);
        } else {
            call?.videoMute();
            setIsVideoMuted(true);
        }
    };

    const controlButtons = [
        {
            label: isMuted ? 'Unmute' : 'Mute',
            onClick: toggleAudio,
            className: 'bg-gray-400 rounded text-white px-2 my-4'
        },
        {
            label: isVideoMuted ? 'Video Unblock' : 'Video Block',
            onClick: toggleVideo,
            className: 'bg-gray-400 rounded text-white px-2 my-4'
        }
    ];

    return (
        <div className="card p-4 bg-white rounded my-6 border border-gray-300">
            <h1 className="font-bold text-xl">Controls</h1>
            <ButtonGroup buttons={controlButtons} />
        </div>
    );
};