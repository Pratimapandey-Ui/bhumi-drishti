import React, { useState } from 'react';
import { CheckCircle2, Clock, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export default function RecommendedActions({ actions = [], onTriggerToast }) {
  const [actionList, setActionList] = useState(actions);

  // Sync if project changes
  React.useEffect(() => {
    setActionList(actions);
  }, [actions]);

  const handleInitiate = (id, title) => {
    setActionList(prev => prev.map(a => {
      if (a.id === id) {
        return { ...a, status: 'Initiated' };
      }
      return a;
    }));
    
    if (onTriggerToast) {
      onTriggerToast(`Mitigation Initiated: "${title}" sent to relevant administrative desk.`);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Recommended Mitigation Directives
          </h3>
          <p className="text-xs text-slate-500">
            Prescriptive actionable roadmap generated to arrest projected delay days
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          Automated Decision Matrix
        </span>
      </div>

      <div className="space-y-3">
        {actionList.map((action) => {
          const isDone = action.status === 'Initiated';

          return (
            <div 
              key={action.id}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                isDone 
                  ? 'bg-slate-50/70 border-slate-200' 
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    action.priority === 1 ? 'bg-rose-100 text-rose-700' :
                    action.priority === 2 ? 'bg-orange-100 text-orange-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {action.priority}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className={`text-xs font-bold ${isDone ? 'text-slate-600 line-through' : 'text-slate-900'}`}>
                        {action.title}
                      </h4>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        action.impact === 'High' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        Impact: {action.impact}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {action.desc}
                    </p>

                    <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500 font-medium">
                      <span className="text-slate-600">Department:</span>
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {action.targetDept}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status / Button */}
                <div className="shrink-0 flex items-center sm:self-center pl-9 sm:pl-0">
                  {isDone ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
                      <Check className="w-3.5 h-3.5" />
                      Initiated
                    </span>
                  ) : (
                    <button
                      onClick={() => handleInitiate(action.id, action.title)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-200 hover:border-transparent px-3 py-1.5 rounded-lg transition-all duration-150"
                    >
                      <span>Mark as Initiated</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}