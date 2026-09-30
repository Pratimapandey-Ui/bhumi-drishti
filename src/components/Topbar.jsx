// src/components/Topbar.jsx
import React, { useState } from 'react';
import { Bell, Search, ShieldCheck, ChevronDown, CheckCheck } from 'lucide-react';
import { MOCK_NOTIFICATIONS } from '../data/mockData';

export default function Topbar({ onNotificationClick }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>NIC Encrypted Portal • Central Monitoring Node</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notification Bell with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 relative transition"
            aria-label="Alerts"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-600 rounded-full ring-2 ring-white"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden">
              <div className="p-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <span className="text-xs font-bold text-slate-900">Notifications ({unreadCount})</span>
                <button 
                  onClick={markAllRead} 
                  className="text-[11px] text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                >
                  <CheckCheck className="w-3 h-3" /> Mark all read
                </button>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className={`p-3 text-xs hover:bg-slate-50 cursor-pointer ${n.unread ? 'bg-blue-50/30' : ''}`}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800">{n.title}</span>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-slate-500 text-[11px] mt-0.5 truncate">{n.project}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Officer Badge */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center text-xs shadow-xs">
            RK
          </div>
          <div className="hidden md:block text-left">
            <span className="block text-xs font-bold text-slate-900 leading-tight">R. Kumar (IAS)</span>
            <span className="block text-[10px] text-slate-500 font-medium">Competent Authority (CALA)</span>
          </div>
        </div>
      </div>
    </header>
  );
}