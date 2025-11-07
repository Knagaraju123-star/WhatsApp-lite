
// FIX: Provide full type definitions for the application.
export type CallType = 'audio' | 'video';
export type CallDirection = 'incoming' | 'outgoing' | 'missed';
export type MediaType = 'image' | 'video';

export interface User {
  id: number;
  name: string;
  avatarUrl: string;
  status: string;
  phone: string;
}

export interface Message {
  id: number;
  text: string;
  timestamp: Date;
  senderId: number;
  isRead: boolean;
  mediaUrl?: string;
}

export interface Chat {
  id: number;
  user: User;
  messages: Message[];
  unreadCount: number;
}

export interface Call {
  id: number;
  user: User;
  type: CallType;
  direction: CallDirection;
  timestamp: Date;
}

export interface Status {
  id: number;
  user: User;
  timestamp: string;
  mediaUrl: string;
  mediaType: MediaType;
  viewed: boolean;
}
