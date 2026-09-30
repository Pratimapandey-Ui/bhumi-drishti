import React from 'react';
import { getRiskMeta } from '../data/mockData';

export default function RiskGauge({ score = 0, size = 260 }) {
  const meta = getRiskMeta(score);
  
  // Calculate SVG arc for semi-circle / 240 degree gauge
  const radius = 90;
  const strokeWidth = 16;
  const circumference = 2 * Math.PI * radius;
  // Use a 240 degree arc (approx 0.667 of full circle)
  const arcLength = circumference * 0.68;
  const strokeDashoffset = arcLength - (score / 100) * arcLength;

  return (
    <div className="flex flex-col items-center justify-center relative p-2">
      <div className="relative" style={{ width: size, height: size * 0.85 }}>
        <svg 
          viewBox="0 0 220 180" 
          className="w-full h-full transform -rotate-10"
        >
          <defs>
            <linearGradient id="riskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="35%" stopColor="#F59E0B" />
              <stop offset="70%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
            <filter id="gaugeShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Background Track */}
          <path
            d="M 25 155 A 90 90 0 1 1 195 155"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Active Score Arc */}
          <path
            d="M 25 155 A 90 90 0 1 1 195 155"
            fill="none"
            stroke={meta.color}
            strokeWidth={strokeWidth + 2}
            strokeDasharray={arcLength}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            filter="url(#gaugeShadow)"
          />

          {/* Segment Markers */}
          <circle cx="25" cy="155" r="3" fill="#94A3B8" />
          <circle cx="70" cy="50" r="3" fill="#94A3B8" />
          <circle cx="150" cy="50" r="3" fill="#94A3B8" />
          <circle cx="195" cy="155" r="3" fill="#94A3B8" />
        </svg>

        {/* Central Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center top-6">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-0.5">
            Risk Score
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-extrabold tracking-tight text-slate-900">
              {score}
            </span>
            <span className="text-slate-500 text-lg font-semibold">/100</span>
          </div>

          <div className={`mt-2 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-widest ${meta.bg} ${meta.text} border ${meta.border} shadow-sm`}>
            {meta.label} RISK
          </div>
        </div>
      </div>

      {/* Scale Legend */}
      <div className="w-full max-w-xs grid grid-cols-4 gap-1 text-[11px] font-medium text-slate-600 mt-1">
        <div className={`text-center py-1 rounded ${score <= 30 ? 'bg-emerald-100 text-emerald-900 font-bold' : ''}`}>
          0–30 <span className="block text-[9px] font-bold text-emerald-600">LOW</span>
        </div>
        <div className={`text-center py-1 rounded ${score > 30 && score <= 60 ? 'bg-amber-100 text-amber-900 font-bold' : ''}`}>
          31–60 <span className="block text-[9px] font-bold text-amber-600">MED</span>
        </div>
        <div className={`text-center py-1 rounded ${score > 60 && score <= 80 ? 'bg-orange-100 text-orange-900 font-bold' : ''}`}>
          61–80 <span className="block text-[9px] font-bold text-orange-600">HIGH</span>
        </div>
        <div className={`text-center py-1 rounded ${score > 80 ? 'bg-rose-100 text-rose-900 font-bold' : ''}`}>
          81–100 <span className="block text-[9px] font-bold text-rose-600">CRIT</span>
        </div>
      </div>
    </div>
  );
}