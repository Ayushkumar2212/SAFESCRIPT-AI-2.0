/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';

interface WelcomeScreenProps {
  onEnter: () => void;
  onShowDiagnostics: () => void;
}

export default function WelcomeScreen({ onEnter, onShowDiagnostics }: WelcomeScreenProps) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing clinical modules...");
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setStatusText("Systems active. Secure link established.");
          return 100;
        }
        
        // Dynamic status text updates
        if (prev === 20) setStatusText("Loading secure cryptonode...");
        if (prev === 50) setStatusText("Authenticating surgical database...");
        if (prev === 80) setStatusText("Syncing telemetry sensors...");

        return prev + 4;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, []);

  const handleEnterClick = () => {
    setIsAuthorizing(true);
    setStatusText("Authorizing Secure Credentials...");
    setTimeout(() => {
      onEnter();
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-between p-6 relative overflow-hidden bg-[#f8fafb] select-none w-full">
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-radial-gradient(at 0% 0%, rgba(6, 182, 212, 0.1) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(6, 182, 212, 0.05) 0px, transparent 50%) pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(#06b6d41a_1px,transparent_1px)] bg-[size:24px_24px] opacity-60 z-0 pointer-events-none" style={{ maskImage: "radial-gradient(circle at center, black, transparent 80%)" }}></div>

      {/* Top Status / Branding Anchor */}
      <div className="w-full max-w-lg flex justify-between items-center mt-2 z-10">
        <div className="flex items-center gap-1.5 text-[#00687a]">
          <span className="material-symbols-outlined text-xl filled-icon" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
          <span className="text-xs font-bold tracking-widest uppercase">SECURE NODE</span>
        </div>
        <div className="text-[#3d494c] font-semibold text-xs opacity-75">v2.0.4</div>
      </div>

      {/* Center Branding & Visual Core */}
      <main className="flex flex-col items-center justify-center flex-grow w-full max-w-md gap-6 text-center z-10">
        
        {/* Logo Container with animations */}
        <div className="relative w-48 h-48 flex items-center justify-center float-animation">
          {/* Glow Aura */}
          <div className="absolute inset-0 bg-[#06b6d4]/10 rounded-full blur-3xl pulse-logo"></div>
          
          {/* Logo Image */}
          <div className="relative z-10 w-32 h-32 bg-white rounded-full shadow-lg border border-[#bcc9cd]/40 flex items-center justify-center overflow-hidden">
            <img 
              className="w-20 h-20 object-contain hover:scale-105 transition-transform duration-300" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAH56BxlR_lKPcHgEZx47NhKG-JseBUsfzh_GgRW8d24EhuVxCFe4mS2jfuSr7r4BTk4kMH_PXt3293G6ui8UUov4AWLCyP1Et8Xm65elkkZ2ZjBnjV2CZUWiDgyGV84E30DMC8mo9_zpGpbJ_Nnky5ikAF6vxPsEYW8yIqLdBmq8SG_RNEN33L_xADJlVSt-Hlg5n4vkxpAcvpxff7S8OxdrH_PtzdTKNGTm2wk23xh92tVn1of8Xuh9MjP9n4vQAkb0NeCNb8ivU" 
              alt="SafeScript 2.0 Logo"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Orbiting Decorative Elements */}
          <div className="absolute w-full h-full border border-[#06b6d4]/10 rounded-full animate-[spin_10s_linear_infinite]">
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#06b6d4] rounded-full shadow-[0_0_8px_#06b6d4]"></div>
          </div>
          <div className="absolute w-[120%] h-[120%] border border-[#06b6d4]/10 rounded-full animate-[spin_15s_linear_infinite_reverse]">
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#bcc9cd] rounded-full"></div>
          </div>
        </div>

        {/* Typography */}
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-[#191c1d] tracking-tight">
            SafeScript <span className="text-[#00687a] font-black">2.0</span>
          </h1>
          <p className="text-sm font-medium text-[#3d494c] max-w-[280px] mx-auto leading-relaxed">
            Clinical Intelligence &amp; Advanced Surgical Logistics Platform
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="w-48 h-1.5 bg-[#e6e8e9] rounded-full overflow-hidden mt-2 relative">
          <div 
            className="h-full bg-[#06b6d4] transition-all duration-300 rounded-full" 
            style={{ width: `${loadingProgress}%` }}
          ></div>
        </div>
        <div className="text-xs font-semibold text-slate-500 min-h-[16px] animate-pulse">
          {statusText}
        </div>

      </main>

      {/* Bottom Action Area */}
      <div className="w-full max-w-sm pb-8 space-y-4 z-10">
        
        {/* Technical Badge */}
        <div className="flex items-center justify-center gap-2 bg-[#f2f4f5] py-2 px-4 rounded-xl border border-[#bcc9cd]/20 shadow-sm">
          <span className="material-symbols-outlined text-[#00687a] text-[18px] filled-icon" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
          <span className="text-xs font-semibold text-[#3d494c]">HIPAA Compliant Environment</span>
        </div>

        {/* Primary Action Button */}
        <button 
          onClick={handleEnterClick}
          disabled={isAuthorizing}
          className="w-full py-3.5 bg-[#06b6d4] text-white hover:bg-[#00687a] hover:shadow-cyan-200 hover:shadow-lg disabled:opacity-85 font-semibold rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          {isAuthorizing ? (
            <>
              <span className="material-symbols-outlined animate-spin text-[18px]">sync</span>
              <span>Authorizing Node...</span>
            </>
          ) : (
            <>
              <span>Enter Command Center</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </>
          )}
        </button>

        {/* System Diagnostics Trigger */}
        <div className="text-center">
          <button 
            onClick={onShowDiagnostics}
            className="text-xs font-bold text-slate-400 hover:text-[#00687a] transition-colors cursor-pointer uppercase tracking-wider"
          >
            System Diagnostics
          </button>
        </div>

      </div>

      {/* Floating Atmosphere Elements */}
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-[#00687a]/5 blur-2xl rounded-full pointer-events-none"></div>
      <div className="absolute top-40 right-[-20px] w-32 h-32 bg-[#06b6d4]/10 blur-3xl rounded-full pointer-events-none"></div>

    </div>
  );
}
