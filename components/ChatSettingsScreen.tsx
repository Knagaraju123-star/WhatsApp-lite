
import React from 'react';
import { BackIcon, ThemeIcon, WallpaperIcon, ChatHistoryIcon } from './Icons';

interface ChatSettingsScreenProps {
  onBack: () => void;
}

const ChatSettingItem: React.FC<{ icon: React.ReactNode; title: string; subtitle?: string; }> = ({ icon, title, subtitle }) => (
    <div className="flex items-center p-4 hover:bg-gray-50 cursor-pointer w-full">
        <div className="text-gray-500">{icon}</div>
        <div className="ml-4 flex-1">
            <p className="text-base text-gray-800">{title}</p>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
    </div>
);

const ChatSettingsScreen: React.FC<ChatSettingsScreenProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-[#075e54] text-white flex items-center p-3 shadow-md fixed top-0 w-full z-20">
        <button onClick={onBack} className="mr-4">
          <BackIcon />
        </button>
        <h2 className="font-semibold text-lg">Chats</h2>
      </header>

      <main className="flex-1 overflow-y-auto pt-16">
        <div className="bg-white border-y">
           <div className="p-4 border-b">
                <h3 className="font-semibold text-green-600 text-sm">Display</h3>
           </div>
           <ChatSettingItem 
                icon={<ThemeIcon />}
                title="Theme"
                subtitle="System default"
           />
           <ChatSettingItem 
                icon={<WallpaperIcon />}
                title="Wallpaper"
           />
        </div>
        <div className="bg-white border-y mt-4">
           <div className="p-4 border-b">
                <h3 className="font-semibold text-green-600 text-sm">Chat settings</h3>
           </div>
           <ChatSettingItem 
                icon={<ChatHistoryIcon />}
                title="Chat history"
           />
        </div>
      </main>
    </div>
  );
};

export default ChatSettingsScreen;
