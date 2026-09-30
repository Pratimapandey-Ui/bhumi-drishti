import React from 'react';
import { Calendar, Clock, AlertTriangle, CheckCircle, ShieldAlert, Sparkles, Building2, MapPin } from 'lucide-react';
import RiskGauge from '../components/RiskGauge';
import DelayDrivers from '../components/DelayDrivers';
import RecommendedActions from '../components/RecommendedActions';
import ProjectSelector from '../components/ProjectSelector';
import { getRiskMeta } from '../data/mockData';

export default function RiskAnalysis({
  project,
  onSelectProject,
  onAnalyze,
  isAnalyzing,
  onTriggerToast
}) {
  const meta = getRiskMeta(project.riskScore);

  return (
    <div className="space-y-6">
      {/* Dynamic Project Selector */}
      <ProjectSelector
        selectedProject={project}
        onSelectProject={onSelectProject}
        onAnalyze={onAnalyze}
        isAnalyzing={isAnalyzing}
      />

      {/* Main Analysis Engine Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Banner Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded text-xs font-extrabold uppercase tracking-wide ${meta.bg} ${meta.text} border ${meta.border}`}>
                {meta.label} RISK CORRIDOR
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-semibold text-slate-600">ID: {project.projectId}</span>
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight mt-1">
              {project.projectName}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1.5 font-medium">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {project.landArea} ({project.district}, {project.state})
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Assessment Date: {project.assessmentDate}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="bg-white border border-slate-200 px-3.5 py-2 rounded-lg text-right shadow-xs">
              <span className="block text-[10px] uppercase tracking-wider font-bold text-slate-500">Current Phase</span>
              <span className="block text-xs font-bold text-blue-700">{project.acquisitionStage}</span>
            </div>
          </div>
        </div>

        {/* Metrics Grid: Risk Gauge + Estimated Delay */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center border-b border-slate-100">
          {/* Left: Prominent Animated Gauge */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-2 lg:border-r border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Acquisition Risk Assessment Score
            </h3>
            <RiskGauge score={project.riskScore} />
          </div>

          {/* Right: Projected Delay Telemetry */}
          <div className="lg:col-span-6 space-y-5 lg:pl-4">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Estimated Delay Projection
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-slate-900 tracking-tight">
                  {project.estimatedDelay}
                </span>
                <span className="text-xl font-bold text-slate-700">Days</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                95% Confidence Bounds: <span className="font-semibold text-slate-700">{project.delayRange}</span>
              </p>

              <div className="mt-4 pt-3 border-t border-slate-200/80 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 block">Affected Families:</span>
                  <span className="font-bold text-slate-800">{project.affectedFamilies} Khata Holders</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Corridor Budget:</span>
                  <span className="font-bold text-slate-800">₹{project.budgetCr} Crores</span>
                </div>
              </div>
            </div>

            {/* AI Warning Advisory */}
            <div className={`p-4 rounded-xl border flex items-start gap-3 ${
              project.riskScore > 60 ? 'bg-rose-50/70 border-rose-200 text-rose-900' : 'bg-amber-50/70 border-amber-200 text-amber-900'
            }`}>
              <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <span className="font-bold block">Advisory Flag:</span>
                Critical delay drivers require immediate Revenue & Legal intervention to prevent circle-rate compounding litigation.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delay Drivers Breakdown Section */}
      <DelayDrivers reasons={project.reasons} />

      {/* Action Roadmap Section */}
      <RecommendedActions actions={project.actions} onTriggerToast={onTriggerToast} />
    </div>
  );
}