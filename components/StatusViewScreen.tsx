import React, { useEffect, useState } from 'react';
import { Status } from '../types';
import { BackIcon } from './Icons';

interface StatusViewScreenProps {
  status: Status;
  onClose: () => void;
}

const STATUS_DURATION = 5000; // 5 seconds

const StatusViewScreen: React.FC<StatusViewScreenProps> = ({ status, onClose }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(onClose, STATUS_DURATION);
    
    const interval = setInterval(() => {
        setProgress(p => {
            const newProgress = p + (100 / (STATUS_DURATION / 100));
            if (newProgress >= 100) {
                clearInterval(interval);
                return 100;
            }
            return newProgress;
        });
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [status, onClose]);

  return (
    <div className="relative h-screen w-screen bg-black flex flex-col items-center justify-center text-white" onClick={onClose}>
        <div className="absolute top-0 left-0 right-0 p-2 z-20">
            <div className="w-full bg-gray-500 rounded-full h-1">
                <div 
                    className="bg-white h-1 rounded-full" 
                    style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
                ></div>
            </div>
            
            <div className="flex items-center mt-2">
                <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="mr-4">
                    <BackIcon />
                </button>
                <img src={status.user.avatarUrl} alt={status.user.name} className="w-10 h-10 rounded-full mr-3" />
                <div>
                    <p className="font-semibold">{status.user.name}</p>
                    <p className="text-xs text-gray-300">{status.timestamp}</p>
                </div>
            </div>
        </div>

        <div className="flex-grow flex items-center justify-center w-full p-2" onClick={(e) => e.stopPropagation()}>
            {status.mediaType === 'image' ? (
                <img src={status.mediaUrl} alt="Status" className="max-h-full max-w-full object-contain" />
            ) : (
                <video src={status.mediaUrl} autoPlay controls className="max-h-full max-w-full object-contain" />
            )}
        </div>
    </div>
  );
};

export default StatusViewScreen;