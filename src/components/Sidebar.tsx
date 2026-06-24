/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Screen, StaffProfile } from '../types';

interface SidebarProps {
  currentScreen: Screen;
  setScreen: (screen: Screen) => void;
  staff: StaffProfile;
  onLogout: () => void;
  onSwitchProfile: () => void;
  onBroadcastAlert: () => void;
}

export default function Sidebar({
  currentScreen,
  setScreen,
  staff,
  onLogout,
  onSwitchProfile,
  onBroadcastAlert
}: SidebarProps) {
  const navItems = [
    { id: 'dashboard' as Screen, label: 'Dashboard', icon: 'dashboard' },
    { id: 'vitals' as Screen, label: 'Vitals Monitor', icon: 'monitor_heart' },
    { id: 'surgical_units' as Screen, label: 'Surgical Units', icon: 'medical_services', filled: true },
    { id: 'analytics' as Screen, label: 'Analytics', icon: 'analytics' },
    { id: 'settings' as Screen, label: 'Settings', icon: 'settings' },
  ];

  return (
    <aside className="h-screen w-72 flex flex-col fixed left-0 top-0 bg-[#f2f4f5] border-r border-[#bcc9cd] z-50">
      <div className="flex flex-col h-full py-6 px-4 gap-4">
        
        {/* Brand Logo */}
        <div className="mb-6 px-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00687a] text-3xl filled-icon">security</span>
            <div>
              <h1 className="text-xl font-bold text-[#191c1d]">SafeScript 2.0</h1>
              <p className="text-xs text-[#3d494c] opacity-70 font-medium">Clinical AI Platform</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setScreen(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-2.5 rounded-lg transition-all duration-200 cursor-pointer select-none text-left font-medium text-sm ${
                  isActive
                    ? 'bg-[#d5e3fc] text-[#57657a] font-semibold shadow-sm'
                    : 'text-[#3a485b] hover:bg-[#e6e8e9]'
                }`}
              >
                <span 
                  className={`material-symbols-outlined text-xl ${isActive && item.filled ? 'filled-icon' : ''}`}
                  style={isActive && item.filled ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {item.icon}
                </span>
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Footer Tabs */}
        <div className="mt-auto pt-4 border-t border-[#bcc9cd]/40 space-y-1">
          <button
            onClick={() => setScreen('settings')}
            className={`w-full flex items-center gap-4 px-4 py-2 rounded-lg text-left text-sm font-medium transition-all duration-200 ${
              currentScreen === 'settings' ? 'bg-[#d5e3fc] text-[#57657a]' : 'text-[#3a485b] hover:bg-[#e6e8e9]'
            }`}
          >
            <span className="material-symbols-outlined text-xl">help</span>
            Help Center
          </button>
          
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-4 py-2 rounded-lg text-left text-sm font-medium text-red-700 hover:bg-red-50 hover:text-red-900 transition-all duration-200"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            Sign Out
          </button>

          {/* Quick Broadcast Alert bar in SideNav */}
          <button 
            onClick={onBroadcastAlert}
            className="w-full mt-2 py-2 px-3 bg-[#515f74] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#3d494c] transition-all"
          >
            <span className="material-symbols-outlined text-base">broadcast_on_home</span>
            Broadcast Alert
          </button>

          {/* Avatar Anchor - Interactive click to switch profile */}
          <div 
            onClick={onSwitchProfile}
            title="Click to toggle user profiles"
            className="flex items-center gap-3 p-2 bg-white hover:bg-sky-50 border border-slate-100 rounded-xl mt-4 cursor-pointer select-none transition-all"
          >
            {staff.avatarUrl ? (
              <img 
                className="w-10 h-10 rounded-full object-cover border border-sky-100 shadow-sm" 
                src={staff.avatarUrl} 
                alt={staff.name}
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#06b6d4] text-white font-bold flex items-center justify-center text-sm">
                {staff.initials}
              </div>
            )}
            <div className="overflow-hidden flex-1">
              <p className="text-sm font-bold text-slate-800 truncate leading-tight">{staff.name}</p>
              <p className="text-[11px] text-[#3d494c] truncate opacity-85">{staff.role}</p>
            </div>
            <span className="material-symbols-outlined text-slate-400 text-sm">swap_horiz</span>
          </div>
        </div>

      </div>
    </aside>
  );
}
