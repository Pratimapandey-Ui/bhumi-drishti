import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export default function KPICard({ title, value, unit = "", subtext, trend, trendDirection = "neutral", icon: Icon, iconColor = "text-blue-600", iconBg = "bg-blue-50", onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`bg-white border border-slate-200/90 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer relative overflow-hidden group hover:border-slate-300`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {title}
          </p>
          <div className="flex items-baseline gap-1.5 pt-1">
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {value}
            </h3>
            {unit && <span className="text-sm font-semibold text-slate-500">{unit}</span>}
          </div>
        </div>

        <div className={`p-3 rounded-xl ${iconBg} ${iconColor} transition-transform group-hover:scale-105 duration-200`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100">
        <span className="text-xs text-slate-500 font-normal">
          {subtext}
        </span>

        {trend && (
          <span className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${
            trendDirection === 'up-bad' ? 'text-rose-700 bg-rose-50' :
            trendDirection === 'down-good' ? 'text-emerald-700 bg-emerald-50' :
            'text-slate-600 bg-slate-100'
          }`}>
            {trendDirection === 'up-bad' && <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />}
            {trendDirection === 'down-good' && <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
            {trendDirection === 'neutral' && <Minus className="w-3.5 h-3.5 mr-0.5" />}
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}