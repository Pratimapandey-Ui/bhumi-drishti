import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import KPICard from './components/KPICard';
import RiskHeatmap from './components/RiskHeatmap';
import ProjectTable from './components/ProjectTable';
import RiskAnalysis from './pages/RiskAnalysis';
import Reports from './pages/Reports';
import LandingLogin from './pages/LandingLogin';
import { MOCK_PROJECTS, GEOSPATIAL_DATA, getRiskAssessment } from './data/mockData';
import { Layers, AlertTriangle, Clock, ShieldCheck, CheckCircle, Info } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentProject, setCurrentProject] = useState(MOCK_PROJECTS[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const handleAnalyze = async (projectToAnalyze) => {
    setIsAnalyzing(true);
    try {
      const result = await getRiskAssessment(projectToAnalyze.projectId);
      setCurrentProject(result);
      triggerToast(`Acquisition risk analysis completed for "${result.projectName}".`);
      setActiveTab('analysis');
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSelectProjectDirectly = (proj) => {
    setCurrentProject(proj);
    setActiveTab('analysis');
    triggerToast(`Loaded acquisition profile for ${proj.projectName}`);
  };

  if (!isAuthenticated) {
    return <LandingLogin onDemoAccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      {/* Fixed Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        onSelectTab={(tab) => setActiveTab(tab)} 
        onLogout={() => setIsAuthenticated(false)} 
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Topbar onNotificationClick={() => setActiveTab('alerts')} />

        <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
          {/* Main Dashboard Screen */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Header Title */}
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Land Acquisition Risk Intelligence
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Monitor, predict, and mitigate major project land acquisition delays across India
                </p>
              </div>

              {/* 4 Interactive KPI Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <KPICard
                  title="Total Active Projects"
                  value={GEOSPATIAL_DATA.national.totalProjects}
                  subtext="National footprint"
                  trend="+4 this month"
                  icon={Layers}
                  onClick={() => setActiveTab('projects')}
                />
                <KPICard
                  title="High Risk Projects"
                  value={GEOSPATIAL_DATA.national.highRiskProjects}
                  subtext="Requiring monitoring"
                  trend="18% of portfolio"
                  trendDirection="up-bad"
                  icon={AlertTriangle}
                  iconColor="text-orange-600"
                  iconBg="bg-orange-50"
                  onClick={() => setActiveTab('projects')}
                />
                <KPICard
                  title="Average Predicted Delay"
                  value={GEOSPATIAL_DATA.national.avgPredictedDelay}
                  unit="Days"
                  subtext="Across all pending stages"
                  trend="-3d after actions"
                  trendDirection="down-good"
                  icon={Clock}
                  iconColor="text-blue-600"
                  iconBg="bg-blue-50"
                  onClick={() => setActiveTab('reports')}
                />
                <KPICard
                  title="Critical Escalations"
                  value={GEOSPATIAL_DATA.national.criticalProjects}
                  subtext="Immediate CALA review"
                  trend="High Court litigation"
                  trendDirection="up-bad"
                  icon={ShieldCheck}
                  iconColor="text-rose-600"
                  iconBg="bg-rose-50"
                  onClick={() => setActiveTab('alerts')}
                />
              </div>

              {/* Geospatial Heatmap View */}
              <RiskHeatmap 
                onSelectProjectFromMap={handleSelectProjectDirectly} 
              />

              {/* Active Corridor Table */}
              <ProjectTable 
                onSelectProject={handleSelectProjectDirectly} 
              />
            </div>
          )}

          {/* Deep Risk Analysis Subpage */}
          {activeTab === 'analysis' && (
            <RiskAnalysis
              project={currentProject}
              onSelectProject={(p) => setCurrentProject(p)}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
              onTriggerToast={triggerToast}
            />
          )}

          {/* Projects Registry Subpage */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Active Infrastructure Corridors</h2>
                <p className="text-xs text-slate-500">Filter and trigger risk telemetry across projects</p>
              </div>
              <ProjectTable onSelectProject={handleSelectProjectDirectly} />
            </div>
          )}

          {/* Geospatial Heatmap Standalone Subpage */}
          {activeTab === 'heatmap' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Geospatial Intelligence Platform</h2>
                <p className="text-xs text-slate-500">Multilevel territorial exploration</p>
              </div>
              <RiskHeatmap onSelectProjectFromMap={handleSelectProjectDirectly} />
            </div>
          )}

          {/* Alerts & Actions Subpage */}
{activeTab === 'alerts' && (
  <div className="space-y-4">
    <div>
      <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Urgent Directives & Critical Escalations</h2>
      <p className="text-xs text-slate-500">Corridors crossing critical delay threshold (&gt;80 Score)</p>
    </div>
    <div className="grid grid-cols-1 gap-3">
      {MOCK_PROJECTS.filter(p => p.riskScore >= 75).map(p => (
        <div key={p.projectId} className="bg-white border-l-4 border-rose-600 p-4 rounded-r-xl border-y border-r border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                CRITICAL ALERT • SCORE {p.riskScore}
              </span>
              <span className="text-xs font-semibold text-slate-600">{p.district}, {p.state}</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 mt-1">{p.projectName}</h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Primary Cause: <strong>{p.reasons[0]?.name}</strong> ({p.reasons[0]?.desc})
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Delay Slippage</span>
              <span className="text-base font-extrabold text-rose-600">{p.estimatedDelay} Days</span>
            </div>
            <button
              onClick={() => handleSelectProjectDirectly(p)}
              className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs rounded-lg transition"
            >
              Inspect Parcel
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

          {/* Reports Subpage */}
          {activeTab === 'reports' && <Reports />}

          {/* System Settings Subpage */}
          {activeTab === 'settings' && (
            <div className="bg-white p-6 rounded-xl border border-slate-200 max-w-xl space-y-4">
              <h3 className="text-base font-bold text-slate-900">Predictive Model Configuration</h3>
              <p className="text-xs text-slate-500">
                Mock inference parameters. Once ML endpoints are integrated, point target prediction endpoint to designated Python/FastAPI host.
              </p>
              <div className="space-y-3 text-xs pt-2">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Inference Backend Host</label>
                  <input type="text" readOnly value="https://ml-gateway.internal.bhumi.gov.in/predict" className="w-full bg-slate-100 border border-slate-200 px-3 py-2 rounded text-slate-700 cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Circle Rate Sensitivity Co-efficient</label>
                  <input type="text" readOnly value="1.42 (MoRTH Gazette Benchmark)" className="w-full bg-slate-100 border border-slate-200 px-3 py-2 rounded text-slate-700 cursor-not-allowed" />
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-12 right-6 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 z-50 border border-slate-700 animate-slideUp">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Prototype Evaluation Watermark Badge */}
        <footer className="mt-auto py-3 px-6 border-t border-slate-200 bg-white/70 backdrop-blur-xs flex items-center justify-between text-[11px] text-slate-500">
          <span>BHUMI-DRISHTI • Ministry of Road Transport & Highways</span>
          <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            Prototype Evaluation Mode • Simulated Model Weights
          </span>
        </footer>
      </div>
    </div>
  );
}