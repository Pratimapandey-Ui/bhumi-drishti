import React, { useState } from 'react';
import { FileText, Download, CheckCircle2, BarChart2, TrendingUp, Sparkles, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { GEOSPATIAL_DATA, NATIONAL_DELAY_FACTORS } from '../data/mockData';

export default function Reports() {
  const [reportState, setReportState] = useState('idle'); // 'idle' | 'generating' | 'done'

  const handleGenerateReport = () => {
    setReportState('generating');
    setTimeout(() => {
      setReportState('done');
    }, 1200);
  };

  const stateComparisonData = GEOSPATIAL_DATA.national.states.map(s => ({
    name: s.name,
    delay: s.avgDelay,
    risk: s.riskScore
  }));

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">National Land Delay Intelligence Reports</h2>
          <p className="text-xs text-slate-500">
            Synthesized analytical summaries compiled across 128 multi-modal infrastructure projects
          </p>
        </div>

        <button
          onClick={handleGenerateReport}
          disabled={reportState === 'generating'}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs rounded-lg shadow-sm transition disabled:opacity-60"
        >
          {reportState === 'generating' ? (
            <>
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Compiling Predictive Audit...</span>
            </>
          ) : reportState === 'done' ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Report Generated (PDF Ready)</span>
            </>
          ) : (
            <>
              <FileText className="w-4 h-4" />
              <span>Generate Comprehensive Report</span>
            </>
          )}
        </button>
      </div>

      {reportState === 'done' && (
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center justify-between text-xs text-emerald-800 animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="font-semibold">
              Demo Executive Summary "BHUMI_DRISHTI_NATIONAL_SEPT2026.pdf" generated successfully.
            </span>
          </div>
          <span className="font-bold text-emerald-700 underline cursor-pointer">Download Simulated Artifact</span>
        </div>
      )}

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* State Delay Comparison */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-1">State-wise Average Delay Horizon</h3>
          <p className="text-xs text-slate-500 mb-4">Mean estimated postponement days across major states</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stateComparisonData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} unit="d" />
                <Tooltip />
                <Bar dataKey="delay" fill="#1E3A8A" radius={[4, 4, 0, 0]} name="Avg Delay (Days)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* National Delay Split */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-1">National Risk Factor Breakdown</h3>
          <p className="text-xs text-slate-500 mb-4">Aggregated root-cause weightage across Indian territory</p>
          <div className="space-y-3 pt-2">
            {NATIONAL_DELAY_FACTORS.map(factor => (
              <div key={factor.name} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-700">{factor.name}</span>
                  <span className="font-bold text-slate-900">{factor.value}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${factor.value}%`, backgroundColor: factor.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}