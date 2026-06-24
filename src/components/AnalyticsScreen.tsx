/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

interface AnalyticsScreenProps {
  onExportReport: () => void;
  onViewTransfers: () => void;
  onViewRoster: () => void;
}

export default function AnalyticsScreen({
  onExportReport,
  onViewTransfers,
  onViewRoster
}: AnalyticsScreenProps) {
  const [mriQueue, setMriQueue] = useState(3);
  const [pharmacyWait, setPharmacyWait] = useState(12.5);

  const handleRecalculate = () => {
    setMriQueue(Math.floor(Math.random() * 3) + 2);
    setPharmacyWait(parseFloat((Math.random() * 5 + 10).toFixed(1)));
  };

  return (
    <div className="space-y-6">
      
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Clinical Intelligence</h2>
          <p className="text-xs text-slate-500 font-medium">Real-time performance metrics and operational forecasting</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <div className="bg-white border border-[#bcc9cd]/40 rounded-xl px-4 py-2 flex items-center gap-2 shadow-sm text-xs font-bold text-slate-700">
            <span className="material-symbols-outlined text-slate-500 text-sm">calendar_today</span>
            <span>Last 24 Hours</span>
          </div>
          <button 
            onClick={onExportReport}
            className="bg-[#06b6d4] hover:bg-[#00687a] text-white px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 shadow-sm cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-sm">file_download</span>
            Export Report
          </button>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Surgical Success Rate Gauge */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white border border-[#bcc9cd]/40 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-sm text-slate-800">Surgical Success Rate</h3>
              <span className="bg-[#d5e3fc] text-[#57657a] text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">LIVE</span>
            </div>

            {/* Circular Gauge SVG */}
            <div className="flex flex-col items-center justify-center py-6">
              <div className="relative w-44 h-44">
                <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
                  <circle 
                    cx="50" 
                    cy="50" 
                    fill="none" 
                    r="43" 
                    stroke="#e2e8f0" 
                    strokeWidth="8"
                  />
                  <circle 
                    cx="50" 
                    cy="50" 
                    fill="none" 
                    r="43" 
                    stroke="#06b6d4" 
                    strokeWidth="8"
                    strokeDasharray="270"
                    strokeDashoffset="15"
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-[#00687a]">94.2%</span>
                  <span className="text-[10px] font-bold text-slate-500 mt-0.5">+1.4% vs PW</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Procedures</p>
                <p className="text-xl font-black text-slate-800">842</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Re-admits (30d)</p>
                <p className="text-xl font-black text-red-600">2.1%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Unit Efficiency Trends Line Chart */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white border border-[#bcc9cd]/40 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all h-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
              <h3 className="font-bold text-sm text-slate-800">Unit Efficiency Trends</h3>
              <div className="flex gap-4 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#06b6d4]"></span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">ICU</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#515f74]"></span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">ER</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#9ea6bf]"></span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Radiology</span>
                </div>
              </div>
            </div>

            {/* Efficiency trend chart illustration */}
            <div className="relative h-64 w-full bg-slate-50 rounded-xl overflow-hidden flex items-end">
              <div className="absolute inset-0 flex items-end justify-between px-4 opacity-10 pointer-events-none">
                <div className="w-px h-full bg-slate-400"></div>
                <div className="w-px h-full bg-slate-400"></div>
                <div className="w-px h-full bg-slate-400"></div>
                <div className="w-px h-full bg-slate-400"></div>
                <div className="w-px h-full bg-slate-400"></div>
              </div>

              <svg className="w-full h-full p-4" preserveAspectRatio="none" viewBox="0 0 100 100">
                {/* ICU Trend Wave (Cyan) */}
                <path 
                  d="M0 65 Q 25 45, 50 55 T 100 30" 
                  fill="none" 
                  stroke="#06b6d4" 
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                {/* ER Trend Wave (Navy) */}
                <path 
                  d="M0 75 Q 25 80, 50 68 T 100 60" 
                  fill="none" 
                  stroke="#515f74" 
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {/* Radiology Trend Wave (Dotted Grey) */}
                <path 
                  d="M0 55 Q 25 65, 50 50 T 100 52" 
                  fill="none" 
                  stroke="#9ea6bf" 
                  strokeWidth="3"
                  strokeDasharray="4"
                  strokeLinecap="round"
                />
              </svg>

              {/* Peak Flow Tooltip */}
              <div className="absolute top-[18%] left-[62%] bg-slate-800 text-white px-3 py-2 rounded-xl shadow-xl text-[10px] z-10 font-semibold pointer-events-none">
                <p className="text-slate-200">14:00 Peak Flow</p>
                <p className="text-[#06b6d4] font-extrabold mt-0.5">ICU Throughput: 88%</p>
              </div>
            </div>

            <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400">
              <span>08:00</span>
              <span>12:00</span>
              <span>16:00</span>
              <span>20:00</span>
              <span>00:00</span>
            </div>
          </div>
        </div>

        {/* Bottleneck Analysis Section */}
        <div className="col-span-12">
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Bottleneck Analysis</h3>
            <div className="flex-grow h-px bg-slate-200"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Critical Card */}
            <div className="bg-white border border-[#bcc9cd]/40 border-l-4 border-l-red-600 p-5 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-red-600 filled-icon" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
                <span className="bg-red-50 border border-red-100 text-red-700 text-[9px] px-2.5 py-0.5 rounded-full font-bold">CRITICAL</span>
              </div>
              <div className="mt-3">
                <h4 className="text-xs font-bold text-slate-800">ICU Bed Shortage</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">Occupancy at 98.4%. 2 patients awaiting transfer from ER. Estimated wait: 4.2hrs.</p>
              </div>
              <div className="mt-4 bg-slate-50 p-2.5 rounded-lg flex items-center justify-between text-xs font-bold">
                <span className="text-slate-400 text-[10px]">Action Required</span>
                <button 
                  onClick={onViewTransfers}
                  className="text-[#00687a] hover:text-[#06b6d4] cursor-pointer"
                >
                  View Transfers
                </button>
              </div>
            </div>

            {/* Warning Card */}
            <div className="bg-white border border-[#bcc9cd]/40 border-l-4 border-l-amber-500 p-5 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-amber-500 filled-icon" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                <span className="bg-amber-50 border border-amber-100 text-amber-700 text-[9px] px-2.5 py-0.5 rounded-full font-bold">WARNING</span>
              </div>
              <div className="mt-3">
                <h4 className="text-xs font-bold text-slate-800">Lab Turnaround</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">Sepsis-3 profile delays in Unit B. Average delay +18min vs standard protocol.</p>
              </div>
              <div className="mt-4 bg-slate-50 p-2.5 rounded-lg flex items-center justify-between text-xs font-bold">
                <span className="text-slate-400 text-[10px]">Monitoring Ops</span>
                <button 
                  onClick={() => alert("Retrieving Sepsis-3 Clinical Path analysis log logs...")}
                  className="text-[#00687a] hover:text-[#06b6d4] cursor-pointer"
                >
                  Detail Log
                </button>
              </div>
            </div>

            {/* Normal Card */}
            <div className="bg-white border border-[#bcc9cd]/40 border-l-4 border-l-[#06b6d4] p-5 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-[#06b6d4] filled-icon" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="bg-cyan-50 border border-cyan-100 text-cyan-800 text-[9px] px-2.5 py-0.5 rounded-full font-bold">NORMAL</span>
              </div>
              <div className="mt-3">
                <h4 className="text-xs font-bold text-slate-800">Staff Distribution</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">Current shift staffing matches predicted patient load. Variance within &lt;2%.</p>
              </div>
              <div className="mt-4 bg-slate-50 p-2.5 rounded-lg flex items-center justify-between text-xs font-bold">
                <span className="text-slate-400 text-[10px]">Optimal Flow</span>
                <button 
                  onClick={onViewRoster}
                  className="text-[#00687a] hover:text-[#06b6d4] cursor-pointer"
                >
                  Roster
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Predictive Insights (Bento style row) */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <div className="md:col-span-2 bg-white border border-[#bcc9cd]/40 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center gap-4">
            <div className="w-14 h-14 bg-[#dae2fd] rounded-full flex items-center justify-center text-slate-800 flex-shrink-0">
              <span className="material-symbols-outlined text-2xl">psychology</span>
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Predictive Discharge</h4>
              <p className="text-lg font-black text-slate-800">14 Patients</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Expected capacity relief by 18:00</p>
            </div>
          </div>

          <div className="bg-white border border-[#bcc9cd]/40 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-center">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pharmacy Wait</h4>
            <p className="text-lg font-black text-slate-800">{pharmacyWait}m</p>
            <div className="w-full bg-[#f2f4f5] mt-2 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#00687a] h-full w-[40%]" style={{ width: '40%' }}></div>
            </div>
          </div>

          <div className="bg-white border border-[#bcc9cd]/40 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-center">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">MRI Queue</h4>
            <p className="text-lg font-black text-slate-800">{mriQueue} Units</p>
            <div className="w-full bg-[#f2f4f5] mt-2 h-1.5 rounded-full overflow-hidden">
              <div className="bg-red-600 h-full w-[85%]" style={{ width: '85%' }}></div>
            </div>
          </div>

        </div>

      </div>

      {/* Recalculate panel */}
      <div className="flex justify-center">
        <button 
          onClick={handleRecalculate}
          className="px-4 py-2 border border-[#bcc9cd] bg-white hover:bg-[#bcc9cd]/20 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer shadow-sm"
        >
          <span className="material-symbols-outlined text-sm">sync</span>
          Recalculate Dynamic Analytics
        </button>
      </div>

    </div>
  );
}
