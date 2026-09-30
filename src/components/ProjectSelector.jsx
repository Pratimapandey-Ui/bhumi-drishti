import React, { useState, useEffect } from 'react';
import { Search, Loader2, Sparkles, MapPin, Building, ChevronRight } from 'lucide-react';
import { MOCK_PROJECTS, GEOSPATIAL_DATA } from '../data/mockData';

export default function ProjectSelector({ selectedProject, onSelectProject, onAnalyze, isAnalyzing }) {
  // Cascading Selection State
  const states = Object.keys(GEOSPATIAL_DATA.stateDistricts);
  const [selectedState, setSelectedState] = useState(selectedProject?.state || "Haryana");
  
  const districts = GEOSPATIAL_DATA.stateDistricts[selectedState]?.map(d => d.name) || [];
  const [selectedDistrict, setSelectedDistrict] = useState(selectedProject?.district || districts[0] || "");
  
  const projectsInDistrict = MOCK_PROJECTS.filter(
    p => p.state === selectedState && p.district === selectedDistrict
  );
  
  const [selectedProjectId, setSelectedProjectId] = useState(selectedProject?.projectId || (projectsInDistrict[0]?.projectId || ""));

  // Keep state sync if selectedProject changes externally (e.g., from table or heatmap click)
  useEffect(() => {
    if (selectedProject) {
      setSelectedState(selectedProject.state);
      setSelectedDistrict(selectedProject.district);
      setSelectedProjectId(selectedProject.projectId);
    }
  }, [selectedProject]);

  const handleStateChange = (e) => {
    const newState = e.target.value;
    setSelectedState(newState);
    const newDistricts = GEOSPATIAL_DATA.stateDistricts[newState]?.map(d => d.name) || [];
    const firstDist = newDistricts[0] || "";
    setSelectedDistrict(firstDist);

    const projs = MOCK_PROJECTS.filter(p => p.state === newState && p.district === firstDist);
    if (projs.length > 0) {
      setSelectedProjectId(projs[0].projectId);
      onSelectProject(projs[0]);
    } else {
      setSelectedProjectId("");
    }
  };

  const handleDistrictChange = (e) => {
    const newDistrict = e.target.value;
    setSelectedDistrict(newDistrict);
    const projs = MOCK_PROJECTS.filter(p => p.state === selectedState && p.district === newDistrict);
    if (projs.length > 0) {
      setSelectedProjectId(projs[0].projectId);
      onSelectProject(projs[0]);
    } else {
      setSelectedProjectId("");
    }
  };

  const handleProjectChange = (e) => {
    const pId = e.target.value;
    setSelectedProjectId(pId);
    const found = MOCK_PROJECTS.find(p => p.projectId === pId);
    if (found) onSelectProject(found);
  };

  const activeProject = MOCK_PROJECTS.find(p => p.projectId === selectedProjectId) || selectedProject;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-blue-600"></span>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Select Project & Land Parcel
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Query the predictive risk model by cascading administrative boundaries
          </p>
        </div>

        {/* Quick Breadcrumb Indicator */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
          <span>{selectedState}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span>{selectedDistrict}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-blue-600 max-w-[140px] truncate">{activeProject?.projectName || 'Select Project'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5 mt-4">
        {/* State Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            1. State / UT
          </label>
          <div className="relative">
            <select
              value={selectedState}
              onChange={handleStateChange}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
            >
              {states.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* District Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            2. District
          </label>
          <div className="relative">
            <select
              value={selectedDistrict}
              onChange={handleDistrictChange}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
            >
              {districts.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Project Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            3. Target Project
          </label>
          <div className="relative">
            <select
              value={selectedProjectId}
              onChange={handleProjectChange}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
            >
              {projectsInDistrict.length > 0 ? (
                projectsInDistrict.map(p => (
                  <option key={p.projectId} value={p.projectId}>{p.projectName}</option>
                ))
              ) : (
                <option value="">No Active Projects in List</option>
              )}
            </select>
          </div>
        </div>

        {/* Land Parcel / Action Button */}
        <div className="flex flex-col justify-end">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            4. Area / Parcel
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={activeProject?.landArea || 'Default Land Corridor'}
              className="w-full bg-slate-100 text-slate-700 text-xs font-medium rounded-lg px-3 py-2.5 border border-slate-200 truncate cursor-not-allowed"
              title={activeProject?.landArea}
            />
          </div>
        </div>
      </div>

      {/* Main Action Trigger */}
      <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="font-semibold text-slate-700">Current Phase:</span>
          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
            {activeProject?.acquisitionStage || "Verification"}
          </span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="hidden sm:inline font-semibold text-slate-700">Area:</span>
          <span className="hidden sm:inline">{activeProject?.totalAreaAcres || 0} Acres</span>
        </div>

        <button
          onClick={() => onAnalyze(activeProject)}
          disabled={isAnalyzing}
          className="w-full sm:w-auto px-6 py-2.5 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white font-semibold text-xs rounded-lg shadow-sm hover:shadow transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing Acquisition Indicators...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-blue-200" />
              <span>ANALYZE RISK ENGINE</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}