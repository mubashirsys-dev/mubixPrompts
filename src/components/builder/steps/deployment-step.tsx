"use client";

import { useBuilderStore } from "@/store/builder-store";
import { ArrowLeft, ArrowRight, GitBranch, Globe, Terminal, Shield, FolderHeart, Zap } from "lucide-react";

export function DeploymentStep() {
  const { deploymentConfig, setDeploymentConfig, nextStep, prevStep } = useBuilderStore();

  const handleTargetChange = (target: 'vercel' | 'netlify' | 'none') => {
    setDeploymentConfig({ deployTarget: target });
  };

  const handleGithubToggle = () => {
    setDeploymentConfig({ autoDeploy: !deploymentConfig.autoDeploy });
  };

  return (
    <div className="space-y-8 bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_#000] max-w-4xl mx-auto">
      {/* Title */}
      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 bg-[#FFD93D] border-2 border-black font-black uppercase text-xs rotate-[-1deg] mb-4">
          STEP 9: DEPLOYMENT & HOSTING
        </span>
        <h2 className="text-3xl font-black uppercase text-black">Deployment Engine</h2>
        <p className="text-sm font-bold text-black/70 mt-2">
          Configure how you want to compile and host your project. All configurations are embedded directly in the deployment scripts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Hosting target selection */}
        <div className="border-4 border-black p-5 bg-[#FFFDF5] shadow-[4px_4px_0px_0px_#000] space-y-5">
          <h3 className="text-sm font-black uppercase text-black flex items-center gap-2 border-b-2 border-black pb-2">
            <Globe className="w-4 h-4 text-[#C4B5FD]" />
            1. Select Deploy Target
          </h3>
          
          <div className="space-y-3">
            {[
              { id: "none" as const, label: "Offline ZIP Archive", desc: "No instant hosting. Packages files into a clean ZIP source code bundle", icon: FolderHeart },
              { id: "vercel" as const, label: "Vercel Serverless Hosting", desc: "Optimized serverless Edge deployment (recommended for Next.js)", icon: Zap },
              { id: "netlify" as const, label: "Netlify Edge CDN", desc: "Deploy global static landing pages on Netlify's high-speed CDN", icon: Globe }
            ].map((option) => {
              const isSelected = deploymentConfig.deployTarget === option.id;
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => handleTargetChange(option.id)}
                  className={`w-full text-left p-3.5 border-2 border-black transition-all flex items-center gap-3.5 shadow-[1.5px_1.5px_0px_0px_#000] active:translate-y-[0.5px] active:shadow-none ${
                    isSelected ? "bg-[#C4B5FD]/20 border-[#C4B5FD] shadow-[2.5px_2.5px_0px_0px_#C4B5FD]" : "bg-white hover:bg-neutral-50"
                  }`}
                >
                  <div className={`w-8 h-8 rounded border-2 border-black flex items-center justify-center shrink-0 ${
                    isSelected ? "bg-[#C4B5FD] text-black" : "bg-neutral-100 text-black/40"
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase text-black block">{option.label}</span>
                    <span className="text-[9px] font-bold text-black/60 block leading-tight mt-0.5">{option.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* GitHub configuration details */}
        <div className="border-4 border-black p-5 bg-[#FFFDF5] shadow-[4px_4px_0px_0px_#000] space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase text-black flex items-center gap-2 border-b-2 border-black pb-2">
              <GitBranch className="w-4 h-4 text-[#4ade80]" />
              2. GitHub Repository Pipeline
            </h3>

            {/* Toggle button */}
            <button
              onClick={handleGithubToggle}
              className={`w-full p-3 border-2 border-black font-black uppercase text-[10px] transition-all flex items-center justify-between shadow-[1px_1px_0px_0px_#000] active:translate-y-[1px] active:shadow-none ${
                deploymentConfig.autoDeploy ? "bg-[#4ade80] text-black" : "bg-white text-black/45 hover:bg-neutral-50"
              }`}
            >
              <span>{deploymentConfig.autoDeploy ? "✓ GitHub Integration Enabled" : "✗ Connect GitHub Repository"}</span>
              <span className="text-[8px] border border-black px-1.5 py-0.2 bg-white text-black font-black">
                {deploymentConfig.autoDeploy ? "ON" : "OFF"}
              </span>
            </button>

            {deploymentConfig.autoDeploy && (
              <div className="space-y-3 pt-2 border-t border-black/10">
                <div>
                  <label className="text-[9px] font-black uppercase text-black/55 block mb-1">
                    Repository URL
                  </label>
                  <input
                    type="url"
                    value={deploymentConfig.githubRepoUrl || ""}
                    onChange={(e) => setDeploymentConfig({ githubRepoUrl: e.target.value })}
                    placeholder="https://github.com/username/project-repo"
                    className="w-full neo-input text-xs py-2 font-mono"
                  />
                </div>

                <div className="p-3 bg-[#FF6B6B]/10 border-2 border-black text-[9px] font-bold text-black/75 flex gap-2">
                  <Shield className="w-4 h-4 text-[#FF6B6B] shrink-0 mt-0.5" />
                  <div>
                    We will configure automatic GitHub Actions workflow triggers. Every push will deploy directly to your selected hosting provider.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Terminal details block */}
          <div className="border-2 border-black p-3 bg-black text-[#4ade80] font-mono text-[9px] space-y-1.5 shadow-[2px_2px_0px_0px_#777]">
            <div className="flex items-center gap-1.5 border-b border-neutral-800 pb-1 mb-1.5">
              <Terminal className="w-3.5 h-3.5" />
              <span>nextjs-deploy-cli.sh</span>
            </div>
            <div>$ npm run build</div>
            <div>&gt; linting & compilation checklist check: OK</div>
            <div>&gt; static optimization: successfully generated HTML pages</div>
            <div>&gt; target edge node: [OK] deploying source bundles...</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t-4 border-black">
        <button
          onClick={prevStep}
          className="neo-btn text-sm py-2 px-6 font-black uppercase flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4 stroke-[3px]" />
          Back
        </button>
        <button
          onClick={nextStep}
          className="neo-btn neo-btn-accent text-sm py-2.5 px-8 font-black uppercase flex items-center gap-2"
        >
          Continue
          <ArrowRight className="w-4 h-4 stroke-[3px]" />
        </button>
      </div>
    </div>
  );
}
