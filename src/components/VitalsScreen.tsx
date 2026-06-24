/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { LabResult, Medication } from '../types';

interface VitalsScreenProps {
  labResults: LabResult[];
  medications: Medication[];
  onDispatchTeam: () => void;
}

export default function VitalsScreen({
  labResults,
  medications,
  onDispatchTeam
}: VitalsScreenProps) {
  const [heartRate, setHeartRate] = useState(118);
  const [spO2, setSpO2] = useState(98);
  const [bloodPressure, setBloodPressure] = useState("128/82");
  const [alertActive, setAlertActive] = useState(true);
  const [selectedLab, setSelectedLab] = useState<LabResult | null>(null);

  // Oscillate Vitals slightly for live telemetry effect
  useEffect(() => {
    const hrInterval = setInterval(() => {
      setHeartRate((prev) => {
        const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, or +1
        return Math.min(Math.max(prev + delta, 115), 122);
      });
    }, 2000);

    const spO2Interval = setInterval(() => {
      setSpO2((prev) => {
        const roll = Math.random();
        if (roll < 0.15 && prev > 96) return prev - 1;
        if (roll > 0.85 && prev < 100) return prev + 1;
        return prev;
      });
    }, 6000);

    const bpInterval = setInterval(() => {
      setBloodPressure((prev) => {
        const parts = prev.split('/').map(Number);
        const sysDelta = Math.floor(Math.random() * 3) - 1;
        const diaDelta = Math.floor(Math.random() * 3) - 1;
        const sys = Math.min(Math.max(parts[0] + sysDelta, 125), 131);
        const dia = Math.min(Math.max(parts[1] + diaDelta, 79), 84);
        return `${sys}/${dia}`;
      });
    }, 5000);

    return () => {
      clearInterval(hrInterval);
      clearInterval(spO2Interval);
      clearInterval(bpInterval);
    };
  }, []);

  const handleAcknowledgeAlert = () => {
    setAlertActive(false);
    alert("Alert Acknowledged. Telemetry status flagged as reviewed.");
  };

  const handleResetAlert = () => {
    setAlertActive(true);
  };

  return (
    <div className="space-y-6">
      
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1 text-slate-500 font-semibold text-[11px] uppercase tracking-wider">
          <span>Clinical Overview</span>
          <span className="material-symbols-outlined text-[12px] text-slate-400 font-bold">chevron_right</span>
          <span className="text-[#00687a]">Vitals Monitor</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <h2 className="text-2xl font-bold text-[#191c1d]">Patient Vitals: Room 402B</h2>
          <div className="flex gap-2 flex-wrap">
            <button 
              onClick={() => alert("Retrieving comprehensive multi-day clinical history files...")}
              className="flex items-center gap-2 px-4 py-2 border border-[#bcc9cd] hover:bg-[#f2f4f5] text-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">history</span>
              Full History
            </button>
            <button 
              onClick={onDispatchTeam}
              className="flex items-center gap-2 px-4 py-2 bg-[#06b6d4] hover:bg-[#00687a] text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">emergency_share</span>
              Dispatch Team
            </button>
          </div>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Main ECG Card */}
        <div className="col-span-12 lg:col-span-8 bg-white border border-[#bcc9cd]/40 rounded-2xl overflow-hidden flex flex-col h-[500px] shadow-sm relative group">
          
          <div className="p-4 border-b border-[#bcc9cd]/30 flex justify-between items-center bg-[#f2f4f5]/30">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#06b6d4] filled-icon" style={{ fontVariationSettings: "'FILL' 1" }}>monitor_heart</span>
              <h3 className="font-bold text-sm text-slate-800">Real-time Telemetry</h3>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#06b6d4]"></span>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Lead II</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#565e74]"></span>
                <span className="text-[10px] font-bold text-slate-500 uppercase">25mm/s</span>
              </div>
            </div>
          </div>

          {/* ECG Animated Mesh Area */}
          <div className="flex-grow relative ecg-grid overflow-hidden bg-slate-50 flex items-center justify-center">
            
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 300">
              {/* Grid guide */}
              <defs>
                <linearGradient id="waveGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              
              {/* Static Background Wave */}
              <path 
                d="M0 150 L100 150 L110 135 L120 165 L130 150 L180 150 L190 90 L200 210 L210 150 L250 150 L260 140 L270 160 L280 150 L350 150 L360 135 L370 165 L380 150 L430 150 L440 90 L450 210 L460 150 L500 150 L510 140 L520 160 L530 150 L600 150 L610 135 L620 165 L630 150 L680 150 L690 90 L700 210 L710 150 L750 150 L760 140 L770 160 L780 150 L850 150 L860 135 L870 165 L880 150 L930 150 L940 90 L950 210 L960 150 L1000 150" 
                fill="none" 
                stroke="#e2e8f0" 
                strokeWidth="1.5"
              />
              
              {/* Scanning Active wave */}
              <path 
                d="M0 150 L100 150 L110 135 L120 165 L130 150 L180 150 L190 90 L200 210 L210 150 L250 150 L260 140 L270 160 L280 150 L350 150 L360 135 L370 165 L380 150 L430 150 L440 90 L450 210 L460 150 L500 150 L510 140 L520 160 L530 150 L600 150 L610 135 L620 165 L630 150 L680 150 L690 90 L700 210 L710 150 L750 150 L760 140 L770 160 L780 150 L850 150 L860 135 L870 165 L880 150 L930 150 L940 90 L950 210 L960 150 L1000 150" 
                fill="none" 
                stroke="#06b6d4" 
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="300, 700"
                className="animate-[dash_5s_linear_infinite]"
                style={{
                  strokeDashoffset: -200,
                  animation: 'dash 5s linear infinite'
                }}
              />
            </svg>
            
            <style>{`
              @keyframes dash {
                to {
                  stroke-dashoffset: -1000;
                }
              }
            `}</style>

            {/* Sweep vertical laser line */}
            <div className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent pointer-events-none animate-[sweep_3s_linear_infinite]"></div>
            <style>{`
              @keyframes sweep {
                0% { transform: translateX(-150px); }
                100% { transform: translateX(950px); }
              }
            `}</style>
          </div>

          {/* Vitals stats footer */}
          <div className="p-4 grid grid-cols-3 gap-4 bg-slate-50/50 border-t border-[#bcc9cd]/20">
            
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Heart Rate</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#06b6d4]">{heartRate}</span>
                <span className="text-xs font-bold text-slate-500">BPM</span>
                <span className="material-symbols-outlined text-red-600 font-bold animate-pulse text-lg">trending_up</span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Oxygen (SpO2)</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-800">{spO2}</span>
                <span className="text-xs font-bold text-slate-500">%</span>
                <span className="material-symbols-outlined text-[#06b6d4] font-bold text-lg">check_circle</span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Blood Pressure</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-800">{bloodPressure}</span>
                <span className="text-xs font-bold text-slate-500">mmHg</span>
                <span className="material-symbols-outlined text-slate-400 font-bold text-lg">horizontal_rule</span>
              </div>
            </div>

          </div>

        </div>

        {/* Sidebar Alerts & Ancillary Vitals Panel */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          
          {/* Active Alerts Panel */}
          <div className={`border rounded-2xl flex flex-col overflow-hidden shadow-sm transition-all ${
            alertActive 
              ? 'border-red-200 bg-white' 
              : 'border-slate-200 bg-[#f2f4f5]/40 opacity-70'
          }`}>
            <div className={`p-4 border-b flex items-center justify-between ${
              alertActive ? 'bg-red-50/50 border-red-200' : 'bg-slate-100 border-slate-200'
            }`}>
              <div className="flex items-center gap-2">
                <span className={`material-symbols-outlined font-bold ${alertActive ? 'text-red-600 animate-bounce' : 'text-slate-400'}`}>
                  {alertActive ? 'warning' : 'check_circle'}
                </span>
                <h3 className={`text-xs font-bold ${alertActive ? 'text-red-950' : 'text-slate-600'}`}>
                  {alertActive ? 'Critical Alerts (1)' : 'No Active Alerts'}
                </h3>
              </div>
              {alertActive && (
                <span className="text-[9px] font-bold px-2 py-0.5 bg-red-600 text-white rounded-full uppercase tracking-wider">Level 1</span>
              )}
            </div>

            <div className="p-4 flex flex-col gap-4">
              {alertActive ? (
                <>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-xs font-bold text-red-600">Tachycardia Warning</p>
                      <span className="text-[10px] font-bold text-slate-400">2 mins ago</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      Sudden heart rate elevation detected ({heartRate} BPM). Patient history indicates pre-existing arrhythmia risk. Immediate review required.
                    </p>
                  </div>
                  <div className="flex gap-2.5">
                    <button 
                      onClick={handleAcknowledgeAlert}
                      className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Acknowledge
                    </button>
                    <button 
                      onClick={() => alert("Retrieving EHR clinical record: Patient John Doe, Male 48y, History of Atrial Fibrillation.")}
                      className="flex-1 py-2 border border-[#bcc9cd] hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Case Details
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-xs text-slate-500 font-semibold">All vitals are running stable.</p>
                  <button 
                    onClick={handleResetAlert}
                    className="text-xs font-bold text-[#00687a] underline mt-2 cursor-pointer"
                  >
                    Simulate Next Warning
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Ancillary Vitals Card */}
          <div className="bg-white border border-[#bcc9cd]/40 rounded-2xl flex flex-col shadow-sm">
            <div className="p-4 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Ancillary Vitals</h3>
            </div>
            <div className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
              
              <div className="p-4 flex justify-between items-center hover:bg-slate-50/50">
                <div className="flex items-center gap-3 text-slate-500">
                  <span className="material-symbols-outlined text-lg">thermostat</span>
                  <span>Temperature</span>
                </div>
                <span className="font-extrabold text-slate-800">37.2°C</span>
              </div>

              <div className="p-4 flex justify-between items-center hover:bg-slate-50/50">
                <div className="flex items-center gap-3 text-slate-500">
                  <span className="material-symbols-outlined text-lg animate-pulse">air</span>
                  <span>Resp. Rate</span>
                </div>
                <span className="font-extrabold text-slate-800">18 br/min</span>
              </div>

              <div className="p-4 flex justify-between items-center hover:bg-slate-50/50">
                <div className="flex items-center gap-3 text-slate-500">
                  <span className="material-symbols-outlined text-lg">opacity</span>
                  <span>Fluid Output</span>
                </div>
                <span className="font-extrabold text-slate-800">350 ml/hr</span>
              </div>

            </div>
          </div>

          {/* AI Predictive Insight Card */}
          <div className="bg-[#f2f4f5] border border-[#bcc9cd]/40 rounded-2xl p-4 flex flex-col gap-2 shadow-sm">
            <div className="flex items-center gap-1.5 text-[#00687a]">
              <span className="material-symbols-outlined text-lg font-bold">auto_awesome</span>
              <span className="text-[10px] font-bold uppercase tracking-wider">AI Predictive Insight</span>
            </div>
            <p className="text-xs font-semibold text-[#57657a] leading-relaxed">
              SafeScript predicts a <span className="font-extrabold text-[#00687a]">12% increase</span> in blood pressure stability within the next 4 hours based on current medication titration. Monitor potassium levels.
            </p>
          </div>

        </div>

      </div>

      {/* Bottom Row - Lab Results & Medications */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Recent Lab Results */}
        <div className="col-span-12 lg:col-span-6 bg-white border border-[#bcc9cd]/40 rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Recent Lab Results</h3>
            <button 
              onClick={() => alert("Opening Complete Diagnostics & Clinical Pathology Dashboard...")}
              className="text-[#00687a] hover:text-[#06b6d4] font-semibold text-xs cursor-pointer"
            >
              View Full Labs
            </button>
          </div>

          <div className="space-y-3">
            {labResults.map((lab) => (
              <div 
                key={lab.id} 
                onClick={() => setSelectedLab(lab)}
                className="flex items-center justify-between p-3 bg-[#f2f4f5]/60 hover:bg-[#d5e3fc]/30 rounded-xl cursor-pointer transition-all"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800">{lab.testName}</span>
                  <span className="text-[10px] font-bold text-slate-400 mt-0.5">{lab.time}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-sm font-black ${lab.status === 'High' ? 'text-red-600' : 'text-slate-800'}`}>
                    {lab.value}
                  </span>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    lab.status === 'High' 
                      ? 'bg-red-50 text-red-700 border border-red-100 font-extrabold' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {lab.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medication Active Plan */}
        <div className="col-span-12 lg:col-span-6 bg-white border border-[#bcc9cd]/40 rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Active Medication Plan</h3>
            <span className="material-symbols-outlined text-slate-400">pill</span>
          </div>

          <div className="space-y-3">
            {medications.map((med) => (
              <div 
                key={med.id}
                className="flex items-center gap-3 p-3 border border-slate-100 hover:border-slate-200 rounded-xl transition-all"
              >
                <div className="w-10 h-10 bg-[#06b6d4]/15 rounded-lg flex items-center justify-center text-[#00687a] flex-shrink-0">
                  <span className="material-symbols-outlined text-xl">
                    {med.name === 'Metoprolol' ? 'vaccines' : 'water_drop'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800">{med.name}</p>
                  <p className="text-[10px] text-slate-400 font-bold mt-0.5">{med.dose} - {med.route} - {med.frequency}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[10px] text-slate-500 font-bold">
                    {med.status === 'Next Dose' ? 'Next Dose' : 'Administered'}
                  </p>
                  <p className={`text-xs font-bold mt-0.5 ${med.status === 'Next Dose' ? 'text-[#06b6d4]' : 'text-slate-400'}`}>
                    {med.status === 'Next Dose' ? med.nextDoseTimeText : med.administeredTime}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Lab detail modal */}
      {selectedLab && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-slate-100">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-bold text-slate-900 text-sm">Pathology Detail Analysis</h4>
              <button onClick={() => setSelectedLab(null)} className="material-symbols-outlined text-slate-400 hover:text-slate-600">close</button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span className="text-xs text-slate-500 font-medium">Test Name</span>
                <span className="text-xs text-slate-800 font-bold">{selectedLab.testName}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-xs text-slate-500 font-medium">Measurement Value</span>
                <span className="text-xs text-slate-800 font-bold">{selectedLab.value}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-xs text-slate-500 font-medium">Reference Ranges</span>
                <span className="text-xs text-slate-800 font-bold">
                  {selectedLab.testName.includes("Potassium") ? "3.5 - 5.0 mEq/L" : selectedLab.testName.includes("Hemoglobin") ? "12.0 - 15.5 g/dL" : "0.00 - 0.04 ng/mL"}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-xs text-slate-500 font-medium">Clinical State</span>
                <span className={`text-xs font-bold ${selectedLab.status === 'High' ? 'text-red-600' : 'text-emerald-700'}`}>
                  {selectedLab.status === 'High' ? 'CRITICAL HIGH ALERT' : 'Normal / Target Range'}
                </span>
              </div>
            </div>
            <button 
              onClick={() => setSelectedLab(null)}
              className="w-full mt-6 bg-[#06b6d4] hover:bg-[#00687a] text-white py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Close Detail Analysis
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
