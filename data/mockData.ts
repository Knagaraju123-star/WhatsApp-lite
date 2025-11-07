import { User, Chat, Message, Call, Status } from '../types';

export const MY_USER: User = {
    id: 0,
    name: 'You',
    avatarUrl: 'https://picsum.photos/seed/me/200',
    status: 'Online',
    phone: '+1 234-567-8900'
};

export const MOCK_USERS: User[] = [
  { id: 1, name: 'Alice', avatarUrl: 'https://picsum.photos/seed/alice/200', status: 'Online', phone: '+1 111-222-3333' },
  { id: 2, name: 'Bob', avatarUrl: 'https://picsum.photos/seed/bob/200', status: 'Last seen yesterday at 10:30 PM', phone: '+1 444-555-6666' },
  { id: 3, name: 'Charlie', avatarUrl: 'https://picsum.photos/seed/charlie/200', status: 'Typing...', phone: '+1 777-888-9999' },
  { id: 4, name: 'Diana', avatarUrl: 'https://picsum.photos/seed/diana/200', status: 'Last seen 2 hours ago', phone: '+1 123-456-7890' },
  { id: 5, name: 'Project Group', avatarUrl: 'https://picsum.photos/seed/group/200', status: 'Alice, Bob, You', phone: '' },
];

const now = new Date();

export const MOCK_CHATS: Chat[] = [
  {
    id: 1,
    user: MOCK_USERS[0],
    messages: [
      { id: 1, text: 'Hey there! How are you?', timestamp: new Date(now.getTime() - 1000 * 60 * 5), senderId: 1, isRead: true },
      { id: 2, text: 'I am good, thanks! How about you?', timestamp: new Date(now.getTime() - 1000 * 60 * 4), senderId: 0, isRead: true },
    ],
    unreadCount: 0,
  },
  {
    id: 2,
    user: MOCK_USERS[1],
    messages: [
      { id: 3, text: 'Are we still on for tomorrow?', timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 2), senderId: 2, isRead: false },
    ],
    unreadCount: 1,
  },
  {
    id: 3,
    user: MOCK_USERS[4],
    messages: [
      { id: 4, text: 'Alice: Remember to push the latest changes.', timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 5), senderId: 1, isRead: true },
      { id: 5, text: 'Sure thing!', timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 4), senderId: 0, isRead: true },
    ],
    unreadCount: 0,
  },
   {
    id: 4,
    user: MOCK_USERS[3],
    messages: [
      { id: 6, text: 'Check out this cool photo!', timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 24), senderId: 4, isRead: true, mediaUrl: 'https://picsum.photos/seed/food/400/300'},
      { id: 7, text: 'Wow, looks delicious!', timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 23), senderId: 0, isRead: true },
    ],
    unreadCount: 0,
  },
];

export const MOCK_CALLS: Call[] = [
    { id: 1, user: MOCK_USERS[2], type: 'video', direction: 'missed', timestamp: new Date(now.getTime() - 1000 * 60 * 20) },
    { id: 2, user: MOCK_USERS[0], type: 'audio', direction: 'outgoing', timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 3) },
    { id: 3, user: MOCK_USERS[3], type: 'audio', direction: 'incoming', timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 25) },
];

export const MOCK_STATUSES: Status[] = [
  {
    id: 1,
    user: MOCK_USERS[0],
    timestamp: '15 minutes ago',
    mediaUrl: 'https://picsum.photos/seed/status_alice/400/800',
    mediaType: 'image',
    viewed: false,
  },
  {
    id: 2,
    user: MOCK_USERS[1],
    timestamp: 'Today, 2:30 PM',
    mediaUrl: 'https://picsum.photos/seed/status_bob/400/800',
    mediaType: 'image',
    viewed: true,
  },
];
