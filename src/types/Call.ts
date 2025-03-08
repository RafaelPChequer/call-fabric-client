import { Prettify } from '../utils/Prettify.js';

export type Call = Prettify<{
  id: string;
  state: string;
  localStream?: MediaStream;
  start: () => Promise<void>;
  hangup: () => void;
  audioMute: (options?: { memberId?: string }) => void;
  audioUnmute: (options?: { memberId?: string }) => void;
  videoMute: (options?: { memberId?: string }) => void;
  videoUnmute: (options?: { memberId?: string }) => void;
  updateMicrophone: (options: { deviceId: string }) => Promise<void>;
  updateCamera: (options: { deviceId: string }) => void;
  updateSpeaker: (options: { deviceId: string }) => Promise<void>;
  setMicrophoneVolume: (options: { volume: number }) => void;
  setSpeakerVolume: (options: { volume: number }) => void;
  setInputSensitivity: (options: { value: number }) => void;
  startScreenShare: (options: {
    audio?: boolean;
    video?: boolean;
    layout?: string;
    positions?: { self: string };
  }) => Promise<any>;
  on: (event: string, callback: (params: any) => void) => void;
}>;