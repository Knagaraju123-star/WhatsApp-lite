
import React, { useState, useRef, useEffect } from 'react';
import { Chat, Message, User, CallType } from '../types';
import { BackIcon, PhoneIcon, VideoIcon, MoreVertIcon, AttachIcon, SendIcon } from './Icons';

interface ChatScreenProps {
  chat: Chat;
  isTyping: boolean;
  onBack: () => void;
  onSendMessage: (chatId: number, text: string, mediaUrl?: string) => void;
  onStartCall: (user: User, type: CallType) => void;
  onViewProfile: (user: User) => void;
}

const MessageBubble: React.FC<{ message: Message, isOwnMessage: boolean }> = ({ message, isOwnMessage }) => {
  const bubbleClasses = isOwnMessage
    ? 'bg-[#dcf8c6] self-end'
    : 'bg-white self-start';
  const timeClass = "text-right text-xs text-gray-500 mt-1";

  return (
    <div className={`max-w-xs md:max-w-md p-2 rounded-lg my-1 shadow-sm ${bubbleClasses}`}>
        {message.mediaUrl && <img src={message.mediaUrl} alt="media" className="rounded-md mb-2 max-w-full h-auto" />}
        <p className="text-sm text-gray-800 break-words">{message.text}</p>
        <div className={timeClass}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
    </div>
  );
};

const ChatScreen: React.FC<ChatScreenProps> = ({ chat, isTyping, onBack, onSendMessage, onStartCall, onViewProfile }) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages, isTyping]);
  
  const handleSend = () => {
    if (inputText.trim()) {
      onSendMessage(chat.id, inputText.trim());
      setInputText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onSendMessage(chat.id, "Image", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#ECE5DD] bg-[url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')]">
      <header className="bg-[#075e54] text-white flex items-center p-3 shadow-md fixed top-0 w-full z-20">
        <button onClick={onBack} className="mr-2">
          <BackIcon />
        </button>
        <button onClick={() => onViewProfile(chat.user)} className="flex items-center flex-1">
            <img src={chat.user.avatarUrl} alt={chat.user.name} className="w-10 h-10 rounded-full mr-3" />
            <div className="flex-1 text-left">
              <h2 className="font-semibold">{chat.user.name}</h2>
              <p className="text-xs text-gray-300">{isTyping ? 'typing...' : chat.user.status}</p>
            </div>
        </button>
        <div className="flex items-center space-x-4">
          <button onClick={() => onStartCall(chat.user, 'video')}><VideoIcon /></button>
          <button onClick={() => onStartCall(chat.user, 'audio')}><PhoneIcon /></button>
          <button><MoreVertIcon /></button>
        </div>
      </header>
      
      <main className="flex-1 overflow-y-auto p-3 pt-20 pb-20">
        <div className="flex flex-col space-y-2">
          {chat.messages.map(msg => (
            <MessageBubble key={msg.id} message={msg} isOwnMessage={msg.senderId === 0} />
          ))}
           {isTyping && (
             <div className="bg-white self-start p-2 rounded-lg my-1 shadow-sm">
                <p className="text-sm text-gray-500 italic">typing...</p>
             </div>
           )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="bg-transparent p-2 fixed bottom-0 w-full flex items-center space-x-2">
        <div className="flex-1 flex items-center bg-white rounded-full p-2">
            <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message"
            className="w-full bg-transparent focus:outline-none ml-2"
            />
            <label htmlFor="file-input" className="cursor-pointer">
              <AttachIcon />
            </label>
            <input id="file-input" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        </div>
        <button
            onClick={handleSend}
            className="bg-[#075e54] w-12 h-12 rounded-full flex items-center justify-center text-white"
        >
          <SendIcon />
        </button>
      </footer>
    </div>
  );
};

export default ChatScreen;
