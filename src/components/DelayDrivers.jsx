import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { AlertCircle, FileText, Scale, Users, Trees, Zap } from 'lucide-react';

const ICONS_MAP = {
  Disputed: Scale,
  Compensation: AlertCircle,
  Forest: Trees,
  Utility: Zap,
  Social: Users,
  default: FileText,
};

const getIcon = (name) => {
  for (const key in ICONS_MAP) {
    if (name.includes(key)) return ICONS_MAP[key];
  }
  return ICONS_MAP.default;
};

const COLORS = ['#EF4444', '#F97316', '#F59E0B', '#3B82F6', '#10B981'];

export default function DelayDrivers({ reasons = [] }) {
  const chartData = reasons.map((r, i) => ({
    name: r.name,
    value: r.percentage,
    color: COLORS[i % COLORS.length]
  }));

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Key Delay Drivers & Factor Weightage
          </h3>
          <p className="text-xs text-slate-500">
            Machine-learned contribution split towards projected schedule slippage
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full">
          {reasons.length} Identified Factors
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Interactive Donut Breakdown */}
        <div className="lg:col-span-5 h-56 flex items-center justify-center relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0];
                    return (
                      <div className="bg-slate-900 text-white text-xs px-3 py-2 rounded-md shadow-lg">
                        <p className="font-semibold">{data.name}</p>
                        <p className="text-amber-400 font-bold mt-0.5">{data.value}% Impact Weight</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Top Driver</span>
            <span className="text-xl font-extrabold text-slate-800">
              {reasons[0]?.percentage || 0}%
            </span>
          </div>
        </div>

        {/* Detailed Ranked Progress Bars */}
        <div className="lg:col-span-7 space-y-3">
          {reasons.map((item, index) => {
            const ItemIcon = getIcon(item.name);
            const barColor = COLORS[index % COLORS.length];

            return (
              <div key={item.name} className="space-y-1 group">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-medium text-slate-800">
                    <ItemIcon className="w-3.5 h-3.5 text-slate-500" />
                    <span className="font-semibold">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{item.percentage}%</span>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                      item.impact === 'High' ? 'bg-rose-100 text-rose-700' :
                      item.impact === 'Medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {item.impact}
                    </span>
                  </div>
                </div>

                {/* Progress bar container */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-700" 
                    style={{ width: `${item.percentage}%`, backgroundColor: barColor }}
                  />
                </div>

                <p className="text-[11px] text-slate-500 leading-snug">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}