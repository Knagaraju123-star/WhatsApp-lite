
import React from 'react';
import { Call, User, CallType } from '../types';
import { PhoneIcon, VideoIcon } from './Icons';

interface CallsScreenProps {
  calls: Call[];
  users: User[]; // to show call options for all users
  onStartCall: (user: User, type: CallType) => void;
}

const CallItem: React.FC<{ call: Call }> = ({ call }) => {
    const isMissed = call.direction === 'missed';
    const directionIcon = call.direction === 'outgoing' ? '↗' : '↙';

    return (
        <div className="flex items-center p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200">
            <img src={call.user.avatarUrl} alt={call.user.name} className="w-12 h-12 rounded-full mr-4" />
            <div className="flex-1">
                <h3 className={`font-semibold ${isMissed ? 'text-red-500' : 'text-gray-800'}`}>
                    {call.user.name}
                </h3>
                <p className="text-sm text-gray-500 flex items-center">
                    <span className={`mr-1 ${isMissed ? 'text-red-500' : 'text-green-500'}`}>{directionIcon}</span>
                    {call.timestamp.toLocaleString()}
                </p>
            </div>
            <button className="text-green-600">
                {call.type === 'video' ? <VideoIcon /> : <PhoneIcon />}
            </button>
        </div>
    );
};

const CallsScreen: React.FC<CallsScreenProps> = ({ calls, onStartCall }) => {
  return (
    <div className="bg-white h-full">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-700">Call History</h2>
      </div>
      {calls.map(call => (
        <CallItem key={call.id} call={call} />
      ))}
    </div>
  );
};

export default CallsScreen;
