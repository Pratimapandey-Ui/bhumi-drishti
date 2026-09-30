import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown, ChevronRight, Download, RefreshCw } from 'lucide-react';
import { MOCK_PROJECTS, getRiskMeta } from '../data/mockData';

export default function ProjectTable({ onSelectProject }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedRisk, setSelectedRisk] = useState('ALL');
  const [sortField, setSortField] = useState('riskScore');
  const [sortAsc, setSortAsc] = useState(false);

  const filteredProjects = useMemo(() => {
    return MOCK_PROJECTS.filter(p => {
      const matchSearch = p.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.landArea.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.district.toLowerCase().includes(searchTerm.toLowerCase());
      const matchState = selectedState === 'ALL' || p.state === selectedState;
      const meta = getRiskMeta(p.riskScore);
      const matchRisk = selectedRisk === 'ALL' || meta.label === selectedRisk;
      return matchSearch && matchState && matchRisk;
    }).sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      return sortAsc ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
    });
  }, [searchTerm, selectedState, selectedRisk, sortField, sortAsc]);

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const handleExportCSV = () => {
    const headers = ["Project ID,Project Name,State,District,Stage,Risk Score,Estimated Delay"];
    const rows = filteredProjects.map(p => 
      `"${p.projectId}","${p.projectName}","${p.state}","${p.district}","${p.acquisitionStage}",${p.riskScore},${p.estimatedDelay}`
    );
    const blob = new Blob([[...headers, ...rows].join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Bhumi_Drishti_Projects_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Controls Header */}
      <div className="p-4 border-b border-slate-200 bg-white space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Active Acquisition Corridor Registry
            </h3>
            <p className="text-xs text-slate-500">
              Showing {filteredProjects.length} monitored infrastructure land parcels
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedState('ALL'); setSelectedRisk('ALL'); }}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
              title="Reset Filters"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2.5 pt-1">
          {/* Search Box */}
          <div className="relative md:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by project name, parcel or district..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 pl-9 pr-3 py-2 text-xs rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
            />
          </div>

          {/* State Filter */}
          <div>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-700 py-2 px-3 text-xs rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="ALL">All States</option>
              <option value="Haryana">Haryana</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Karnataka">Karnataka</option>
            </select>
          </div>

          {/* Risk Level Filter */}
          <div>
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-700 py-2 px-3 text-xs rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="ALL">All Risk Levels</option>
              <option value="LOW">Low (0–30)</option>
              <option value="MEDIUM">Medium (31–60)</option>
              <option value="HIGH">High (61–80)</option>
              <option value="CRITICAL">Critical (81–100)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Element */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50/80 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Project & Area Corridor</th>
              <th className="py-3 px-4">State & District</th>
              <th className="py-3 px-4">Acquisition Stage</th>
              <th 
                className="py-3 px-4 cursor-pointer hover:text-slate-800"
                onClick={() => toggleSort('riskScore')}
              >
                <div className="flex items-center gap-1">
                  <span>Risk Score</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th 
                className="py-3 px-4 cursor-pointer hover:text-slate-800"
                onClick={() => toggleSort('estimatedDelay')}
              >
                <div className="flex items-center gap-1">
                  <span>Predicted Delay</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((p) => {
                const meta = getRiskMeta(p.riskScore);
                return (
                  <tr 
                    key={p.projectId} 
                    className="hover:bg-slate-50/80 transition-colors duration-150 group"
                  >
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-bold text-slate-900 group-hover:text-blue-700 block text-xs">
                          {p.projectName}
                        </span>
                        <span className="text-[11px] text-slate-500 block mt-0.5">
                          {p.landArea}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">
                      {p.district}, <span className="text-slate-500">{p.state}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium inline-block">
                        {p.acquisitionStage}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${meta.bg} ${meta.text} border ${meta.border}`}>
                          {p.riskScore} • {meta.label}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900">
                        {p.estimatedDelay} Days
                      </span>
                      <span className="text-[10px] text-slate-400 block font-normal">
                        ({p.delayRange})
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onSelectProject(p)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded transition"
                      >
                        <span>Analyze</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-8 text-slate-400 text-xs">
                  No land acquisition projects matched your filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}