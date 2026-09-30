import React from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  Map, 
  Layers, 
  BellRing, 
  FileSpreadsheet, 
  Settings, 
  Shield, 
  LogOut 
} from 'lucide-react';

export default function Sidebar({ activeTab, onSelectTab, onLogout }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analysis', label: 'Risk Analysis', icon: Activity },
    { id: 'projects', label: 'Projects Registry', icon: Layers },
    { id: 'heatmap', label: 'Geospatial Heatmap', icon: Map },
    { id: 'alerts', label: 'Alerts & Actions', icon: BellRing },
    { id: 'reports', label: 'Reports & Audit', icon: FileSpreadsheet },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-200 min-h-screen flex flex-col justify-between shrink-0 select-none">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-600 text-white shadow-md">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-base tracking-wider text-white">BHUMI</span>
              <span className="font-extrabold text-base tracking-wider text-amber-400">DRISHTI</span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-tight font-medium uppercase">
              Govt. of India • Land Analytics
            </p>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="p-3 space-y-1 mt-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm font-bold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile & Logout */}
      <div className="p-4 border-t border-slate-800 space-y-3">
        <div className="flex items-center gap-3 px-1">
          <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center font-bold text-xs text-amber-400">
            RK
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-white truncate">Rajeev Kumar, IAS</p>
            <p className="text-[10px] text-slate-400 truncate">Special Land Officer, CALA</p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 transition"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Session</span>
        </button>
      </div>
    </aside>
  );
}