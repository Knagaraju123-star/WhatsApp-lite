
import React, { useState, useEffect } from 'react';
import { Chat, User, Call, Status, CallType, Message } from './types';
import { MOCK_CHATS, MOCK_USERS, MOCK_CALLS, MOCK_STATUSES, MY_USER } from './data/mockData';
import ChatListScreen from './components/ChatListScreen';
import ChatScreen from './components/ChatScreen';
import StatusScreen from './components/StatusScreen';
import CallsScreen from './components/CallsScreen';
import CallScreen from './components/CallScreen';
import ContactProfileScreen from './components/ContactProfileScreen';
import SettingsScreen from './components/SettingsScreen';
import AccountSettingsScreen from './components/AccountSettingsScreen';
import ChatSettingsScreen from './components/ChatSettingsScreen';
import LoginScreen from './components/LoginScreen';
import StatusViewScreen from './components/StatusViewScreen';
import { MoreVertIcon, CameraIcon, SearchIcon } from './components/Icons';

// FIX: Import GoogleGenAI for chatbot functionality.
import { GoogleGenAI } from "@google/genai";

type Screen = 'main' | 'chat_screen' | 'call_screen' | 'profile_screen' | 'settings' | 'account_settings' | 'chat_settings' | 'status_view';
type Tab = 'chats' | 'status' | 'calls';

// FIX: Initialize Gemini API client.
const ai = new GoogleGenAI({apiKey: process.env.API_KEY!});

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [screen, setScreen] = useState<Screen>('main');
    const [activeTab, setActiveTab] = useState<Tab>('chats');
    
    const [chats, setChats] = useState<Chat[]>(MOCK_CHATS);
    const [calls, setCalls] = useState<Call[]>(MOCK_CALLS);
    const [statuses, setStatuses] = useState<Status[]>(MOCK_STATUSES);
    const [myStatuses, setMyStatuses] = useState<Status[]>([]);

    const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [callInfo, setCallInfo] = useState<{user: User; type: CallType} | null>(null);
    const [viewingStatus, setViewingStatus] = useState<Status | null>(null);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        const loggedInStatus = localStorage.getItem('isLoggedIn');
        if (loggedInStatus === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    const selectedChat = chats.find(c => c.id === selectedChatId) || null;

    const handleLogin = () => {
        localStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);
    };

    const handleSelectChat = (chatId: number) => {
        setSelectedChatId(chatId);
        setScreen('chat_screen');
    };
    
    const handleSendMessage = async (chatId: number, text: string, mediaUrl?: string) => {
        const newMessage: Message = {
            id: Date.now(),
            text,
            timestamp: new Date(),
            senderId: MY_USER.id,
            isRead: true,
            mediaUrl,
        };

        const updatedChats = chats.map(c => 
            c.id === chatId ? { ...c, messages: [...c.messages, newMessage] } : c
        );
        setChats(updatedChats);
        
        const currentChat = chats.find(c => c.id === chatId);
        if (!currentChat || currentChat.user.name === 'Project Group') return;

        setIsTyping(true);
        
        try {
            // FIX: Use Gemini API to generate a content-aware reply.
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: text,
            });

            const botReplyText = response.text;
            
            const botMessage: Message = {
                id: Date.now() + 1,
                text: botReplyText,
                timestamp: new Date(),
                senderId: currentChat.user.id,
                isRead: false,
            };

            setChats(prevChats => prevChats.map(c => 
                c.id === chatId 
                ? { ...c, messages: [...c.messages, botMessage], unreadCount: 0 } 
                : c
            ));
        } catch (error) {
            console.error("Error fetching AI response: ", error);
             const errorMessage: Message = {
                id: Date.now() + 1,
                text: "Sorry, I'm having trouble connecting. Please try again later.",
                timestamp: new Date(),
                senderId: currentChat.user.id,
                isRead: false,
            };
            setChats(prevChats => prevChats.map(c => 
                c.id === chatId ? { ...c, messages: [...c.messages, errorMessage] } : c
            ));
        } finally {
            setIsTyping(false);
        }
    };

    const handleStartCall = (user: User, type: CallType) => {
        setCallInfo({ user, type });
    };
    
    const handleEndCall = () => {
        if(callInfo) {
            const newCall: Call = {
                id: Date.now(),
                user: callInfo.user,
                type: callInfo.type,
                direction: 'outgoing',
                timestamp: new Date(),
            };
            setCalls(prev => [newCall, ...prev]);
        }
        setCallInfo(null);
    };

    const handleViewProfile = (user: User) => {
        setSelectedUser(user);
        setScreen('profile_screen');
    };
    
    const handleUpdateStatus = (mediaUrl: string, mediaType: 'image' | 'video') => {
        const newStatus: Status = {
            id: Date.now(),
            user: MY_USER,
            mediaUrl,
            mediaType,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            viewed: false,
        }
        setMyStatuses(prev => [newStatus, ...prev]);
        setActiveTab('status');
    };

    const handleViewStatus = (statusToView: Status) => {
        const isMyStatus = myStatuses.some(s => s.id === statusToView.id);
        if (!isMyStatus) {
            const updatedStatuses = statuses.map(s =>
                s.id === statusToView.id ? { ...s, viewed: true } : s
            );
            setStatuses(updatedStatuses);
        }
        setViewingStatus(statusToView);
        setScreen('status_view');
    };

    const handleBack = () => {
        if (screen === 'chat_screen' || screen === 'profile_screen' || screen === 'settings' || screen === 'status_view') {
            setScreen('main');
            setSelectedChatId(null);
            setSelectedUser(null);
            setViewingStatus(null);
        } else if (screen === 'account_settings' || screen === 'chat_settings') {
            setScreen('settings');
        }
    };

    const renderMainScreen = () => (
        <div className="w-full max-w-md h-screen mx-auto bg-white flex flex-col shadow-2xl">
            <header className="bg-[#075e54] text-white pt-4 shadow-md">
                <div className="flex justify-between items-center px-4 pb-3">
                    <h1 className="text-xl font-semibold">WhatsApp</h1>
                    <div className="flex items-center space-x-4">
                        <SearchIcon />
                        <button onClick={() => setScreen('settings')}><MoreVertIcon /></button>
                    </div>
                </div>
                <div className="flex justify-around bg-[#075e54]">
                    <button className="p-3 w-10 flex-shrink-0"><CameraIcon /></button>
                    {['chats', 'status', 'calls'].map((tab) => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab as Tab)}
                            className={`flex-grow p-3 text-sm font-bold uppercase tracking-wider ${activeTab === tab ? 'border-b-4 border-white text-white' : 'text-gray-300'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </header>
            <main className="flex-1 overflow-y-auto">
                {activeTab === 'chats' && <ChatListScreen chats={chats} onSelectChat={handleSelectChat} />}
                {activeTab === 'status' && <StatusScreen myStatuses={myStatuses} contactStatuses={statuses} onUpdateStatus={handleUpdateStatus} onViewStatus={handleViewStatus} />}
                {activeTab === 'calls' && <CallsScreen calls={calls} users={MOCK_USERS} onStartCall={handleStartCall} />}
            </main>
        </div>
    );

    if (!isLoggedIn) {
        return <LoginScreen onLogin={handleLogin} />;
    }

    if (callInfo) {
        return <CallScreen user={callInfo.user} callType={callInfo.type} onEndCall={handleEndCall} />;
    }

    // FIX: Changed type from `JSX.Element | null` to `React.ReactNode` to fix "Cannot find namespace 'JSX'" error.
    const screenMap: Record<Screen, React.ReactNode> = {
        'main': renderMainScreen(),
        'chat_screen': selectedChat ? <ChatScreen chat={selectedChat} isTyping={isTyping} onBack={handleBack} onSendMessage={handleSendMessage} onStartCall={handleStartCall} onViewProfile={handleViewProfile} /> : null,
        'profile_screen': selectedUser ? <ContactProfileScreen user={selectedUser} onBack={handleBack} /> : null,
        'settings': <SettingsScreen onBack={handleBack} user={MY_USER} onNavigate={(s) => setScreen(s as Screen)} />,
        'account_settings': <AccountSettingsScreen onBack={handleBack} />,
        'chat_settings': <ChatSettingsScreen onBack={handleBack} />,
        'status_view': viewingStatus ? <StatusViewScreen status={viewingStatus} onClose={handleBack} /> : null,
        'call_screen': null, // handled separately
    };

    return screenMap[screen] || renderMainScreen();
};

export default App;
