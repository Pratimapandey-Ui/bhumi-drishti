import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip as LeafletTooltip } from 'react-leaflet';
import { GEOSPATIAL_DATA, MOCK_PROJECTS, getRiskMeta } from '../data/mockData';
import { Layers, ChevronRight, CornerDownLeft, AlertTriangle, ExternalLink, MapPin } from 'lucide-react';

export default function RiskHeatmap({ onSelectProjectFromMap }) {
  const [level, setLevel] = useState('NATIONAL'); // 'NATIONAL' | 'STATE' | 'DISTRICT'
  const [activeState, setActiveState] = useState('Haryana');
  const [activeDistrict, setActiveDistrict] = useState('Faridabad');

  // Coordinates centers
  const INDIA_CENTER = [22.9734, 78.6569];
  const STATE_CENTERS = {
    'Haryana': [29.0588, 76.0856],
    'Uttar Pradesh': [26.8467, 80.9462],
    'Maharashtra': [19.7515, 75.7139],
    'Gujarat': [22.2587, 71.1924],
    'Rajasthan': [27.0238, 74.2179],
    'Madhya Pradesh': [22.9734, 78.6569],
    'Karnataka': [15.3173, 75.7139]
  };

  const handleStateClick = (stateName) => {
    setActiveState(stateName);
    setLevel('STATE');
    const dList = GEOSPATIAL_DATA.stateDistricts[stateName];
    if (dList && dList.length > 0) {
      setActiveDistrict(dList[0].name);
    }
  };

  const handleDistrictClick = (districtName) => {
    setActiveDistrict(districtName);
    setLevel('DISTRICT');
  };

  const currentDistricts = GEOSPATIAL_DATA.stateDistricts[activeState] || [];
  const currentProjects = MOCK_PROJECTS.filter(p => p.state === activeState && p.district === activeDistrict);

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Top Controller Bar */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-700" />
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Geospatial Risk Intelligence & Heatmap
            </h3>
            <p className="text-[11px] text-slate-500">
              Multi-scale territory drill-down: National $\to$ State $\to$ District Corridor
            </p>
          </div>
        </div>

        {/* Level Switcher Buttons */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setLevel('NATIONAL')}
            className={`px-3 py-1.5 rounded transition ${level === 'NATIONAL' ? 'bg-blue-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            National View
          </button>
          <button
            onClick={() => setLevel('STATE')}
            className={`px-3 py-1.5 rounded transition ${level === 'STATE' ? 'bg-blue-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            State: {activeState}
          </button>
          <button
            onClick={() => setLevel('DISTRICT')}
            className={`px-3 py-1.5 rounded transition ${level === 'DISTRICT' ? 'bg-blue-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            District: {activeDistrict}
          </button>
        </div>
      </div>

      {/* Interactive Map Visualizer Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
        {/* Left Side: Leaflet Interactive Map View */}
        <div className="lg:col-span-8 h-[460px] relative bg-slate-100 border-r border-slate-200">
          <MapContainer
            center={level === 'NATIONAL' ? INDIA_CENTER : STATE_CENTERS[activeState] || INDIA_CENTER}
            zoom={level === 'NATIONAL' ? 5 : level === 'STATE' ? 7 : 9}
            scrollWheelZoom={false}
            className="h-full w-full"
            key={`${level}-${activeState}-${activeDistrict}`}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />

            {/* National Level: Render States Markers */}
            {level === 'NATIONAL' && GEOSPATIAL_DATA.national.states.map((st) => {
              const meta = getRiskMeta(st.riskScore);
              return (
                <CircleMarker
                  key={st.id}
                  center={[st.lat, st.lng]}
                  radius={st.riskScore > 75 ? 20 : st.riskScore > 50 ? 16 : 12}
                  fillColor={meta.color}
                  color="#FFFFFF"
                  weight={2}
                  fillOpacity={0.8}
                  eventHandlers={{
                    click: () => handleStateClick(st.name)
                  }}
                >
                  <LeafletTooltip direction="top" offset={[0, -10]} opacity={1}>
                    <div className="text-xs p-1">
                      <p className="font-bold text-slate-900">{st.name}</p>
                      <p className="text-slate-600">Risk Score: <span className="font-bold text-rose-600">{st.riskScore}/100</span></p>
                      <p className="text-slate-500">Active Projects: {st.projectsCount}</p>
                      <p className="text-blue-600 text-[10px] mt-1 font-semibold">Click to drill into state</p>
                    </div>
                  </LeafletTooltip>
                </CircleMarker>
              );
            })}

            {/* State Level: Render District Markers */}
            {level === 'STATE' && currentDistricts.map((dist) => {
              const meta = getRiskMeta(dist.riskScore);
              return (
                <CircleMarker
                  key={dist.name}
                  center={[dist.lat, dist.lng]}
                  radius={18}
                  fillColor={meta.color}
                  color="#FFFFFF"
                  weight={3}
                  fillOpacity={0.85}
                  eventHandlers={{
                    click: () => handleDistrictClick(dist.name)
                  }}
                >
                  <LeafletTooltip direction="top" offset={[0, -10]} opacity={1}>
                    <div className="text-xs p-1">
                      <p className="font-bold text-slate-900">{dist.name} District</p>
                      <p className="text-slate-600">Avg Delay: <span className="font-bold">{dist.avgDelay} Days</span></p>
                      <p className="text-slate-500">Risk Score: {dist.riskScore}</p>
                      <p className="text-blue-600 text-[10px] mt-1 font-semibold">Click to view parcel list</p>
                    </div>
                  </LeafletTooltip>
                </CircleMarker>
              );
            })}

            {/* District Level: Render Project Corridor Location */}
            {level === 'DISTRICT' && currentProjects.map((proj) => {
              const meta = getRiskMeta(proj.riskScore);
              const distObj = currentDistricts.find(d => d.name === activeDistrict);
              const lat = distObj ? distObj.lat + (Math.random() - 0.5) * 0.05 : 28.4089;
              const lng = distObj ? distObj.lng + (Math.random() - 0.5) * 0.05 : 77.3178;

              return (
                <CircleMarker
                  key={proj.projectId}
                  center={[lat, lng]}
                  radius={14}
                  fillColor={meta.color}
                  color="#1E293B"
                  weight={2}
                  fillOpacity={0.9}
                  eventHandlers={{
                    click: () => onSelectProjectFromMap(proj)
                  }}
                >
                  <Popup>
                    <div className="text-xs p-1">
                      <p className="font-bold text-slate-900">{proj.projectName}</p>
                      <p className="text-slate-600 mt-1">{proj.landArea}</p>
                      <p className="text-rose-600 font-bold mt-1">Predicted Delay: {proj.estimatedDelay} Days</p>
                      <button
                        onClick={() => onSelectProjectFromMap(proj)}
                        className="mt-2 w-full bg-blue-700 text-white py-1 px-2 rounded font-semibold text-[11px]"
                      >
                        Inspect in Risk Engine
                      </button>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}
          </MapContainer>

          {/* Floating Map Legend */}
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs border border-slate-200 p-2.5 rounded-lg shadow-sm text-[11px] font-medium z-[400] space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span>Low (0–30)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span>Medium (31–60)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-500"></span>
              <span>High (61–80)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500"></span>
              <span>Critical (81–100)</span>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Drill-Down Context List */}
        <div className="lg:col-span-4 p-4 overflow-y-auto max-h-[460px] bg-white">
          {level === 'NATIONAL' && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Select State to Drill In
              </h4>
              <div className="space-y-2">
                {GEOSPATIAL_DATA.national.states.map((st) => {
                  const meta = getRiskMeta(st.riskScore);
                  return (
                    <div
                      key={st.id}
                      onClick={() => handleStateClick(st.name)}
                      className="p-3 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/40 cursor-pointer transition flex items-center justify-between group"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900 group-hover:text-blue-700">
                            {st.name}
                          </span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${meta.bg} ${meta.text}`}>
                            {st.riskLevel}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">
                          {st.projectsCount} Active Projects • Avg Delay: {st.avgDelay}d
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {level === 'STATE' && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {activeState} Districts
                </h4>
                <button
                  onClick={() => setLevel('NATIONAL')}
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                >
                  <CornerDownLeft className="w-3 h-3" /> Back to India
                </button>
              </div>

              <div className="space-y-2">
                {currentDistricts.map((dist) => {
                  const meta = getRiskMeta(dist.riskScore);
                  return (
                    <div
                      key={dist.name}
                      onClick={() => handleDistrictClick(dist.name)}
                      className="p-3 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/40 cursor-pointer transition flex items-center justify-between group"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900 group-hover:text-blue-700">
                            {dist.name}
                          </span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${meta.bg} ${meta.text}`}>
                            {dist.riskScore}/100
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">
                          {dist.projectsCount} Corridor Parcels • Avg Delay: {dist.avgDelay} Days
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {level === 'DISTRICT' && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{activeDistrict} Corridor Parcels</h4>
                  <p className="text-[11px] text-slate-500">{activeState}</p>
                </div>
                <button
                  onClick={() => setLevel('STATE')}
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                >
                  <CornerDownLeft className="w-3 h-3" /> Back to State
                </button>
              </div>

              <div className="space-y-2.5">
                {currentProjects.length > 0 ? (
                  currentProjects.map((p) => {
                    const meta = getRiskMeta(p.riskScore);
                    return (
                      <div
                        key={p.projectId}
                        className="p-3 border border-slate-200 rounded-lg bg-slate-50/50 space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="text-xs font-bold text-slate-900 leading-tight">
                            {p.projectName}
                          </h5>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${meta.bg} ${meta.text}`}>
                            {meta.label}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-600">
                          {p.landArea}
                        </p>

                        <div className="flex items-center justify-between text-[11px] pt-1 text-slate-500 border-t border-slate-200">
                          <span>Delay: <strong className="text-slate-800">{p.estimatedDelay} Days</strong></span>
                          <button
                            onClick={() => onSelectProjectFromMap(p)}
                            className="inline-flex items-center gap-1 text-blue-700 font-bold hover:underline"
                          >
                            <span>Inspect</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-6 text-center text-xs text-slate-500 border border-dashed rounded-lg">
                    No active monitored parcels found for this district selection.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}