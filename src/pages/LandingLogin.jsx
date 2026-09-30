import React from 'react';
import { Shield, Sparkles, ArrowRight, Lock, CheckCircle } from 'lucide-react';

export default function LandingLogin({ onDemoAccess }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 flex flex-col justify-between text-slate-100 p-6 relative overflow-hidden select-none">
      {/* Decorative geospatial lattice circles */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[32rem] h-[32rem] rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>

      {/* Header */}
      <header className="max-w-7xl mx-auto w-full flex items-center justify-between py-2">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/30">
            <Shield className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-wider text-white">BHUMI</span>
              <span className="text-xl font-extrabold tracking-wider text-amber-400">DRISHTI</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
              Predictive Analytics System for Land Acquisition Delays
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>National Decision Intelligence Node</span>
        </div>
      </header>

      {/* Center Hero Card */}
      <main className="max-w-3xl mx-auto w-full my-auto text-center space-y-8 py-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Government AI Decision-Support Prototype</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Anticipate Land Disputes. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-amber-300">
              Accelerate Infrastructure.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-normal leading-relaxed">
            Empowering Competent Land Acquisition Authorities (CALA) with ML-driven risk scores, delay horizons, and prescriptive dispute roadmaps.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onDemoAccess}
            className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Launch Officer Demo Portal</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onDemoAccess}
            className="w-full sm:w-auto px-6 py-3.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-sm rounded-xl border border-slate-700 transition flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4 text-slate-400" />
            <span>NIC SSO Officer Login</span>
          </button>
        </div>

        {/* Feature bullets */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60">
            <CheckCircle className="w-4 h-4 text-emerald-400 mb-1.5" />
            <h4 className="text-xs font-bold text-white">Multi-Scale Heatmaps</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">National to District corridor-level drill down.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60">
            <CheckCircle className="w-4 h-4 text-amber-400 mb-1.5" />
            <h4 className="text-xs font-bold text-white">Preemptive Delay Days</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Confidence intervals on circle rate & legal disputes.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60">
            <CheckCircle className="w-4 h-4 text-blue-400 mb-1.5" />
            <h4 className="text-xs font-bold text-white">Prescriptive Directives</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Simulate mitigation initiation across departments.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-500 py-2 border-t border-slate-800/80">
        BHUMI-DRISHTI Prototype • Ministry of Road Transport & Highways / National Land Records Modernization Programme
      </footer>
    </div>
  );
}