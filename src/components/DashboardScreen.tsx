/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SurgicalUnit, ClinicalAlert, StaffProfile } from '../types';

interface DashboardScreenProps {
  units: SurgicalUnit[];
  setScreen: (screen: any) => void;
  onNewClinicalEntry: () => void;
  alerts: ClinicalAlert[];
  onAcknowledgeAlert: (id: string) => void;
  onAssignTeam: (unitId: string) => void;
}

export default function DashboardScreen({
  units,
  setScreen,
  onNewClinicalEntry,
  alerts,
  onAcknowledgeAlert,
  onAssignTeam
}: DashboardScreenProps) {
  const [hoveredChartBar, setHoveredChartBar] = useState<string | null>(null);
  const [vitalsOscillate, setVitalsOscillate] = useState(98.4);
  const [reorderedItems, setReorderedItems] = useState<string[]>([]);

  // Oscillate vitals slightly for live feel
  React.useEffect(() => {
    const interval = setInterval(() => {
      setVitalsOscillate((prev) => {
        const change = (Math.random() * 0.4 - 0.2);
        return parseFloat(Math.min(Math.max(prev + change, 97.8), 99.1).toFixed(1));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleReorder = (alertId: string) => {
    setReorderedItems(prev => [...prev, alertId]);
    alert("Supply Reordered Successfully: Ordered 10x Suture Kits for OR-01.");
  };

  // Find OR-01 and OR-02 specifically for display as in the mockup
  const or01 = units.find(u => u.unitId === "OR-01") || units[0];
  const or02 = units.find(u => u.unitId === "OR-02") || units[2];

  // Format today's date
  const today = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', dateOptions);

  return (
    <div className="space-y-6">
      
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{formattedDate}</p>
          <h2 className="text-2xl font-bold text-[#191c1d]">Dashboard Overview</h2>
        </div>
        <button 
          onClick={onNewClinicalEntry}
          className="bg-[#06b6d4] text-white hover:bg-[#00687a] px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-cyan-100 cursor-pointer"
        >
          <span className="material-symbols-outlined font-bold text-[18px]">add</span>
          New Clinical Entry
        </button>
      </div>

      {/* Bento Grid - Global Vitals, Active Units & Load */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Card: Global Vitals */}
        <div className="col-span-12 md:col-span-4 bg-white border border-[#bcc9cd]/40 p-5 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[#3d494c] uppercase tracking-wider">Global Vitals Score</span>
              <span className="material-symbols-outlined text-[#06b6d4] filled-icon" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            </div>
            <div className="text-3xl font-extrabold text-[#00687a] transition-all duration-500">{vitalsOscillate}%</div>
            <div className="flex items-center gap-1 mt-1 text-emerald-600 font-bold text-xs">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span>+1.2% from last shift</span>
            </div>
          </div>
          
          {/* Sparkline Visual Component */}
          <div className="mt-6 h-16 w-full flex items-end gap-1.5">
            <div className="bg-[#06b6d4]/20 w-full h-[60%] rounded-t-sm transition-all duration-500"></div>
            <div className="bg-[#06b6d4]/20 w-full h-[70%] rounded-t-sm transition-all duration-500"></div>
            <div className="bg-[#06b6d4]/20 w-full h-[65%] rounded-t-sm transition-all duration-500"></div>
            <div className="bg-[#06b6d4]/20 w-full h-[80%] rounded-t-sm transition-all duration-500"></div>
            <div className="bg-[#06b6d4]/40 w-full h-[75%] rounded-t-sm transition-all duration-500"></div>
            <div className="bg-[#06b6d4] w-full h-[95%] rounded-t-sm transition-all duration-500"></div>
          </div>
        </div>

        {/* Card: Active Units */}
        <div className="col-span-12 md:col-span-4 bg-white border border-[#bcc9cd]/40 p-5 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[#3d494c] uppercase tracking-wider">Active Units</span>
              <span className="material-symbols-outlined text-[#565e74]">clinical_notes</span>
            </div>
            <div className="text-3xl font-bold text-[#191c1d]">14/20</div>
            <div className="text-xs text-[#3d494c] font-semibold opacity-75 mt-1">6 units in maintenance</div>
          </div>
          
          {/* Multi-unit indicator pills */}
          <div className="mt-6 grid grid-cols-10 gap-1.5">
            {[...Array(10)].map((_, i) => (
              <div 
                key={i} 
                className={`h-2 rounded-full ${
                  i < 7 ? 'bg-[#06b6d4]' : 'bg-[#bcc9cd]/30'
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Card: Load Probability Chart */}
        <div className="col-span-12 md:col-span-4 bg-white border border-[#bcc9cd]/40 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs font-bold text-[#3d494c] uppercase tracking-wider">Load Probability</span>
            <span className="material-symbols-outlined text-[#3d494c] text-lg">bar_chart</span>
          </div>
          
          <div className="flex items-end justify-between h-24 gap-4 relative">
            
            {/* AM */}
            <div 
              onMouseEnter={() => setHoveredChartBar('AM')} 
              onMouseLeave={() => setHoveredChartBar(null)}
              className="flex flex-col items-center gap-2 flex-1 group cursor-pointer"
            >
              <div className="w-full bg-[#e6e8e9] h-20 rounded-t-md relative overflow-hidden">
                <div className="absolute bottom-0 w-full bg-[#9ea6bf]/50 h-[45%] transition-all group-hover:bg-[#9ea6bf]"></div>
              </div>
              <span className="text-[10px] font-bold text-slate-500">AM</span>
            </div>

            {/* NOON */}
            <div 
              onMouseEnter={() => setHoveredChartBar('NOON')} 
              onMouseLeave={() => setHoveredChartBar(null)}
              className="flex flex-col items-center gap-2 flex-1 group cursor-pointer"
            >
              <div className="w-full bg-[#e6e8e9] h-20 rounded-t-md relative overflow-hidden">
                <div className="absolute bottom-0 w-full bg-[#06b6d4]/80 h-[85%] transition-all group-hover:bg-[#06b6d4]"></div>
              </div>
              <span className="text-[10px] font-bold text-slate-500">NOON</span>
            </div>

            {/* PM */}
            <div 
              onMouseEnter={() => setHoveredChartBar('PM')} 
              onMouseLeave={() => setHoveredChartBar(null)}
              className="flex flex-col items-center gap-2 flex-1 group cursor-pointer"
            >
              <div className="w-full bg-[#e6e8e9] h-20 rounded-t-md relative overflow-hidden">
                <div className="absolute bottom-0 w-full bg-[#9ea6bf]/50 h-[65%] transition-all group-hover:bg-[#9ea6bf]"></div>
              </div>
              <span className="text-[10px] font-bold text-slate-500">PM</span>
            </div>

            {/* NIGHT */}
            <div 
              onMouseEnter={() => setHoveredChartBar('NIGHT')} 
              onMouseLeave={() => setHoveredChartBar(null)}
              className="flex flex-col items-center gap-2 flex-1 group cursor-pointer"
            >
              <div className="w-full bg-[#e6e8e9] h-20 rounded-t-md relative overflow-hidden">
                <div className="absolute bottom-0 w-full bg-[#9ea6bf]/50 h-[30%] transition-all group-hover:bg-[#9ea6bf]"></div>
              </div>
              <span className="text-[10px] font-bold text-slate-500">NIGHT</span>
            </div>

            {/* Hover Tooltip inside load card */}
            {hoveredChartBar && (
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-0.5 rounded shadow-lg pointer-events-none z-10 font-medium">
                {hoveredChartBar}: {hoveredChartBar === 'NOON' ? '88% Peak Load' : hoveredChartBar === 'PM' ? '65% Load' : hoveredChartBar === 'AM' ? '45% Load' : '30% Load'}
              </div>
            )}

          </div>
        </div>

      </div>

      {/* Surgical Units Summary */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-bold text-[#191c1d]">Surgical Units Summary</h3>
          <button 
            onClick={() => setScreen('surgical_units')}
            className="text-[#00687a] font-semibold text-xs hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            View All Units
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* OR-01 Card */}
          {or01 && (
            <div className="bg-white border border-[#bcc9cd]/40 rounded-2xl p-5 hover:border-[#06b6d4]/50 hover:shadow-md transition-all duration-300 relative group cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#f2f4f5] rounded-xl flex items-center justify-center text-[#00687a]">
                    <span className="material-symbols-outlined text-2xl">door_front</span>
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#191c1d]">OR-01</div>
                    <div className="text-xs text-[#3d494c] font-medium opacity-85">General Surgery</div>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-100 rounded-full font-bold text-[10px] uppercase">
                  Occupied
                </span>
              </div>

              <div className="space-y-2.5 mb-4 text-xs font-semibold">
                <div className="flex justify-between">
                  <span className="text-[#3d494c] opacity-80">Patient ID:</span>
                  <span className="text-[#191c1d]">{or01.patientId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#3d494c] opacity-80">Procedure:</span>
                  <span className="text-[#191c1d]">{or01.currentProcedure}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#3d494c] opacity-80">Duration:</span>
                  <span className="text-[#191c1d] font-mono">{or01.duration}</span>
                </div>
              </div>

              <div className="border-t border-[#bcc9cd]/30 pt-4 flex gap-2 items-center">
                <img 
                  className="w-8 h-8 rounded-full object-cover border border-slate-100 shadow-sm" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuASY29FVOWFDVf4gIkuKf6sUs3WnmT40lKAZ7dqs3k1Y-lIzkhc-lWxOMjHFc2q9imEgGc0xLPw4JiHBNurxRD7BzLVDpHpPd3Eextb7czwOf32qFJVNPFUffyPC6v47fqwv_wRv9xEoWZn_qQ_ZXECEyokdAh5iS3G9GATSrH2HN8ibE0dVEHGHHgoh4YTeDHQQtEN3a7Pbr_7r97tDNYLjCa8eQ2UKUmVprk47ua279cwCigD0CZXq8YaTY3CN1r7uTyOnJb5qEs" 
                  alt="Surgeon" 
                  referrerPolicy="no-referrer"
                />
                <img 
                  className="w-8 h-8 rounded-full object-cover border border-slate-100 shadow-sm" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCighteUspG4Y5JYq9g0NNv7ysLOysCb7wRd2f4HJRE7iejycE8NIRHgFqtybTC85UvlPEvBMNECyUdFtIjtOdg-zdzEqJIwCB3zl1fMXD-y2UHUB6oaF5lzE5-r3yUSByK6gYExgPMob7XHxFXo9w2X5qm3EOEXbb8PvEjR8TOukrdhbYUIPKXJWMoy9zbdaydykTlunKhflAEAgO2yTW3fDraayf5M9UuMkSpytetJr-2qboJnohZXZl4vbT01zZmn-d2RDHnMXA" 
                  alt="Anesthesiologist" 
                  referrerPolicy="no-referrer"
                />
                <div className="w-8 h-8 rounded-full bg-[#f2f4f5] border border-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                  +2
                </div>
                <span className="text-[10px] text-slate-400 font-bold ml-auto group-hover:text-[#00687a] transition-colors">ACTIVE CASE</span>
              </div>
            </div>
          )}

          {/* OR-02 Card */}
          {or02 && (
            <div className="bg-white border border-[#bcc9cd]/40 rounded-2xl p-5 hover:border-[#06b6d4]/50 hover:shadow-md transition-all duration-300 relative flex flex-col justify-between cursor-pointer">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#f2f4f5] rounded-xl flex items-center justify-center text-[#00687a]">
                      <span className="material-symbols-outlined text-2xl">door_front</span>
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#191c1d]">OR-02</div>
                      <div className="text-xs text-[#3d494c] font-medium opacity-85">Cardiovascular</div>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 border border-slate-200 rounded-full font-bold text-[10px] uppercase">
                    Ready
                  </span>
                </div>

                <div className="space-y-2.5 mb-4 text-xs font-semibold opacity-75">
                  <div className="flex justify-between">
                    <span className="text-[#3d494c] opacity-80">Next Procedure:</span>
                    <span className="text-[#191c1d]">{or02.nextProcedure}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#3d494c] opacity-80">Scheduled:</span>
                    <span className="text-[#191c1d]">{or02.scheduledTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#3d494c] opacity-80">Status:</span>
                    <span className="text-emerald-700 font-bold">Sterilized &amp; Verified</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#bcc9cd]/30 pt-4">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onAssignTeam("OR-02");
                  }}
                  className="w-full py-2 border border-[#bcc9cd] hover:border-[#00687a] hover:bg-[#00687a]/5 text-slate-800 hover:text-[#00687a] rounded-xl text-xs font-bold transition-colors cursor-pointer text-center"
                >
                  Assign Team
                </button>
              </div>
            </div>
          )}

          {/* OR-03 Card (Maintenance) */}
          <div className="bg-[#f2f4f5]/60 border border-dashed border-[#bcc9cd] rounded-2xl p-5 flex flex-col items-center justify-center text-center opacity-80">
            <span className="material-symbols-outlined text-4xl mb-3 text-slate-400">build</span>
            <div className="font-bold text-sm text-slate-800">OR-03 Maintenance</div>
            <div className="text-xs text-slate-500 font-medium mt-1">System upgrade &amp; recalibration in progress</div>
            
            <div className="w-32 h-1.5 bg-[#e6e8e9] rounded-full mt-4 overflow-hidden relative">
              <div className="absolute bg-[#06b6d4] h-full w-[45%] rounded-full animate-pulse"></div>
            </div>
          </div>

        </div>
      </div>

      {/* Recent Alerts Section & AI Insight */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Alerts Left Side */}
        <div className="col-span-12 lg:col-span-8 bg-white border border-[#bcc9cd]/40 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold text-[#191c1d]">Recent Operational Alerts</h3>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Last 24 Hours</span>
          </div>

          <div className="space-y-4">
            {alerts.map((alertItem) => {
              const isReordered = reorderedItems.includes(alertItem.id);
              return (
                <div 
                  key={alertItem.id}
                  className="flex items-center gap-4 p-3 hover:bg-[#f2f4f5]/60 rounded-xl transition-colors border-b border-slate-100 last:border-0 pb-4"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    alertItem.severity === 'critical' 
                      ? 'bg-red-50 text-red-600' 
                      : 'bg-cyan-50 text-cyan-600'
                  }`}>
                    <span className="material-symbols-outlined font-bold text-lg">
                      {alertItem.severity === 'critical' ? 'priority_high' : 'info'}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-xs text-slate-800">{alertItem.title}</div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5 truncate">{alertItem.detail}</div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="text-[10px] font-bold text-slate-400">{alertItem.timeAgo}</div>
                    {alertItem.actionLabel && (
                      <button 
                        onClick={() => {
                          if (alertItem.actionLabel?.includes("Reorder")) {
                            handleReorder(alertItem.id);
                          } else {
                            alert(`Opening Shift Handover Log terminal...`);
                          }
                        }}
                        disabled={isReordered}
                        className={`text-xs font-bold mt-1.5 underline cursor-pointer block ${
                          isReordered ? 'text-slate-300 no-underline cursor-not-allowed' : 'text-[#00687a] hover:text-[#06b6d4]'
                        }`}
                      >
                        {isReordered ? "Ordered ✓" : alertItem.actionLabel}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Performance Insight Right Side */}
        <div className="col-span-12 lg:col-span-4 bg-[#06b6d4] text-white rounded-2xl p-6 flex flex-col justify-between overflow-hidden relative shadow-md">
          {/* Background mascot icon styling */}
          <div className="absolute top-0 right-0 p-6 opacity-15 transform translate-x-6 -translate-y-6 pointer-events-none">
            <span className="material-symbols-outlined text-[130px]">smart_toy</span>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined font-bold">bolt</span>
              <span className="text-xs font-bold tracking-widest uppercase">AI INSIGHT</span>
            </div>
            <h4 className="text-lg font-bold mb-3 tracking-tight leading-snug">Efficiency Optimized</h4>
            <p className="text-xs font-medium opacity-90 leading-relaxed">
              SafeScript AI has predicted a 15% increase in surgical throughput today based on current team assignments and unit readiness.
            </p>
          </div>

          <div className="relative z-10 mt-6">
            <button 
              onClick={() => alert("Optimal Surgical Routing Plan:\n1. Route trauma to West wing.\n2. Reallocate cardiology team to OR-02.\n3. Accelerate recovery phase in post-op ND-202.")}
              className="w-full bg-white text-[#00424f] hover:bg-slate-50 font-bold text-xs py-3 rounded-xl shadow-md active:scale-95 transition-all cursor-pointer"
            >
              View Optimization Plan
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
