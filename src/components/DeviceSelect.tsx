// import React, { useEffect, useState } from 'react';
// import { useCall } from '../state/CallState.js';
// import { ListItem } from './ListItem.js';
//
// export const DeviceSelect: React.FC = () => {
//   const { call } = useCall();
//   const [mics, setMics] = useState<MediaDeviceInfo[]>([]);
//   const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
//   const [speakers, setSpeakers] = useState<MediaDeviceInfo[]>([]);
//   const [selectedMic, setSelectedMic] = useState<string>('');
//   const [selectedCamera, setSelectedCamera] = useState<string>('');
//   const [selectedSpeaker, setSelectedSpeaker] = useState<string>('');
//
//   useEffect(() => {
//     const fetchDevices = async () => {
//       try {
//         await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
//         const devices = await navigator.mediaDevices.enumerateDevices();
//
//         setMics(devices.filter((device) => device.kind === 'audioinput'));
//         setCameras(devices.filter((device) => device.kind === 'videoinput'));
//         setSpeakers(devices.filter((device) => device.kind === 'audiooutput'));
//       } catch (error) {
//         console.error('Erro ao listar dispositivos:', error);
//       }
//     };
//     fetchDevices();
//   }, []);
//
//   const handleMicChange = (deviceId: string) => {
//     setSelectedMic(deviceId);
//     if (call?.updateMicrophone) {
//       call.updateMicrophone({ deviceId });
//     }
//   };
//
//   const handleCameraChange = (deviceId: string) => {
//     setSelectedCamera(deviceId);
//     if (call?.updateCamera) {
//       call.updateCamera({ deviceId });
//     }
//   };
//
//   const handleSpeakerChange = (deviceId: string) => {
//     setSelectedSpeaker(deviceId);
//     if (call?.updateSpeaker) {
//       call.updateSpeaker({ deviceId });
//     }
//   };
//
//   return (
//       <div className="flex flex-col gap-4 bg-white rounded p-4 border border-gray-300">
//         <div>
//           <label className="form-label text-xl font-bold block mb-2">Microphone</label>
//           <ul className="list-group rounded border border-gray-300">
//             {mics.length > 0 ? (
//                 mics.map((mic) => (
//                     <ListItem
//                         key={mic.deviceId}
//                         onClick={() => handleMicChange(mic.deviceId)}
//                         isSelected={selectedMic === mic.deviceId}
//                     >
//                       {mic.label || `Microphone ${mic.deviceId}`}
//                     </ListItem>
//                 ))
//             ) : (
//                 <ListItem disabled>No microphones available</ListItem>
//             )}
//           </ul>
//         </div>
//         <hr className="border-0 h-0.5 bg-gray-300 rounded"/>
//         <div>
//           <label className="form-label text-xl font-bold block mb-2">Camera</label>
//           <ul className="list-group rounded border border-gray-300">
//             {cameras.length > 0 ? (
//                 cameras.map((cam) => (
//                     <ListItem
//                         key={cam.deviceId}
//                         onClick={() => handleCameraChange(cam.deviceId)}
//                         isSelected={selectedCamera === cam.deviceId}
//                     >
//                       {cam.label || `Camera ${cam.deviceId}`}
//                     </ListItem>
//                 ))
//             ) : (
//                 <ListItem disabled>No cameras available</ListItem>
//             )}
//           </ul>
//         </div>
//         <hr className="border-0 h-0.5 bg-gray-300 rounded" />
//         <div>
//           <label className="form-label text-xl font-bold block mb-2">Speaker</label>
//           <ul className="list-group rounded border border-gray-300">
//             {speakers.length > 0 ? (
//                 speakers.map((spk) => (
//                     <ListItem
//                         key={spk.deviceId}
//                         onClick={() => handleSpeakerChange(spk.deviceId)}
//                         isSelected={selectedSpeaker === spk.deviceId}
//                     >
//                       {spk.label || `Speaker ${spk.deviceId}`}
//                     </ListItem>
//                 ))
//             ) : (
//                 <ListItem disabled>No speakers available</ListItem>
//             )}
//           </ul>
//         </div>
//       </div>
//   );
// };