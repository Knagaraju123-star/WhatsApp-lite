
import React, { useState, useEffect } from 'react';
import { User, CallType } from '../types';
import { EndCallIcon, SpeakerIcon, MuteIcon, VideoIcon, PhoneIcon } from './Icons';

interface CallScreenProps {
  user: User;
  callType: CallType;
  onEndCall: () => void;
}

const CallScreen: React.FC<CallScreenProps> = ({ user, callType, onEndCall }) => {
  const [callStatus, setCallStatus] = useState('Ringing...');
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(callType === 'video');

  useEffect(() => {
    const timer = setTimeout(() => {
      setCallStatus('00:12'); // Simulate call connection and timer
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  
  const videoBackgroundStyle = {
      backgroundImage: `url(${user.avatarUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
  };

  return (
    <div className="relative h-screen w-screen bg-gray-800 text-white flex flex-col" style={callType === 'video' ? videoBackgroundStyle : {}}>
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center flex-grow pt-20 text-center">
            <img src={user.avatarUrl} alt={user.name} className="w-32 h-32 rounded-full border-4 border-white shadow-lg mb-4" />
            <h1 className="text-4xl font-bold">{user.name}</h1>
            <p className="text-lg mt-2">{callStatus}</p>
        </div>
        
        {callType === 'video' && (
            <div className="absolute bottom-32 right-4 w-28 h-40 bg-gray-700 rounded-lg overflow-hidden border-2 border-gray-500">
                <img src="https://picsum.photos/seed/me/200" alt="My view" className="w-full h-full object-cover" />
            </div>
        )}

        <div className="relative z-10 bg-black bg-opacity-30 p-6">
            <div className="flex justify-around items-center">
                <button 
                    onClick={() => setIsSpeaker(!isSpeaker)} 
                    className="flex flex-col items-center space-y-2 text-white p-3 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30"
                >
                    <SpeakerIcon active={isSpeaker} />
                </button>
                {callType === 'video' && (
                    <button className="flex flex-col items-center space-y-2 text-white p-3 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30">
                        <VideoIcon />
                    </button>
                )}
                <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className="flex flex-col items-center space-y-2 text-white p-3 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30"
                >
                    <MuteIcon active={isMuted} />
                </button>
                <button 
                    onClick={onEndCall} 
                    className="p-4 bg-red-600 rounded-full shadow-lg transform hover:scale-110 transition-transform"
                >
                    <EndCallIcon />
                </button>
            </div>
        </div>
    </div>
  );
};

export default CallScreen;
