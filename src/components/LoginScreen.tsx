/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StaffProfile } from '../types';
import { STAFF_PROFILES } from '../data';

interface LoginScreenProps {
  onLoginSuccess: (profile: StaffProfile) => void;
  onBack: () => void;
}

export default function LoginScreen({ onLoginSuccess, onBack }: LoginScreenProps) {
  const [selectedRole, setSelectedRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const role = e.target.value;
    setSelectedRole(role);
    setErrorMsg("");

    // Automatically match role to pre-seeded profiles for fluid UX
    if (role === "Chief of Surgery" || role === "Cardiology Head") {
      const match = STAFF_PROFILES.find(p => p.name.includes("Chen"));
      if (match) {
        setEmail(match.email);
        setPassword("SarahSecret123!");
        return;
      }
    }
    
    if (role === "Chief Medical Officer") {
      const match = STAFF_PROFILES.find(p => p.name.includes("Thorne"));
      if (match) {
        setEmail(match.email);
        setPassword("ArisSecret456!");
        return;
      }
    }

    if (role === "Attending Physician") {
      const match = STAFF_PROFILES.find(p => p.name.includes("Rodriguez"));
      if (match) {
        setEmail(match.email);
        setPassword("ElenaSecret789!");
        return;
      }
    }

    // Fallbacks
    setEmail(`staff.${role.toLowerCase().replace(/\s+/g, '')}@safescript.med`);
    setPassword("SecureClinicalPass1!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      setErrorMsg("Please select an identity role to authorize secure access.");
      return;
    }
    if (!email) {
      setErrorMsg("Please enter a valid professional email.");
      return;
    }

    setIsLoggingIn(true);
    setErrorMsg("");

    // Simulate clinical authorization delay
    setTimeout(() => {
      // Find matching profile or construct new one
      let matchedProfile = STAFF_PROFILES.find(p => p.email.toLowerCase() === email.toLowerCase());
      if (!matchedProfile) {
        matchedProfile = {
          name: email.split('@')[0].split('.').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
          role: selectedRole,
          email: email,
          avatarUrl: "", // Initials fallback
          initials: email.charAt(0).toUpperCase() + (email.split('.')[1] || 'S').charAt(0).toUpperCase()
        };
      }
      
      setIsLoggingIn(false);
      onLoginSuccess(matchedProfile);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-6 bg-gradient-to-b from-[#e0f2fe] via-[#f8fafb] to-[#f8fafb] relative overflow-y-auto w-full select-none">
      
      {/* Header / Brand Section */}
      <header className="w-full flex flex-col items-center mt-6 animate-fade-in z-10">
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 flex items-center gap-1 text-[#00687a] hover:text-[#06b6d4] font-semibold text-xs cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Back
        </button>
        <div className="mb-3">
          <span className="material-symbols-outlined text-[#06b6d4] !text-4xl filled-icon" style={{ fontVariationSettings: "'FILL' 1" }}>
            security
          </span>
        </div>
        <h1 className="text-2xl font-bold text-[#191c1d] tracking-tight">SafeScript 2.0</h1>
        <p className="text-sm text-[#3d494c] font-medium opacity-85">Clinical AI Environment</p>
      </header>

      {/* Main Authentication Card with glassmorphism */}
      <main className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-md border border-[#bcc9cd]/30 flex flex-col gap-6 z-10 mt-4">
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          {/* Identity Role Selection */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#3d494c] ml-1">Identity Role</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-[#3d494c] text-[20px]">medical_services</span>
              </div>
              <select 
                value={selectedRole}
                onChange={handleRoleChange}
                className="w-full bg-white border border-[#bcc9cd]/70 rounded-lg py-3 pl-11 pr-10 text-sm focus:border-[#06b6d4] focus:ring-2 focus:ring-[#06b6d4]/15 focus:outline-none transition-all appearance-none cursor-pointer text-slate-800 font-medium"
              >
                <option value="" disabled>Select staff role</option>
                <option value="Chief of Surgery">Chief of Surgery</option>
                <option value="Chief Medical Officer">Chief Medical Officer</option>
                <option value="Attending Physician">Attending Physician</option>
                <option value="Charge Nurse">Charge Nurse</option>
                <option value="Clinical Pharmacist">Clinical Pharmacist</option>
                <option value="System Administrator">System Administrator</option>
                <option value="Cardiology Head">Cardiology Head</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-[#3d494c] text-[20px]">expand_more</span>
              </div>
            </div>
          </div>

          {/* Professional Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#3d494c] ml-1">Professional Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-[#3d494c] text-[20px]">badge</span>
              </div>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="staff.id@safescript.med"
                required
                className="w-full bg-white border border-[#bcc9cd]/70 rounded-lg py-3 pl-11 pr-4 text-sm focus:border-[#06b6d4] focus:ring-2 focus:ring-[#06b6d4]/15 focus:outline-none transition-all text-slate-800 font-medium placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Security Credentials */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#3d494c] ml-1">Security Credentials</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-[#3d494c] text-[20px]">vpn_key</span>
              </div>
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full bg-white border border-[#bcc9cd]/70 rounded-lg py-3 pl-11 pr-11 text-sm focus:border-[#06b6d4] focus:ring-2 focus:ring-[#06b6d4]/15 focus:outline-none transition-all text-slate-800 font-medium placeholder:text-slate-400"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#3d494c] hover:text-[#00687a] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? "visibility" : "visibility_off"}
                </span>
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="text-xs font-semibold text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
              {errorMsg}
            </div>
          )}

          {/* Action Button */}
          <button 
            type="submit"
            disabled={isLoggingIn}
            className="w-full bg-[#06b6d4] text-white hover:bg-[#00687a] font-semibold text-sm py-3 px-4 rounded-lg shadow-md hover:shadow-cyan-100 disabled:opacity-80 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoggingIn ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[18px]">sync</span>
                <span>Authorizing Credentials...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                <span>Authorize Secure Access</span>
              </>
            )}
          </button>

        </form>

        <div className="flex items-center justify-center gap-3 mt-1">
          <button 
            type="button" 
            onClick={() => alert("Please contact the SafeScript 2.0 Support desk at +1 (800) 555-SAFE or mail admin@safescript.med.")}
            className="text-xs font-bold text-[#00687a] hover:underline cursor-pointer"
          >
            Forgot Credentials?
          </button>
          <span className="w-1 h-1 bg-[#bcc9cd] rounded-full"></span>
          <button 
            type="button"
            onClick={() => alert("Connecting to Clinical Tech Support terminal...")}
            className="text-xs font-bold text-[#00687a] hover:underline cursor-pointer"
          >
            Support Desk
          </button>
        </div>

      </main>

      {/* HIPAA / Security Badges Footer */}
      <footer className="w-full flex flex-col items-center gap-4 mb-6 z-10 mt-6">
        <div className="flex items-center gap-10 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-[#3d494c] text-xl">shield_lock</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#3d494c] mt-1">HIPAA Compliant</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-[#3d494c] text-xl">encrypted</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#3d494c] mt-1">256-Bit AES</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-[#3d494c] text-xl">policy</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#3d494c] mt-1">SOC2 Type II</span>
          </div>
        </div>
        <p className="text-[10px] text-slate-500 font-semibold text-center max-w-[280px] leading-relaxed opacity-80">
          This terminal is monitored for security and quality purposes. Access is restricted to authorized personnel only. 
          © 2026 SafeScript Clinical AI Platform.
        </p>
      </footer>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#06b6d4]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-32 w-80 h-80 bg-[#d5e3fc]/30 rounded-full blur-3xl"></div>
        {/* Subtle Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#00687a 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }}></div>
      </div>

    </div>
  );
}
