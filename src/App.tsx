/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Screen, StaffProfile, SurgicalUnit, UrgentRequest, LabResult, Medication, ClinicalAlert } from './types';
import { 
  STAFF_PROFILES, 
  INITIAL_SURGICAL_UNITS, 
  INITIAL_URGENT_REQUESTS, 
  INITIAL_LAB_RESULTS, 
  INITIAL_MEDICATIONS, 
  INITIAL_CLINICAL_ALERTS 
} from './data';

import WelcomeScreen from './components/WelcomeScreen';
import LoginScreen from './components/LoginScreen';
import DashboardScreen from './components/DashboardScreen';
import VitalsScreen from './components/VitalsScreen';
import SurgicalUnitsScreen from './components/SurgicalUnitsScreen';
import AnalyticsScreen from './components/AnalyticsScreen';
import SettingsScreen from './components/SettingsScreen';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

export default function App() {
  const [currentScreen, setScreen] = useState<Screen>('welcome');
  const [currentUser, setCurrentUser] = useState<StaffProfile>(STAFF_PROFILES[0]); // Default to Dr. Sarah Chen
  
  // Real-time dynamic states
  const [units, setUnits] = useState<SurgicalUnit[]>(INITIAL_SURGICAL_UNITS);
  const [urgentRequests, setUrgentRequests] = useState<UrgentRequest[]>(INITIAL_URGENT_REQUESTS);
  const [labResults, setLabResults] = useState<LabResult[]>(INITIAL_LAB_RESULTS);
  const [medications, setMedications] = useState<Medication[]>(INITIAL_MEDICATIONS);
  const [alerts, setAlerts] = useState<ClinicalAlert[]>(INITIAL_CLINICAL_ALERTS);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal toggle states
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [showNewEntryModal, setShowNewEntryModal] = useState(false);
  const [showDiagnosticsModal, setShowDiagnosticsModal] = useState(false);
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [selectedUnitForDispatch, setSelectedUnitForDispatch] = useState<string | null>(null);

  // Form states for modals
  const [broadcastText, setBroadcastText] = useState('');
  const [broadcastLevel, setBroadcastLevel] = useState('NORMAL');
  const [newEntry, setNewEntry] = useState({
    unitId: 'OR-02',
    procedure: 'Cardiovascular Shunt',
    surgeon: 'Dr. Sarah Chen',
    specialty: 'Cardiovascular',
    patientId: 'PT-3109'
  });

  // Notifications simulation
  const [notificationsCount, setNotificationsCount] = useState(2);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => {
      setNotificationToast(null);
    }, 5000);
  };

  const handleSwitchProfile = () => {
    // Alternate profiles
    const currentIndex = STAFF_PROFILES.findIndex(p => p.email === currentUser.email);
    const nextIndex = (currentIndex + 1) % STAFF_PROFILES.length;
    const nextProfile = STAFF_PROFILES[nextIndex];
    setCurrentUser(nextProfile);
    triggerToast(`Switched terminal profile to: ${nextProfile.name} (${nextProfile.role})`);
  };

  const handleLoginSuccess = (profile: StaffProfile) => {
    setCurrentUser(profile);
    setScreen('dashboard');
    triggerToast(`Clinical authorization established: Hello ${profile.name}!`);
  };

  const handleLogout = () => {
    setScreen('login');
    triggerToast(`Terminal session logged out securely.`);
  };

  const handleDispatchAction = (id: string) => {
    setUrgentRequests(prev => prev.filter(r => r.id !== id));
    setNotificationsCount(prev => Math.max(0, prev - 1));
    triggerToast(`Surgical logistics payload dispatched successfully.`);
  };

  const handleScheduleCase = (unitId: string) => {
    // Schedule cardiovascular shunt or open select
    setSelectedUnitForDispatch(unitId);
    setShowDispatchModal(true);
  };

  const handleConfirmSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    setUnits(prev => prev.map(unit => {
      if (unit.id === selectedUnitForDispatch || unit.unitId === selectedUnitForDispatch) {
        return {
          ...unit,
          status: 'IN-USE',
          currentProcedure: newEntry.procedure,
          surgeon: newEntry.surgeon,
          specialty: newEntry.specialty,
          progress: 5,
          estCompletion: "17:15",
          timeRemainingText: "First stage initialization",
          patientId: newEntry.patientId,
          duration: "00:05:00"
        };
      }
      return unit;
    }));
    setShowDispatchModal(false);
    triggerToast(`Scheduled case: ${newEntry.procedure} allocated to ${selectedUnitForDispatch}.`);
  };

  const handleConfirmNewClinicalEntry = (e: React.FormEvent) => {
    e.preventDefault();
    // Add to alerts
    const newAlert: ClinicalAlert = {
      id: `alert-${Date.now()}`,
      title: `New Case Initialized: ${newEntry.unitId}`,
      detail: `Procedure: ${newEntry.procedure} led by ${newEntry.surgeon}.`,
      timeAgo: "Just now",
      severity: "info"
    };
    setAlerts(prev => [newAlert, ...prev]);
    setShowNewEntryModal(false);
    triggerToast(`New surgical entry stored inside clinical blockchain.`);
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastText.trim()) return;

    // Trigger a live broadcast alert
    const newAlert: ClinicalAlert = {
      id: `alert-broad-${Date.now()}`,
      title: `BROADCAST ALERT [${broadcastLevel}]`,
      detail: broadcastText,
      timeAgo: "Just now",
      severity: broadcastLevel === 'CRITICAL' ? 'critical' : 'info'
    };

    setAlerts(prev => [newAlert, ...prev]);
    setNotificationsCount(prev => prev + 1);
    setShowBroadcastModal(false);
    setBroadcastText('');
    triggerToast(`Broadcast message dispatched to all hospital sectors.`);
  };

  const handleSimulateEmergency = () => {
    const emergencyId = `emergency-${Date.now()}`;
    const newRequest: UrgentRequest = {
      id: emergencyId,
      type: "Blood Supply",
      timeAgo: "1m ago",
      title: "3 Units AB-Positive",
      detail: "Destination: Trauma Wing Room 101",
      severity: "critical",
      actionLabel: "DISPATCH"
    };

    setUrgentRequests(prev => [newRequest, ...prev]);
    setNotificationsCount(prev => prev + 1);
    setScreen('surgical_units');
    triggerToast("Emergency Trauma Triggered in Trauma Wing!");
  };

  const handleResetDatabase = () => {
    setUnits(INITIAL_SURGICAL_UNITS);
    setUrgentRequests(INITIAL_URGENT_REQUESTS);
    setLabResults(INITIAL_LAB_RESULTS);
    setMedications(INITIAL_MEDICATIONS);
    setAlerts(INITIAL_CLINICAL_ALERTS);
    setNotificationsCount(2);
    triggerToast("Clinical database successfully restored to standard test seeds.");
  };

  return (
    <div className="min-h-screen bg-[#f8fafb] text-[#191c1d] flex select-none">
      
      {/* Toast Alert pop-up */}
      {notificationToast && (
        <div className="fixed top-4 right-4 bg-slate-900 border border-slate-800 text-white px-4 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-2 max-w-sm animate-bounce text-xs font-semibold">
          <span className="material-symbols-outlined text-[#06b6d4] filled-icon" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
          <span className="flex-1">{notificationToast}</span>
          <button onClick={() => setNotificationToast(null)} className="material-symbols-outlined hover:text-slate-300 text-slate-500 text-sm">close</button>
        </div>
      )}

      {/* Main flow routing based on currentScreen */}
      {currentScreen === 'welcome' ? (
        <WelcomeScreen 
          onEnter={() => setScreen('login')} 
          onShowDiagnostics={() => setShowDiagnosticsModal(true)}
        />
      ) : currentScreen === 'login' ? (
        <LoginScreen 
          onLoginSuccess={handleLoginSuccess}
          onBack={() => setScreen('welcome')}
        />
      ) : (
        <>
          {/* SideNavBar is shared across all dashboard screens */}
          <Sidebar 
            currentScreen={currentScreen}
            setScreen={setScreen}
            staff={currentUser}
            onLogout={handleLogout}
            onSwitchProfile={handleSwitchProfile}
            onBroadcastAlert={() => setShowBroadcastModal(true)}
          />

          {/* Main Content Area next to Sidebar */}
          <div className="flex-1 ml-72 flex flex-col min-h-screen overflow-hidden">
            
            {/* Top Navigation Bar */}
            <Header 
              title={currentScreen === 'vitals' ? 'Vitals Monitor' : currentScreen === 'surgical_units' ? 'Surgical Units' : currentScreen === 'analytics' ? 'Clinical Intelligence' : 'OpsCenter AI'}
              searchPlaceholder={
                currentScreen === 'vitals' 
                  ? 'Search patient ID, room or unit...' 
                  : currentScreen === 'surgical_units' 
                    ? 'Search operations, staff or unit ID...' 
                    : 'Search clinical data, patients, or units...'
              }
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              staff={currentUser}
              notificationsCount={notificationsCount}
              onNotificationsClick={() => {
                setNotificationsCount(0);
                triggerToast("System alerts marked as reviewed.");
              }}
              onSwitchProfile={handleSwitchProfile}
            />

            {/* Content Canvas Area */}
            <main className="p-6 flex-1 overflow-y-auto">
              {currentScreen === 'dashboard' && (
                <DashboardScreen 
                  units={units}
                  setScreen={setScreen}
                  onNewClinicalEntry={() => setShowNewEntryModal(true)}
                  alerts={alerts}
                  onAcknowledgeAlert={(id) => setAlerts(prev => prev.filter(a => a.id !== id))}
                  onAssignTeam={(unitId) => handleScheduleCase(unitId)}
                />
              )}

              {currentScreen === 'vitals' && (
                <VitalsScreen 
                  labResults={labResults}
                  medications={medications}
                  onDispatchTeam={() => handleScheduleCase("OR-West Beta")}
                />
              )}

              {currentScreen === 'surgical_units' && (
                <SurgicalUnitsScreen 
                  units={units}
                  urgentRequests={urgentRequests}
                  onDispatchAction={handleDispatchAction}
                  onScheduleCase={handleScheduleCase}
                  onBroadcastAlert={() => setShowBroadcastModal(true)}
                  searchQuery={searchQuery}
                />
              )}

              {currentScreen === 'analytics' && (
                <AnalyticsScreen 
                  onExportReport={() => alert("Building diagnostic clinical PDF payload for clinical board reviews...")}
                  onViewTransfers={() => alert("Showing ICU transfers: 2 Patients pending from Emergency Ward A.")}
                  onViewRoster={() => alert("Displaying Nursing and Surgical Staff rosters for current active shift.")}
                />
              )}

              {currentScreen === 'settings' && (
                <SettingsScreen 
                  onResetDatabase={handleResetDatabase}
                  onSimulateEmergency={handleSimulateEmergency}
                />
              )}
            </main>
          </div>
        </>
      )}

      {/* --- MODALS SECTION --- */}

      {/* 1. Broadcast Alert Modal */}
      {showBroadcastModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <form 
            onSubmit={handleSendBroadcast}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 flex flex-col gap-4 animate-fade-in"
          >
            <div className="flex justify-between items-center pb-2 border-b">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5 text-[#00687a]">
                <span className="material-symbols-outlined text-[#06b6d4]">broadcast_on_home</span>
                Surgical Broadcast Transmission
              </h4>
              <button 
                type="button" 
                onClick={() => setShowBroadcastModal(false)}
                className="material-symbols-outlined text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                close
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Priority Severity</label>
              <div className="flex gap-2">
                <button 
                  type="button"
                  onClick={() => setBroadcastLevel('NORMAL')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${
                    broadcastLevel === 'NORMAL' 
                      ? 'bg-slate-100 border-[#bcc9cd] text-slate-800' 
                      : 'bg-white border-slate-200 text-slate-500'
                  }`}
                >
                  Normal Alert
                </button>
                <button 
                  type="button"
                  onClick={() => setBroadcastLevel('CRITICAL')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${
                    broadcastLevel === 'CRITICAL' 
                      ? 'bg-red-50 border-red-200 text-red-700 font-extrabold' 
                      : 'bg-white border-slate-200 text-slate-500'
                  }`}
                >
                  CRITICAL TRAUMA
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Broadcast Message</label>
              <textarea 
                value={broadcastText}
                onChange={(e) => setBroadcastText(e.target.value)}
                placeholder="Announce to all surgical units and personnel..."
                required
                rows={3}
                className="w-full text-xs font-medium text-slate-800 border rounded-xl p-3 focus:border-[#06b6d4] focus:ring-2 focus:ring-[#06b6d4]/10 focus:outline-none"
              />
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <button 
                type="button" 
                onClick={() => setShowBroadcastModal(false)}
                className="px-4 py-2 border rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-[#00687a] hover:bg-[#06b6d4] text-white rounded-xl text-xs font-bold shadow cursor-pointer transition-colors"
              >
                Transmit Alert
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 2. New Clinical Entry Modal */}
      {showNewEntryModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <form 
            onSubmit={handleConfirmNewClinicalEntry}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 flex flex-col gap-4"
          >
            <div className="flex justify-between items-center pb-2 border-b">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5 text-[#00687a]">
                <span className="material-symbols-outlined text-[#06b6d4]">medical_services</span>
                Record New Clinical Log Entry
              </h4>
              <button 
                type="button" 
                onClick={() => setShowNewEntryModal(false)}
                className="material-symbols-outlined text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                close
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Operating Room</label>
                <select 
                  value={newEntry.unitId}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, unitId: e.target.value }))}
                  className="bg-slate-50 border p-2 rounded-lg text-xs font-semibold text-slate-700"
                >
                  <option value="OR-01">OR-East Alpha (EA-402)</option>
                  <option value="OR-02">OR-East Gamma (EG-405)</option>
                  <option value="OR-North Delta">OR-North Delta</option>
                  <option value="OR-South Epsilon">OR-South Epsilon</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Patient EHR ID</label>
                <input 
                  type="text" 
                  value={newEntry.patientId}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, patientId: e.target.value }))}
                  className="border p-2 rounded-lg text-xs font-semibold text-slate-700"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Surgical Procedure</label>
              <input 
                type="text" 
                value={newEntry.procedure}
                onChange={(e) => setNewEntry(prev => ({ ...prev, procedure: e.target.value }))}
                className="border p-2 rounded-lg text-xs font-semibold text-slate-700"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Lead Surgeon</label>
              <input 
                type="text" 
                value={newEntry.surgeon}
                onChange={(e) => setNewEntry(prev => ({ ...prev, surgeon: e.target.value }))}
                className="border p-2 rounded-lg text-xs font-semibold text-slate-700"
                required
              />
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <button 
                type="button" 
                onClick={() => setShowNewEntryModal(false)}
                className="px-4 py-2 border rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-[#00687a] hover:bg-[#06b6d4] text-white rounded-xl text-xs font-bold shadow cursor-pointer transition-colors"
              >
                Store Log
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 3. System Diagnostics Modal */}
      {showDiagnosticsModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 text-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-800 flex flex-col gap-4 font-mono text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h4 className="font-bold text-emerald-400 text-xs flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">terminal</span>
                SECURE NODE TERMINAL DIAGNOSTICS
              </h4>
              <button 
                type="button" 
                onClick={() => setShowDiagnosticsModal(false)}
                className="material-symbols-outlined text-slate-500 hover:text-slate-300 cursor-pointer"
              >
                close
              </button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              <p className="text-slate-400">[SYSTEM]: Establishing clinical gateway...</p>
              <p className="text-emerald-400">[SUCCESS]: Cryptonode verification OK.</p>
              <p className="text-slate-400">[SYSTEM]: HIPAA Compliance Key Verified.</p>
              <p className="text-slate-400">[SYSTEM]: Polling 20 operating room telemetry arrays...</p>
              <p className="text-slate-400">[SYSTEM]: Latency: 2ms | Stereo Calibration: ACTIVE</p>
              <p className="text-[#06b6d4]">[AI]: SafeScript 2.0 Agent Online.</p>
            </div>

            <button 
              type="button"
              onClick={() => setShowDiagnosticsModal(false)}
              className="w-full bg-slate-800 hover:bg-slate-700 text-emerald-400 py-2.5 rounded-lg text-xs font-bold cursor-pointer"
            >
              Exit Terminal Mode
            </button>
          </div>
        </div>
      )}

      {/* 4. Schedule Case / Allocation Modal */}
      {showDispatchModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <form 
            onSubmit={handleConfirmSchedule}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 flex flex-col gap-4"
          >
            <div className="flex justify-between items-center pb-2 border-b">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5 text-[#00687a]">
                <span className="material-symbols-outlined text-[#06b6d4]">calendar_month</span>
                Schedule &amp; Allocate Team for {selectedUnitForDispatch}
              </h4>
              <button 
                type="button" 
                onClick={() => setShowDispatchModal(false)}
                className="material-symbols-outlined text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                close
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Procedure Specialization</label>
              <select 
                value={newEntry.specialty}
                onChange={(e) => {
                  const spec = e.target.value;
                  let proc = 'General Appendectomy';
                  if (spec === 'Cardiovascular') proc = 'Valve Replacement Surgery';
                  if (spec === 'Neurosurgery') proc = 'Stereotactic Craniotomy';
                  if (spec === 'Orthopedic') proc = 'L4-L5 Spinal Fusion';
                  setNewEntry(prev => ({ ...prev, specialty: spec, procedure: proc }));
                }}
                className="bg-slate-50 border p-2 rounded-lg text-xs font-semibold text-slate-700"
              >
                <option value="General Surgery">General Surgery</option>
                <option value="Cardiovascular">Cardiovascular Medicine</option>
                <option value="Neurosurgery">Neurosurgery</option>
                <option value="Orthopedic">Orthopedic Spinal</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Assigned Procedure</label>
              <input 
                type="text" 
                value={newEntry.procedure}
                onChange={(e) => setNewEntry(prev => ({ ...prev, procedure: e.target.value }))}
                className="border p-2 rounded-lg text-xs font-semibold text-slate-700"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Assigned Trauma / Surgical Team</label>
              <select 
                value={newEntry.surgeon}
                onChange={(e) => setNewEntry(prev => ({ ...prev, surgeon: e.target.value }))}
                className="bg-slate-50 border p-2 rounded-lg text-xs font-semibold text-slate-700 font-bold"
              >
                <option value="Dr. Sarah Chen">Dr. Sarah Chen (Cardiology/Neurosurg Head)</option>
                <option value="Dr. Elena Rodriguez">Dr. Elena Rodriguez (Immunotherapy Specialist)</option>
                <option value="Dr. Marcus Vance">Dr. Marcus Vance (Attending General)</option>
                <option value="Dr. Julian Thorne">Dr. Julian Thorne (Orthopedic Chief)</option>
                <option value="Trauma Team A Red">Trauma Team A Red (GSW Response)</option>
              </select>
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <button 
                type="button" 
                onClick={() => setShowDispatchModal(false)}
                className="px-4 py-2 border rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-[#06b6d4] hover:bg-[#00687a] text-white rounded-xl text-xs font-bold shadow cursor-pointer transition-colors"
              >
                Authorize Case Allocations
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
