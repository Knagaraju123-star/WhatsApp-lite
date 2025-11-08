import React, { useRef } from 'react';
import { Status } from '../types';
import { MY_USER } from '../data/mockData';
import { CameraIcon } from './Icons';

interface StatusScreenProps {
    myStatuses: Status[];
    contactStatuses: Status[];
    onUpdateStatus: (mediaUrl: string, mediaType: 'image' | 'video') => void;
    onViewStatus: (status: Status) => void;
}

const StatusScreen: React.FC<StatusScreenProps> = ({ myStatuses, contactStatuses, onUpdateStatus, onViewStatus }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const mediaType = file.type.startsWith('image/') ? 'image' : 'video';
        onUpdateStatus(reader.result as string, mediaType);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleViewMyStatus = () => {
    if (myStatuses.length > 0) {
      onViewStatus(myStatuses[0]);
    } else {
      handleCameraClick();
    }
  };

  const recentUpdates = contactStatuses.filter(s => !s.viewed);
  const viewedUpdates = contactStatuses.filter(s => s.viewed);

  return (
    <div className="bg-white h-full overflow-y-auto pb-32">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*,video/*"
        onChange={handleFileChange}
      />

      <div className="p-4 flex items-center border-b cursor-pointer" onClick={handleViewMyStatus}>
        <div className="relative">
          <div className={`p-1 rounded-full ${myStatuses.length > 0 ? 'border-2 border-green-500' : ''}`}>
            <img src={MY_USER.avatarUrl} alt="My status" className="w-12 h-12 rounded-full" />
          </div>
          {myStatuses.length === 0 && (
            <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1 border-2 border-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
              </svg>
            </div>
          )}
        </div>
        <div className="ml-4">
          <p className="font-semibold">My status</p>
          <p className="text-sm text-gray-500">
            {myStatuses.length > 0 ? `Today, ${myStatuses[0].timestamp}` : 'Tap to add status update'}
          </p>
        </div>
      </div>

      {recentUpdates.length > 0 && (
        <>
          <div className="p-3 bg-gray-100 text-sm font-semibold text-gray-600">
            Recent updates
          </div>
          {recentUpdates.map((update) => (
            <div key={update.id} className="p-4 flex items-center border-b cursor-pointer" onClick={() => onViewStatus(update)}>
              <div className="relative p-1 border-2 border-green-500 rounded-full">
                <img src={update.user.avatarUrl} alt={update.user.name} className="w-12 h-12 rounded-full" />
              </div>
              <div className="ml-4">
                <p className="font-semibold">{update.user.name}</p>
                <p className="text-sm text-gray-500">{update.timestamp}</p>
              </div>
            </div>
          ))}
        </>
      )}

      {viewedUpdates.length > 0 && (
        <>
          <div className="p-3 bg-gray-100 text-sm font-semibold text-gray-600">
            Viewed updates
          </div>
          {viewedUpdates.map((update) => (
            <div key={update.id} className="p-4 flex items-center border-b cursor-pointer" onClick={() => onViewStatus(update)}>
              <div className="relative p-1 border-2 border-gray-400 rounded-full">
                <img src={update.user.avatarUrl} alt={update.user.name} className="w-12 h-12 rounded-full" />
              </div>
              <div className="ml-4">
                <p className="font-semibold">{update.user.name}</p>
                <p className="text-sm text-gray-500">{update.timestamp}</p>
              </div>
            </div>
          ))}
        </>
      )}

      <div className="absolute bottom-24 right-4 flex flex-col items-center space-y-4">
        <button className="bg-gray-200 text-gray-700 p-3 rounded-full shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
        <button onClick={handleCameraClick} className="bg-[#25d366] text-white p-4 rounded-full shadow-lg">
          <CameraIcon />
        </button>
      </div>
    </div>
  );
};

export default StatusScreen;