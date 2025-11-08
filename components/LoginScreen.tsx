import React, { useState } from 'react';
import { WhatsAppLogoIcon } from './Icons';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleLogin = () => {
    if (phoneNumber.trim().length > 5) { // Basic validation
      onLogin();
    } else {
      alert("Please enter a valid phone number.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 space-y-8 bg-white shadow-md rounded-lg">
        <div className="flex flex-col items-center">
            <WhatsAppLogoIcon />
            <h1 className="text-2xl font-bold text-gray-800 mt-4">Welcome to WhatsApp</h1>
            <p className="text-center text-gray-500 mt-2">
                Enter your phone number to get started.
            </p>
        </div>

        <div className="relative">
            <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone number"
                className="w-full px-4 py-3 border-b-2 border-green-500 focus:outline-none focus:border-green-600 transition"
            />
        </div>

        <button
          onClick={handleLogin}
          className="w-full py-3 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
        >
          Continue
        </button>

        <p className="text-xs text-center text-gray-400">
          Carrier charges may apply.
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
