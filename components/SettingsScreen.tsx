import React from 'react';
import { User } from '../types';
import { BackIcon, QRIcon, LockIcon, ChatIcon, NotificationsIcon, HelpIcon, StarIcon } from './Icons';

interface SettingsScreenProps {
  user: User;
  onBack: () => void;
  onNavigate: (screen: 'account_settings' | 'chat_settings') => void;
}

const SettingItem: React.FC<{ icon: React.ReactNode; title: string; subtitle: string; onClick?: () => void; }> = ({ icon, title, subtitle, onClick }) => (
    <div className="flex items-center p-4 hover:bg-gray-50 cursor-pointer w-full" onClick={onClick}>
        <div className="text-gray-500">{icon}</div>
        <div className="ml-4 flex-1">
            <p className="text-base text-gray-800">{title}</p>
            <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
    </div>
);


const SettingsScreen: React.FC<SettingsScreenProps> = ({ user, onBack, onNavigate }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-[#075e54] text-white flex items-center p-3 shadow-md fixed top-0 w-full z-20">
        <button onClick={onBack} className="mr-4">
          <BackIcon />
        </button>
        <h2 className="font-semibold text-lg">Settings</h2>
      </header>

      <main className="flex-1 overflow-y-auto pt-16">
        <div className="bg-white p-4 flex items-center border-b cursor-pointer">
            <img src={user.avatarUrl} alt={user.name} className="w-16 h-16 rounded-full" />
            <div className="ml-4 flex-1">
                <p className="text-lg font-semibold">{user.name}</p>
                <p className="text-gray-500">{user.status}</p>
            </div>
            <div className="text-green-600">
                <QRIcon />
            </div>
        </div>
        <div className="bg-white border-y mt-2">
           <SettingItem 
                icon={<LockIcon />}
                title="Account"
                subtitle="Privacy, security, change number"
                onClick={() => onNavigate('account_settings')}
           />
           <SettingItem 
                icon={<ChatIcon />}
                title="Chats"
                subtitle="Theme, wallpapers, chat history"
                onClick={() => onNavigate('chat_settings')}
           />
            <SettingItem 
                icon={<NotificationsIcon />}
                title="Notifications"
                subtitle="Message, group & call tones"
           />
            <SettingItem 
                icon={<StarIcon />}
                title="Starred messages"
                subtitle=""
           />
            <SettingItem 
                icon={<HelpIcon />}
                title="Help"
                subtitle="Help centre, contact us, privacy policy"
           />
        </div>
      </main>
    </div>
  );
};

export default SettingsScreen;
