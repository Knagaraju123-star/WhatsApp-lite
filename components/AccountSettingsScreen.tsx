import React from 'react';
import { BackIcon, LockIcon, ShieldIcon, TwoStepIcon, ChangeNumberIcon, RequestInfoIcon, DeleteAccountIcon } from './Icons';

interface AccountSettingsScreenProps {
  onBack: () => void;
}

const AccountSettingItem: React.FC<{ icon: React.ReactNode; title: string; }> = ({ icon, title }) => (
    <div className="flex items-center p-4 hover:bg-gray-50 cursor-pointer w-full">
        <div className="text-gray-500">{icon}</div>
        <div className="ml-4 flex-1">
            <p className="text-base text-gray-800">{title}</p>
        </div>
    </div>
);

const AccountSettingsScreen: React.FC<AccountSettingsScreenProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-[#075e54] text-white flex items-center p-3 shadow-md fixed top-0 w-full z-20">
        <button onClick={onBack} className="mr-4">
          <BackIcon />
        </button>
        <h2 className="font-semibold text-lg">Account</h2>
      </header>

      <main className="flex-1 overflow-y-auto pt-16">
        <div className="bg-white border-y">
           <AccountSettingItem 
                icon={<LockIcon />}
                title="Privacy"
           />
           <AccountSettingItem 
                icon={<ShieldIcon />}
                title="Security"
           />
           <AccountSettingItem 
                icon={<TwoStepIcon />}
                title="Two-step verification"
           />
            <AccountSettingItem 
                icon={<ChangeNumberIcon />}
                title="Change number"
           />
           <AccountSettingItem 
                icon={<RequestInfoIcon />}
                title="Request account info"
           />
           <AccountSettingItem 
                icon={<DeleteAccountIcon />}
                title="Delete my account"
           />
        </div>
      </main>
    </div>
  );
};

export default AccountSettingsScreen;
