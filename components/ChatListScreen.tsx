import React from 'react';
import { Chat } from '../types';

interface ChatListScreenProps {
  chats: Chat[];
  onSelectChat: (chatId: number) => void;
}

const ChatListItem: React.FC<{ chat: Chat; onSelect: () => void }> = ({ chat, onSelect }) => {
    const lastMessage = chat.messages[chat.messages.length - 1];
    const time = lastMessage ? new Date(lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
    
    return (
        <div 
            onClick={onSelect} 
            className="flex items-center p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200"
        >
            <img src={chat.user.avatarUrl} alt={chat.user.name} className="w-12 h-12 rounded-full mr-4" />
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">{chat.user.name}</h3>
                    <p className={`text-xs ${chat.unreadCount > 0 ? 'text-green-500 font-bold' : 'text-gray-500'}`}>{time}</p>
                </div>
                <div className="flex justify-between items-start">
                    <p className="text-gray-600 text-sm truncate pr-4">
                        {lastMessage?.text || 'No messages yet'}
                    </p>
                    {chat.unreadCount > 0 && (
                        <span className="bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {chat.unreadCount}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};


const ChatListScreen: React.FC<ChatListScreenProps> = ({ chats, onSelectChat }) => {
  return (
    <div className="bg-white h-full">
      {chats.map(chat => (
        <ChatListItem key={chat.id} chat={chat} onSelect={() => onSelectChat(chat.id)} />
      ))}
    </div>
  );
};

export default ChatListScreen;
