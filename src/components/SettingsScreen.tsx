/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

interface SettingsScreenProps {
  onResetDatabase: () => void;
  onSimulateEmergency: () => void;
}

export default function SettingsScreen({
  onResetDatabase,
  onSimulateEmergency
}: SettingsScreenProps) {
  const [hvacThreshold, setHvacThreshold] = useState(22);
  const [voiceAssistEnabled, setVoiceAssistEnabled] = useState(true);
  const [clinicalSyncRate, setClinicalSyncRate] = useState("5s");
  const [alertLevel, setAlertLevel] = useState("Level 1 (Direct)");

  const handleSave = () => {
    alert("Configuration parameters saved successfully to local clinical node.");
  };

  return (
    <div className="bg-white border border-[#bcc9cd]/40 p-6 rounded-2xl shadow-sm space-y-6 max-w-2xl mx-auto">
      
      {/* Settings Title */}
      <div>
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#00687a]">settings</span>
          Clinical Platform Configuration
        </h3>
        <p className="text-xs text-slate-500 font-medium mt-1">Configure HIPAA compliance keys, telemetry frequency thresholds, and simulator settings.</p>
      </div>

      <div className="space-y-4 divide-y divide-slate-100">
        
        {/* Sync Rate */}
        <div className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h4 className="text-xs font-bold text-slate-800">Dynamic Telemetry Sync Rate</h4>
            <p className="text-[11px] text-slate-500 font-medium">Interval for polling surgical vitals and heart telemetry sensors.</p>
          </div>
          <select 
            value={clinicalSyncRate}
            onChange={(e) => setClinicalSyncRate(e.target.value)}
            className="bg-[#f2f4f5] border-none text-xs font-bold text-slate-700 py-2 px-3 rounded-lg focus:ring-2 focus:ring-[#06b6d4] focus:outline-none cursor-pointer"
          >
            <option value="2s">High-Density (2 seconds)</option>
            <option value="5s">Standard Shift (5 seconds)</option>
            <option value="30s">Eco-Power (30 seconds)</option>
          </select>
        </div>

        {/* Voice alerts */}
        <div className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h4 className="text-xs font-bold text-slate-800">Clinical Voice Assistant (AI-TTS)</h4>
            <p className="text-[11px] text-slate-500 font-medium">Announce emergency trauma warnings in the OR center.</p>
          </div>
          <div className="flex items-center">
            <button 
              type="button"
              onClick={() => setVoiceAssistEnabled(!voiceAssistEnabled)}
              className={`w-11 h-6 rounded-full transition-all duration-300 flex items-center p-1 cursor-pointer ${
                voiceAssistEnabled ? 'bg-[#06b6d4]' : 'bg-slate-300'
              }`}
            >
              <div className={`w-4 h-4 bg-white rounded-full shadow transition-all transform ${
                voiceAssistEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}></div>
            </button>
          </div>
        </div>

        {/* HVAC slider */}
        <div className="py-4 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-xs font-bold text-[#191c1d]">OR Temperature Threshold</h4>
              <p className="text-[11px] text-slate-500 font-medium">Maintain ideal clinical temperature inside operating rooms.</p>
            </div>
            <span className="text-xs font-bold bg-slate-100 text-slate-700 py-1 px-2 rounded">{hvacThreshold}°C</span>
          </div>
          <input 
            type="range" 
            min="16" 
            max="26" 
            value={hvacThreshold}
            onChange={(e) => setHvacThreshold(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#06b6d4]"
          />
        </div>

        {/* System Simulation Playground */}
        <div className="py-4 space-y-3">
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider text-[#00687a]">Clinical Simulation Testing Tools</h4>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">Force system events to test secure compliance monitoring protocols.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button 
              type="button"
              onClick={onSimulateEmergency}
              className="py-2 px-3 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm"
            >
              Simulate Emergency Warning
            </button>
            <button 
              type="button"
              onClick={onResetDatabase}
              className="py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm"
            >
              Reset Database to Initial Seeds
            </button>
          </div>
        </div>

      </div>

      <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
        <button 
          onClick={() => alert("Discarded changes.")}
          className="px-4 py-2 hover:bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold rounded-xl cursor-pointer"
        >
          Cancel
        </button>
        <button 
          onClick={handleSave}
          className="px-4 py-2 bg-[#06b6d4] hover:bg-[#00687a] text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer transition-colors"
        >
          Save Configurations
        </button>
      </div>

    </div>
  );
}
