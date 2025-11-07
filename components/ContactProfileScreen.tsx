import React from 'react';
import { User } from '../types';
import { BackIcon, MoreVertIcon, NotificationsIcon, MediaIcon, LockIcon, StarIcon, BlockIcon, PhoneIcon, VideoIcon } from './Icons';

interface ContactProfileScreenProps {
  user: User;
  onBack: () => void;
}

const ProfileAction: React.FC<{ icon: React.ReactNode; text: string; subtext?: string }> = ({ icon, text, subtext }) => (
  <div className="flex items-center p-4 cursor-pointer hover:bg-gray-50">
    <div className="text-gray-500">{icon}</div>
    <div className="ml-4">
      <p className="text-gray-800">{text}</p>
      {subtext && <p className="text-sm text-gray-500">{subtext}</p>}
    </div>
  </div>
);

const ContactProfileScreen: React.FC<ContactProfileScreenProps> = ({ user, onBack }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-[#075e54] text-white flex items-center p-3 shadow-md fixed top-0 w-full z-20">
        <button onClick={onBack} className="mr-4">
          <BackIcon />
        </button>
        <h2 className="font-semibold text-lg">Contact info</h2>
        <div className="flex-grow"></div>
        <button>
          <MoreVertIcon />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto pt-16">
        <div className="bg-white pt-6 pb-4 flex flex-col items-center border-b">
          <img src={user.avatarUrl} alt={user.name} className="w-32 h-32 rounded-full mb-4" />
          <h1 className="text-2xl font-semibold text-gray-800">{user.name}</h1>
          <p className="text-gray-500">{user.phone}</p>
            <div className="flex space-x-8 mt-4">
                <div className="flex flex-col items-center text-green-600 cursor-pointer">
                    <PhoneIcon />
                    <span className="text-sm mt-1">Audio</span>
                </div>
                 <div className="flex flex-col items-center text-green-600 cursor-pointer">
                    <VideoIcon />
                    <span className="text-sm mt-1">Video</span>
                </div>
            </div>
        </div>

        <div className="bg-white mt-3 border-y">
            <ProfileAction icon={<MediaIcon />} text="Media, links, and docs" subtext="12 >" />
            <ProfileAction icon={<NotificationsIcon />} text="Mute notifications" />
            <ProfileAction icon={<StarIcon />} text="Starred messages" subtext="None" />
        </div>
        
        <div className="bg-white mt-3 p-4 border-y">
          <p className="text-green-600">About and phone number</p>
          <p className="text-gray-800 mt-2">{user.status}</p>
          <p className="text-sm text-gray-500 mt-1">Last seen</p>
        </div>

         <div className="bg-white mt-3 border-y text-red-500">
            <ProfileAction icon={<BlockIcon />} text={`Block ${user.name}`} />
            <ProfileAction icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>} text={`Report ${user.name}`} />
        </div>
        
      </main>
    </div>
  );
};

export default ContactProfileScreen;
