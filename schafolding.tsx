import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, CheckCircle2, ArrowRight, ArrowLeft, 
  Plus, X, GripVertical, FileCode2, Copy, AlertTriangle, Download, 
  Layers, Wallet, Target, Minimize2, Maximize2
} from 'lucide-react';

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  
  // Step 1 State
  const [appData, setAppData] = useState({
    name: '',
    pitch: '',
    audience: '',
    monetization: ''
  });
  const [isEnhancing, setIsEnhancing] = useState(false);

  // Step 2 State (Curated Stacks)
  const [selectedStack, setSelectedStack] = useState('');
  
  const STACK_PRESETS = [
    { id: 'next-supabase', name: 'Next.js + Supabase', desc: 'Next.js, Tailwind, Supabase (Auth/DB), Vercel. Best for modern SaaS.' },
    { id: 't3', name: 'T3 Stack', desc: 'Next.js, Tailwind, tRPC, Prisma. Best for type-safe scalability.' },
    { id: 'firebase-react', name: 'React + Firebase', desc: 'React (Vite), Tailwind, Firebase. Best for rapid MVP and realtime apps.' },
    { id: 'mern', name: 'MERN Stack', desc: 'MongoDB, Express, React, Node.js. Best for custom backend logic.' },
    { id: 'django', name: 'Django + HTMX', desc: 'Django (Python), Postgres, HTMX, Tailwind. Best for data-heavy apps.' },
    { id: 'decide-later', name: 'I\'ll decide later', desc: 'Skip this step for now and figure out the architecture during the coding phase.' }
  ];

  // Step 3 & 4 State
  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState('');
  const [dynamicPhases, setDynamicPhases] = useState(['MVP', 'Phase 2', 'Backlog']);
  const [inlineInputs, setInlineInputs] = useState({});
  const [isZipping, setIsZipping] = useState(false);
  const [collapsedPhases, setCollapsedPhases] = useState({});
  
  // Drag and drop state
  const dragItem = useRef(null);

  const steps = [
    { id: 1, title: 'Project Foundation' },
    { id: 2, title: 'Technical Constraints' },
    { id: 3, title: 'Feature Brainstorm' },
    { id: 4, title: 'Hoijof Phasing' },
    { id: 5, title: 'Export Docs' }
  ];

  // --- Simulated AI Functions ---
  const simulateAI = (callback, delay = 800) => {
    setIsEnhancing(true);
    setTimeout(() => {
      callback();
      setIsEnhancing(false);
    }, delay);
  };

  const handleEnhancePitch = () => {
    if (!appData.pitch) return;
    simulateAI(() => {
      setAppData(prev => ({
        ...prev,
        pitch: `A streamlined platform designed for ${prev.audience || 'target users'} to solve their core pain points efficiently. It leverages a modern interface to deliver a seamless experience, maximizing productivity and minimizing friction.`
      }));
    });
  };

  const handleSuggestStack = () => {
    simulateAI(() => {
      // Fake logic: choose Next.js + Supabase by default as it's the most common modern stack
      setSelectedStack('next-supabase');
    });
  };

  const handleSuggestFeatures = () => {
    simulateAI(() => {
      const suggestions = ['User Authentication', 'Billing & Subscriptions', 'User Profile/Settings', 'Dashboard Analytics'];
      const currentNames = features.map(f => f.text.toLowerCase());
      const newFeatures = suggestions
        .filter(s => !currentNames.includes(s.toLowerCase()))
        .map((text, i) => ({ id: `ai-${Date.now()}-${i}`, text, phase: 'Pool', priority: 2 }));
      
      if (newFeatures.length > 0) {
        setFeatures([...features, ...newFeatures]);
      }
    });
  };

  const handleAutoTriage = () => {
    simulateAI(() => {
      setFeatures(prev => prev.map((f, i) => {
        if (f.phase !== 'Pool') return f;
        const mvpCount = prev.filter(pf => pf.phase === 'MVP').length;
        if (mvpCount < 5 && i < 4) return { ...f, phase: 'MVP' };
        return { ...f, phase: 'Phase 2' };
      }));
    });
  };

  // --- Feature Handlers ---
  const handleAddFeature = (e) => {
    e.preventDefault();
    if (!newFeature.trim()) return;
    setFeatures([...features, { id: Date.now().toString(), text: newFeature, phase: 'Pool', priority: 2 }]);
    setNewFeature('');
  };

  const handleInlineAddFeature = (e, phase) => {
    e.preventDefault();
    const text = inlineInputs[phase];
    if (!text?.trim()) return;
    setFeatures([...features, { id: Date.now().toString(), text, phase, priority: 2 }]);
    setInlineInputs(prev => ({ ...prev, [phase]: '' }));
  };

  const removeFeature = (id) => {
    setFeatures(features.filter(f => f.id !== id));
  };

  const updateFeaturePriority = (id, priority) => {
    setFeatures(prev => prev.map(f => f.id === id ? { ...f, priority } : f));
  };

  const handleAddPhase = () => {
    const newPhaseNum = dynamicPhases.filter(p => p.startsWith('Phase')).length + 2;
    // Insert before Backlog
    const backlogIndex = dynamicPhases.indexOf('Backlog');
    const newPhases = [...dynamicPhases];
    newPhases.splice(backlogIndex > -1 ? backlogIndex : newPhases.length, 0, `Phase ${newPhaseNum}`);
    setDynamicPhases(newPhases);
  };

  const togglePhaseCollapse = (phase) => {
    setCollapsedPhases(prev => ({ ...prev, [phase]: !prev[phase] }));
  };

  // --- Drag and Drop Handlers ---
  const handleDragStart = (e, id) => {
    dragItem.current = id;
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => { e.target.style.opacity = '0.5'; }, 0);
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    dragItem.current = null;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetPhase) => {
    e.preventDefault();
    const draggedId = dragItem.current;
    if (!draggedId) return;
    setFeatures(prev => prev.map(f => f.id === draggedId ? { ...f, phase: targetPhase } : f));
  };

  // --- Export Markdown Generators ---
  const getStackInfo = () => STACK_PRESETS.find(s => s.id === selectedStack)?.desc || 'To be determined';

  const generatePRD = () => {
    const getSortedFeatures = (phase) => features.filter(f => f.phase === phase).sort((a,b) => (a.priority||2) - (b.priority||2));
    
    return `# Product Requirements Document (PRD)

## 1. Project Overview
**Product Name:** ${appData.name || '[App Name]'}
**Elevator Pitch:** ${appData.pitch || '[No pitch provided]'}

## 2. Target Market & Business Model
**Target Audience:** ${appData.audience || '[No audience provided]'}
**Monetization Strategy:** ${appData.monetization || '[No strategy selected]'}

## 3. Technical Architecture
**Recommended Stack:** ${getStackInfo()}

## 4. Product Scope & Phasing
This project follows the strict Hoijof phased methodology. 

### Phase 1: Minimum Viable Product (MVP)
*Goal: Validate core assumptions with minimal engineering effort.*
${getSortedFeatures('MVP').map(f => `- (P${f.priority || 2}) ${f.text}`).join('\n') || '- No features defined.'}

${dynamicPhases.filter(p => p !== 'MVP' && p !== 'Backlog').map(phase => `### ${phase}
${getSortedFeatures(phase).map(f => `- (P${f.priority || 2}) ${f.text}`).join('\n') || '- No features defined.'}
`).join('\n')}

### Backlog / Future Moonshots
${getSortedFeatures('Backlog').map(f => `- (P${f.priority || 2}) ${f.text}`).join('\n') || '- No backlog items.'}

---
*Generated via Hoijof App Builder on ${new Date().toISOString().split('T')[0]}*`;
  };

  const generatePhaseMarkdown = (phase) => {
    const phaseFeatures = features.filter(f => f.phase === phase).sort((a,b) => (a.priority||2) - (b.priority||2));
    return `# ${phase} Phase Roadmap

## Goal & Status
**Goal:** Implement core functionalities for the ${phase} milestone of ${appData.name || 'the application'}.
**Status:** 🔴 NOT STARTED

## Task Tracking
### Priorities
${phaseFeatures.length > 0 
  ? phaseFeatures.map((f, i) => `- [ ] P${f.priority || 2}: ${f.text}`).join('\n')
  : '- [ ] P1: No features assigned yet.'}

## Tech Stack
- **Architecture:** ${getStackInfo()}

## Memory Log (Append-Only)
- **[${new Date().toISOString().split('T')[0]}]**: Phase initialized. Ready for technical design documentation.`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      // Dynamically load JSZip from CDN
      const loadJSZip = () => {
        return new Promise((resolve, reject) => {
          if (window.JSZip) return resolve(window.JSZip);
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
          script.onload = () => resolve(window.JSZip);
          script.onerror = reject;
          document.body.appendChild(script);
        });
      };

      const JSZip = await loadJSZip();
      const zip = new JSZip();

      // Add PRD
      zip.file('PRD.md', generatePRD());

      // Add Phase Roadmaps
      dynamicPhases.forEach(phase => {
        if (phase === 'Backlog') return; // Exclude backlog from its own roadmap file usually
        const folderName = phase.replace(/\s+/g, '');
        const fileName = `${phase.toLowerCase().replace(/\s+/g, '-')}-roadmap.md`;
        zip.folder(`plans/${folderName}`).file(fileName, generatePhaseMarkdown(phase));
      });

      // Generate Zip Blob and Download
      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${appData.name.replace(/\s+/g, '-').toLowerCase() || 'hoijof-project'}-plans.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to zip:', err);
      alert('Failed to generate ZIP. Check console for details.');
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      {/* Top Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 text-white p-1.5 rounded-lg">
              <FileCode2 className="w-5 h-5" />
            </div>
            <h1 className="font-bold text-lg tracking-tight">Hoijof App Builder</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 mt-8">
        {/* Stepper */}
        <div className="flex items-center justify-between mb-10 relative max-w-4xl mx-auto">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 -z-10 rounded-full"></div>
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-indigo-600 -z-10 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
          ></div>
          
          {steps.map((step) => {
            const isActive = step.id === currentStep;
            const isPast = step.id < currentStep;
            
            return (
              <div key={step.id} className="flex flex-col items-center gap-2 bg-slate-50 px-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors font-bold text-sm ${
                  isActive ? 'bg-indigo-600 border-indigo-600 text-white' : 
                  isPast ? 'bg-indigo-100 border-indigo-600 text-indigo-600' : 
                  'bg-white border-slate-300 text-slate-400'
                }`}>
                  {isPast ? <CheckCircle2 className="w-5 h-5" /> : step.id}
                </div>
                <span className={`text-xs font-semibold hidden md:block ${isActive ? 'text-indigo-700' : 'text-slate-500'}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 min-h-[550px]">
          
          {/* STEP 1: Foundation */}
          {currentStep === 1 && (
            <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Project Foundation</h2>
                <p className="text-slate-500">Define the overarching goal and business logic for your PRD.</p>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2"><Target className="w-4 h-4 text-slate-400"/> App Name</label>
                    <input 
                      type="text" value={appData.name} onChange={(e) => setAppData({...appData, name: e.target.value})}
                      placeholder="e.g., TaskMaster Pro"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2"><Wallet className="w-4 h-4 text-slate-400"/> Monetization</label>
                    <select 
                      value={appData.monetization} onChange={(e) => setAppData({...appData, monetization: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all appearance-none"
                    >
                      <option value="" disabled>Select strategy...</option>
                      <option value="100% Free / Open Source">Free / Open Source</option>
                      <option value="Freemium (Free tier + Paid features)">Freemium</option>
                      <option value="Monthly/Annual SaaS Subscription">SaaS Subscription</option>
                      <option value="One-time Purchase (Lifetime deal)">One-time Purchase</option>
                      <option value="Ad-supported">Ad-supported</option>
                      <option value="Marketplace (Commission per transaction)">Marketplace / Commission</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Target Audience</label>
                  <input 
                    type="text" value={appData.audience} onChange={(e) => setAppData({...appData, audience: e.target.value})}
                    placeholder="e.g., Freelance Designers, Gym Owners, etc."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Elevator Pitch (The Core Problem)</label>
                  <textarea 
                    value={appData.pitch} onChange={(e) => setAppData({...appData, pitch: e.target.value})}
                    placeholder="Describe the problem you are solving in 1-2 sentences..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none h-32 resize-none transition-all"
                  />
                  <div className="mt-3 flex justify-end">
                    <button 
                      onClick={handleEnhancePitch} disabled={!appData.pitch || isEnhancing}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
                    >
                      <Sparkles className={`w-4 h-4 ${isEnhancing ? 'animate-pulse' : ''}`} /> 
                      {isEnhancing ? 'Enhancing...' : 'Enhance Pitch with AI'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Tech Stack */}
          {currentStep === 2 && (
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Technical Foundation</h2>
                <p className="text-slate-500">Select a curated tech stack preset. AI will handle the granular details later.</p>
              </div>

              <div className="flex justify-end">
                <button 
                  onClick={handleSuggestStack} disabled={isEnhancing}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-sm font-semibold transition-colors"
                >
                  <Sparkles className="w-4 h-4" /> Auto-Suggest Best Fit
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {STACK_PRESETS.map((stack) => (
                  <div 
                    key={stack.id}
                    onClick={() => setSelectedStack(stack.id)}
                    className={`cursor-pointer border-2 rounded-xl p-5 transition-all ${
                      selectedStack === stack.id 
                        ? 'border-indigo-600 bg-indigo-50 shadow-md' 
                        : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <Layers className={`w-4 h-4 ${selectedStack === stack.id ? 'text-indigo-600' : 'text-slate-400'}`}/> 
                        {stack.name}
                      </h3>
                      {selectedStack === stack.id && <CheckCircle2 className="w-5 h-5 text-indigo-600" />}
                    </div>
                    <p className="text-sm text-slate-600 leading-snug">{stack.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Brainstorming */}
          {currentStep === 3 && (
            <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Feature Brainstorm</h2>
                <p className="text-slate-500">List every feature, page, and capability. Don't worry about order yet.</p>
              </div>
              
              <form onSubmit={handleAddFeature} className="relative">
                <input 
                  type="text" value={newFeature} onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Type a feature and press Enter..."
                  className="w-full pl-4 pr-24 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-indigo-500 outline-none transition-all shadow-inner text-lg"
                />
                <button 
                  type="submit" disabled={!newFeature.trim()}
                  className="absolute right-2 top-2 bottom-2 px-6 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-colors font-medium"
                >
                  Add
                </button>
              </form>

              <div className="flex justify-between items-center border-t border-slate-100 pt-6">
                <span className="text-sm font-semibold text-slate-500">{features.length} Features Added</span>
                <button 
                  onClick={handleSuggestFeatures} disabled={isEnhancing}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-sm font-semibold transition-colors"
                >
                  <Sparkles className="w-4 h-4" /> Suggest Missing Core Features
                </button>
              </div>

              <div className="flex flex-col gap-2 mt-4 max-h-[350px] overflow-y-auto pr-2">
                {features.map(feature => (
                  <div key={feature.id} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg shadow-sm group">
                    <span className="text-sm font-medium text-slate-700">{feature.text}</span>
                    <div className="flex items-center gap-3">
                      <select
                        value={feature.priority || 2}
                        onChange={(e) => updateFeaturePriority(feature.id, Number(e.target.value))}
                        className={`text-xs font-bold px-2 py-1 rounded outline-none cursor-pointer border ${
                          feature.priority === 1 ? 'bg-red-50 text-red-700 border-red-200' :
                          feature.priority === 3 ? 'bg-slate-50 text-slate-600 border-slate-200' :
                          'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                        title="Set Priority"
                      >
                        <option value={1}>P1</option>
                        <option value={2}>P2</option>
                        <option value={3}>P3</option>
                      </select>
                      <button 
                        onClick={() => removeFeature(feature.id)}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {features.length === 0 && (
                  <div className="w-full py-12 text-center border-2 border-dashed border-slate-200 rounded-xl text-slate-400">
                    Your feature list is empty. Start typing above!
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: Phasing (Dynamic Kanban) */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
              <div className="flex justify-between items-end flex-wrap gap-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Hoijof Phasing</h2>
                  <p className="text-slate-500">Drag features or add them inline. Prevent MVP bloat.</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={handleAddPhase}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-sm font-semibold transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Add Phase
                  </button>
                  <button 
                    onClick={handleAutoTriage} disabled={isEnhancing || features.filter(f => f.phase === 'Pool').length === 0}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
                  >
                    <Sparkles className="w-4 h-4" /> Auto-Triage Remaining
                  </button>
                </div>
              </div>

              {/* Kanban Board */}
              <div className="flex gap-4 overflow-x-auto pb-4 flex-1 items-start snap-x">
                {['Pool', ...dynamicPhases].map(phase => {
                  const phaseFeatures = features.filter(f => f.phase === phase).sort((a,b) => (a.priority||2) - (b.priority||2));
                  const isMVP = phase === 'MVP';
                  const isOverloaded = isMVP && phaseFeatures.length > 5;
                  const isCollapsed = collapsedPhases[phase];

                  return (
                    <div 
                      key={phase}
                      onDragOver={!isCollapsed ? handleDragOver : undefined}
                      onDrop={!isCollapsed ? (e) => handleDrop(e, phase) : undefined}
                      className={`snap-center bg-slate-50 rounded-xl border flex flex-col max-h-[500px] transition-all duration-300 ${
                        isOverloaded && !isCollapsed ? 'border-amber-300' : 'border-slate-200'
                      } ${isCollapsed ? 'min-w-[60px] w-[60px] overflow-hidden' : 'min-w-[280px] w-[280px] flex-1'}`}
                    >
                      <div className={`p-3 border-b flex justify-between items-center shrink-0 ${
                        isOverloaded && !isCollapsed ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-200'
                      } ${isCollapsed ? 'rounded-xl h-full flex-col justify-start gap-4' : 'rounded-t-xl'}`}>
                        {!isCollapsed ? (
                          <>
                            <span className="font-bold text-slate-700 flex items-center gap-2">
                              {phase === 'Pool' ? 'Feature Pool' : phase}
                              {isOverloaded && <AlertTriangle className="w-4 h-4 text-amber-500" title="MVP is getting large" />}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-md font-semibold">
                                {phaseFeatures.length}
                              </span>
                              <button onClick={() => togglePhaseCollapse(phase)} className="text-slate-400 hover:text-slate-700 p-1 rounded hover:bg-slate-100">
                                <Minimize2 className="w-4 h-4" />
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <button onClick={() => togglePhaseCollapse(phase)} className="text-slate-400 hover:text-slate-700 p-1 rounded hover:bg-slate-200 mt-1">
                              <Maximize2 className="w-4 h-4" />
                            </button>
                            <div className="flex-1 relative w-full flex justify-center">
                              <span className="font-bold text-slate-700 whitespace-nowrap -rotate-90 origin-center absolute top-20 tracking-wider">
                                {phase === 'Pool' ? 'Feature Pool' : phase}
                              </span>
                            </div>
                            <span className="bg-slate-200 text-slate-600 text-xs px-2 py-1 rounded-md font-semibold mt-auto mb-2">
                              {phaseFeatures.length}
                            </span>
                          </>
                        )}
                      </div>
                      
                      {!isCollapsed && (
                        <>
                          <div className="flex-1 p-3 space-y-2 overflow-y-auto">
                            {phaseFeatures.map(feature => (
                              <div 
                                key={feature.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, feature.id)}
                                onDragEnd={handleDragEnd}
                                className={`p-3 bg-white border rounded-lg shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-all flex justify-between group gap-2 ${
                                  feature.priority === 1 ? 'border-l-4 border-l-red-500 border-slate-200 hover:border-red-300' :
                                  feature.priority === 3 ? 'border-l-4 border-l-slate-300 border-slate-200 hover:border-slate-400' :
                                  'border-l-4 border-l-amber-400 border-slate-200 hover:border-amber-300'
                                }`}
                              >
                                <div className="flex items-start gap-2 overflow-hidden">
                                  <GripVertical className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                  <span className="text-sm font-medium text-slate-700 leading-snug break-words">{feature.text}</span>
                                </div>
                                <button onClick={() => removeFeature(feature.id)} className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-opacity shrink-0">
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>

                          {/* Inline Quick Add */}
                          <div className="p-3 border-t border-slate-200 bg-white rounded-b-xl shrink-0">
                            <form onSubmit={(e) => handleInlineAddFeature(e, phase)}>
                              <input 
                                type="text" 
                                placeholder={`Add to ${phase}...`}
                                value={inlineInputs[phase] || ''}
                                onChange={(e) => setInlineInputs({...inlineInputs, [phase]: e.target.value})}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-sm focus:border-indigo-500 outline-none"
                              />
                            </form>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: Export */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
              <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Final Documentation</h2>
                  <p className="text-slate-500">Your AI-ready PRD and Phase Roadmaps are generated.</p>
                </div>
                <button 
                  onClick={handleDownloadZip} disabled={isZipping}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-bold shadow-md transition-all disabled:opacity-50"
                >
                  <Download className="w-5 h-5" /> 
                  {isZipping ? 'Zipping...' : 'Download All as ZIP'}
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 overflow-hidden">
                {/* Main PRD Block */}
                <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800 flex flex-col max-h-[450px]">
                  <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700 shrink-0">
                    <span className="text-xs font-mono text-indigo-300 flex items-center gap-2 font-bold">
                      <FileCode2 className="w-4 h-4" /> PRD.md
                    </span>
                    <button 
                      onClick={() => copyToClipboard(generatePRD())}
                      className="text-xs flex items-center gap-1.5 bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </button>
                  </div>
                  <pre className="p-4 text-xs text-slate-300 font-mono overflow-y-auto flex-1 whitespace-pre-wrap">
                    {generatePRD()}
                  </pre>
                </div>

                {/* Phasing Blocks */}
                <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2">
                  {dynamicPhases.filter(p => p !== 'Backlog').map(phase => (
                    <div key={phase} className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200 flex flex-col">
                      <div className="flex items-center justify-between px-4 py-2 bg-slate-100 border-b border-slate-200 shrink-0">
                        <span className="text-xs font-mono text-slate-600 flex items-center gap-2 font-bold">
                          <FileCode2 className="w-4 h-4 text-slate-400" />
                          plans/{phase.replace(/\s+/g, '')}/{phase.toLowerCase().replace(/\s+/g, '-')}-roadmap.md
                        </span>
                        <button 
                          onClick={() => copyToClipboard(generatePhaseMarkdown(phase))}
                          className="text-xs flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5" /> Copy
                        </button>
                      </div>
                      <pre className="p-4 text-xs text-slate-700 font-mono overflow-y-auto max-h-[250px] whitespace-pre-wrap bg-white">
                        {generatePhaseMarkdown(phase)}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button 
            onClick={() => setCurrentStep(prev => Math.max(prev - 1, 1))}
            disabled={currentStep === 1}
            className="px-6 py-3 rounded-xl font-semibold text-slate-600 hover:bg-white border border-transparent hover:border-slate-200 disabled:opacity-50 disabled:hover:bg-transparent transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          
          {currentStep < 5 ? (
            <button 
              onClick={() => setCurrentStep(prev => Math.min(prev + 1, 5))}
              className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all flex items-center gap-2"
            >
              Next Step <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button 
              onClick={() => {
                if (window.confirm("Start over? All current progress will be lost.")) {
                  setCurrentStep(1);
                  setAppData({name: '', pitch: '', audience: '', monetization: ''});
                  setSelectedStack('');
                  setFeatures([]);
                  setDynamicPhases(['MVP', 'Phase 2', 'Backlog']);
                }
              }}
              className="px-8 py-3 bg-white text-slate-700 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Start New App
            </button>
          )}
        </div>
      </main>
    </div>
  );
}