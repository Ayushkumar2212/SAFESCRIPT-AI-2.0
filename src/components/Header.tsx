/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StaffProfile } from '../types';

interface HeaderProps {
  title?: string;
  searchPlaceholder?: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  staff: StaffProfile;
  notificationsCount: number;
  onNotificationsClick: () => void;
  onSwitchProfile: () => void;
}

export default function Header({
  title = "OpsCenter AI",
  searchPlaceholder = "Search operations, staff, or assets...",
  searchQuery,
  setSearchQuery,
  staff,
  notificationsCount,
  onNotificationsClick,
  onSwitchProfile
}: HeaderProps) {
  return (
    <header className="w-full sticky top-0 z-40 bg-[#f8fafb] border-b border-[#bcc9cd]/50 h-16 flex justify-between items-center px-6">
      
      {/* Left Area: Title / Live sync indicator */}
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-bold text-[#00687a]">{title}</h1>
        <div className="h-6 w-px bg-[#bcc9cd]/40 hidden sm:block"></div>
        <div className="hidden sm:flex items-center gap-1.5 text-[#00687a] font-medium px-2.5 py-1 bg-[#06b6d4]/10 rounded-lg">
          <div className="w-2 h-2 rounded-full bg-[#06b6d4] animate-ping"></div>
          <div className="w-2 h-2 rounded-full bg-[#06b6d4] absolute"></div>
          <span className="text-xs font-semibold tracking-wide ml-1 select-none">Live Sync Active</span>
        </div>
      </div>

      {/* Center/Right Area: Search and controls */}
      <div className="flex items-center gap-6 flex-1 justify-end">
        
        {/* Search Input */}
        <div className="relative max-w-sm w-full hidden md:block">
          <span className="absolute inset-y-0 left-3 flex items-center text-[#3d494c] pointer-events-none">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#f2f4f5] border-none rounded-full py-1.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#06b6d4] focus:outline-none transition-all placeholder:text-slate-400 text-slate-800"
            placeholder={searchPlaceholder}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-3 flex items-center text-[#3d494c]/60 hover:text-slate-800"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        {/* Notifications and Profile */}
        <div className="flex items-center gap-3">
          
          {/* Notifications Trigger */}
          <button 
            onClick={onNotificationsClick}
            className="p-2 rounded-full hover:bg-[#f2f4f5] transition-colors text-[#00687a] relative cursor-pointer"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-2xl">notifications</span>
            {notificationsCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#ba1a1a] text-white text-[9px] font-bold rounded-full border border-white flex items-center justify-center">
                {notificationsCount}
              </span>
            )}
          </button>

          {/* User profile dropdown anchor */}
          <button 
            onClick={onSwitchProfile}
            className="flex items-center gap-2 px-1 py-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer text-left"
            title="Switch Profile"
          >
            {staff.avatarUrl ? (
              <img 
                className="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-sm" 
                src={staff.avatarUrl} 
                alt={staff.name} 
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#06b6d4] text-white font-bold flex items-center justify-center text-xs">
                {staff.initials}
              </div>
            )}
            <div className="hidden lg:block text-xs text-slate-700 font-medium pr-1">
              <span className="block font-semibold text-slate-800 leading-tight">{staff.name}</span>
              <span className="text-[10px] text-slate-400 block leading-none">{staff.role}</span>
            </div>
          </button>

        </div>
      </div>

    </header>
  );
}
