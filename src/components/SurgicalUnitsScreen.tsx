/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SurgicalUnit, UrgentRequest } from '../types';

interface SurgicalUnitsScreenProps {
  units: SurgicalUnit[];
  urgentRequests: UrgentRequest[];
  onDispatchAction: (id: string) => void;
  onScheduleCase: (unitId: string) => void;
  onBroadcastAlert: () => void;
  searchQuery: string;
}

export default function SurgicalUnitsScreen({
  units,
  urgentRequests,
  onDispatchAction,
  onScheduleCase,
  onBroadcastAlert,
  searchQuery
}: SurgicalUnitsScreenProps) {
  const [surgicalUnits, setSurgicalUnits] = useState<SurgicalUnit[]>(units);
  const [dispatchedIds, setDispatchedIds] = useState<string[]>([]);
  const [environmentalStatus, setEnvironmentalStatus] = useState({
    hvac: "Normal",
    sterilization: "Active",
    latency: "2ms"
  });

  // Filter units based on search query
  const filteredUnits = surgicalUnits.filter(u => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      u.id.toLowerCase().includes(query) ||
      u.unitId.toLowerCase().includes(query) ||
      u.specialty?.toLowerCase().includes(query) ||
      u.currentProcedure?.toLowerCase().includes(query) ||
      u.surgeon?.toLowerCase().includes(query)
    );
  });

  // Oscillate progress of surgery units slightly for "live" effect
  useEffect(() => {
    const interval = setInterval(() => {
      setSurgicalUnits((prevUnits) => 
        prevUnits.map((unit) => {
          if (unit.status === 'IN-USE' && unit.progress !== undefined && unit.progress < 100) {
            // Random small increment
            const inc = Math.random() * 0.15;
            const newProgress = parseFloat((unit.progress + inc).toFixed(2));
            return {
              ...unit,
              progress: newProgress >= 100 ? 100 : newProgress
            };
          }
          if (unit.status === 'EMERGENCY' && unit.progress !== undefined && unit.progress < 100) {
            // Random small increment for emergency critical phase
            const inc = Math.random() * 0.08;
            const newProgress = parseFloat((unit.progress + inc).toFixed(2));
            return {
              ...unit,
              progress: newProgress >= 100 ? 100 : newProgress
            };
          }
          return unit;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleDispatch = (id: string, name: string) => {
    setDispatchedIds(prev => [...prev, id]);
    setTimeout(() => {
      onDispatchAction(id);
    }, 500);
    alert(`Resource Authorized: Dispatched ${name} immediately.`);
  };

  return (
    <div className="flex-1 flex overflow-hidden -m-6 h-[calc(100vh-4rem)]">
      
      {/* Grid Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">OR Status Command Center</h2>
            <p className="text-xs text-slate-500 font-medium">Real-time surgical unit monitoring across East and West wings.</p>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#bcc9cd]/40 rounded-lg shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
              <span className="text-xs font-bold text-slate-700">2 Emergency</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#bcc9cd]/40 rounded-lg shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00687a]"></span>
              <span className="text-xs font-bold text-slate-700">14 In-Use</span>
            </div>
          </div>
        </div>

        {/* Bento Grid for OR Units */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          
          {filteredUnits.map((unit) => {
            if (unit.unitId === "OR-01" || unit.unitId === "OR-02") {
              // Standard dashboard duplicate, skip or let render? 
              // Wait, the mockup displays 6 specific OR cards: 
              // OR-East Alpha, OR-West Beta, OR-East Gamma, OR-North Delta, OR-South Epsilon, OR-Central Zeta.
              // Let's filter to keep the grid pristine as shown in screenshot 1!
              if (unit.id === "OR-01" || unit.id === "OR-02") return null;
            }

            const isEmergency = unit.status === "EMERGENCY";
            const isAvailable = unit.status === "AVAILABLE";

            return (
              <div 
                key={unit.id}
                className={`bg-white p-5 rounded-2xl relative overflow-hidden transition-all duration-300 ${
                  isEmergency 
                    ? 'border-2 border-red-600 or-card-pulse' 
                    : isAvailable 
                      ? 'border border-[#bcc9cd]/40 opacity-80 hover:opacity-100 hover:border-[#06b6d4]/40' 
                      : 'border border-[#bcc9cd]/40 hover:border-[#06b6d4]/50'
                }`}
              >
                {/* Card Title area */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-tight">{unit.id}</h3>
                    <p className="text-[10px] font-bold text-slate-400 mt-0.5">Unit ID: {unit.unitId}</p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded font-bold text-[10px] uppercase tracking-wider ${
                    isEmergency 
                      ? 'bg-red-600 text-white animate-pulse' 
                      : isAvailable 
                        ? 'bg-[#eceeef] text-slate-600' 
                        : 'bg-cyan-50 text-[#00424f] border border-cyan-100'
                  }`}>
                    {unit.status}
                  </span>
                </div>

                {/* Content details based on status */}
                {isAvailable ? (
                  <div className="flex flex-col items-center justify-center py-6 border-2 border-dashed border-[#bcc9cd]/40 rounded-xl bg-slate-50/50">
                    <span className="material-symbols-outlined text-3xl text-slate-400 mb-2">cleaning_services</span>
                    <p className="text-xs font-bold text-slate-600">Sanitization Complete</p>
                    <button 
                      onClick={() => onScheduleCase(unit.id)}
                      className="mt-3.5 px-4 py-1.5 bg-[#00687a] hover:bg-[#06b6d4] text-white text-xs font-bold rounded-lg shadow transition-colors cursor-pointer"
                    >
                      Schedule Case
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className={`p-3 rounded-xl ${isEmergency ? 'bg-red-50/50' : 'bg-slate-50'}`}>
                      <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${isEmergency ? 'text-red-700' : 'text-slate-400'}`}>
                        {isEmergency ? 'Active Trauma' : 'Current Procedure'}
                      </p>
                      <p className="text-xs font-bold text-slate-800 leading-tight">{unit.currentProcedure}</p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        {unit.surgeonAvatar ? (
                          <img 
                            className="w-5 h-5 rounded-full object-cover border border-slate-200" 
                            src={unit.surgeonAvatar} 
                            alt={unit.surgeon}
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white font-semibold ${
                            isEmergency ? 'bg-red-600' : 'bg-slate-400'
                          }`}>
                            <span className="material-symbols-outlined text-[12px] text-white filled-icon">person</span>
                          </div>
                        )}
                        <p className="text-[11px] font-bold text-slate-600">{unit.surgeon}</p>
                      </div>
                    </div>

                    {/* Progress area */}
                    {unit.progress !== undefined && (
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                          <span className={isEmergency ? 'text-red-600 font-bold' : ''}>
                            {isEmergency ? 'Critical Phase' : 'Progress'}
                          </span>
                          <span className="font-mono font-bold text-slate-800">{unit.progress}%</span>
                        </div>
                        <div className={`h-2 w-full rounded-full overflow-hidden ${isEmergency ? 'bg-red-100' : 'bg-slate-100'}`}>
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${isEmergency ? 'bg-red-600' : 'bg-[#06b6d4]'}`} 
                            style={{ width: `${unit.progress}%` }}
                          ></div>
                        </div>
                        <p className={`text-[10px] font-bold ${isEmergency ? 'text-red-600' : 'text-slate-400'}`}>
                          {isEmergency ? unit.criticalSupportText : `Est. Completion: ${unit.estCompletion} (${unit.timeRemainingText})`}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

        </div>
      </div>

      {/* Urgent Resource Requests Sidebar */}
      <aside className="w-80 border-l border-[#bcc9cd]/40 bg-[#f2f4f5]/60 flex flex-col h-full flex-shrink-0 z-10">
        
        <div className="p-4 border-b border-[#bcc9cd]/30 bg-white/50 backdrop-blur-sm">
          <h3 className="text-sm font-bold flex items-center gap-2 text-slate-800">
            <span className="material-symbols-outlined text-red-600 filled-icon" style={{ fontVariationSettings: "'FILL' 1" }}>priority_high</span>
            Urgent Requests
          </h3>
        </div>

        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          
          {urgentRequests.map((req) => {
            const isDispatched = dispatchedIds.includes(req.id);
            return (
              <div 
                key={req.id}
                className={`p-4 bg-white border-l-4 rounded-xl shadow-sm transition-all duration-500 ${
                  isDispatched 
                    ? 'translate-x-full opacity-0 pointer-events-none' 
                    : req.severity === 'critical' 
                      ? 'border-red-600' 
                      : 'border-[#06b6d4]'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    req.severity === 'critical' ? 'text-red-600' : 'text-[#00687a]'
                  }`}>
                    {req.type}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400">{req.timeAgo}</span>
                </div>
                <p className="text-xs font-extrabold text-slate-800">{req.title}</p>
                <p className="text-[10px] text-slate-500 font-semibold mt-1">{req.detail}</p>
                
                <div className="mt-3.5 flex gap-2">
                  <button 
                    onClick={() => handleDispatch(req.id, req.title)}
                    className="flex-grow py-1.5 bg-[#00687a] hover:bg-[#06b6d4] text-white text-[10px] font-bold rounded-lg shadow-sm transition-all cursor-pointer"
                  >
                    {req.actionLabel}
                  </button>
                  <button 
                    onClick={() => alert(`Details:\nType: ${req.type}\nItem: ${req.title}\nDetail: ${req.detail}\nTime Logged: ${req.timeAgo}`)}
                    className="px-2 py-1.5 border border-[#bcc9cd] hover:bg-slate-50 text-slate-600 hover:text-slate-800 text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    VIEW
                  </button>
                </div>
              </div>
            );
          })}

          {urgentRequests.length === 0 && (
            <div className="text-center py-8 bg-white border border-dashed border-[#bcc9cd]/40 rounded-xl p-4">
              <span className="material-symbols-outlined text-slate-400 text-3xl mb-2">verified</span>
              <p className="text-xs font-bold text-slate-600">All Requests Fulfilled</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Surgical units are fully provisioned.</p>
            </div>
          )}

          {/* System Health Environmental Monitoring */}
          <div className="p-4 bg-white border border-[#bcc9cd]/40 rounded-2xl shadow-sm">
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-3">Unit Environmental Monitoring</p>
            
            <div className="space-y-3 text-xs font-semibold text-slate-700">
              <div className="flex justify-between items-center">
                <span>Main HVAC Delta</span>
                <span className="text-[#00687a] font-bold">{environmentalStatus.hvac}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Sterilization Loop</span>
                <span className="text-[#00687a] font-bold">{environmentalStatus.sterilization}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Network Latency</span>
                <span className="text-[#00687a] font-bold">{environmentalStatus.latency}</span>
              </div>
            </div>

            {/* Simulated Pulse wave bars at footer */}
            <div className="mt-4 h-24 w-full rounded-xl bg-slate-50 border border-slate-100 overflow-hidden relative flex items-center justify-center">
              <div className="flex gap-1 items-end h-12">
                <div className="w-1 bg-[#06b6d4]/30 rounded-full h-6 animate-pulse"></div>
                <div className="w-1 bg-[#06b6d4]/50 rounded-full h-10 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1 bg-[#06b6d4] rounded-full h-14 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1 bg-[#06b6d4]/50 rounded-full h-8 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                <div className="w-1 bg-[#06b6d4]/30 rounded-full h-5 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Broadcast Action */}
        <div className="p-4 bg-white border-t border-[#bcc9cd]/30 flex flex-col justify-end">
          <button 
            onClick={onBroadcastAlert}
            className="w-full py-3 bg-[#515f74] hover:bg-[#3d494c] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">broadcast_on_home</span>
            Broadcast Alert
          </button>
        </div>

      </aside>

    </div>
  );
}
