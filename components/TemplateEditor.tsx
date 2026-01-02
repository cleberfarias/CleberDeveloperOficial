
import React, { useState, useEffect, useRef } from 'react';
import { TemplateDefinition, AIPageContent, CustomSection } from '../types';
import { generateMockupContent, updateContentWithChat } from '../services/geminiService';

interface TemplateEditorProps {
  planName: string;
  initialTemplate: TemplateDefinition;
  onClose: () => void;
  locationContext?: string; 
}

const TemplateEditor: React.FC<TemplateEditorProps> = ({ planName, initialTemplate, onClose, locationContext = "Brasil" }) => {
  const isSystem = planName.includes("Sistema");
  const [isGenerating, setIsGenerating] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [isChatting, setIsChatting] = useState(false);

  const [content, setContent] = useState<AIPageContent>({
    title: "Minha Empresa",
    logoUrl: "",
    primaryColor: initialTemplate.initialContent.primaryColor || "#22d3ee",
    secondaryColor: initialTemplate.initialContent.secondaryColor || "#3b82f6",
    headline: initialTemplate.initialContent.headline || "Transformação Digital",
    subheadline: "Soluções de ponta para o seu negócio.",
    heroTitle: initialTemplate.initialContent.heroTitle || "Elite Digital",
    heroSubtitle: "Alta performance e design.",
    heroImage: initialTemplate.initialContent.heroImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    dashboardStats: [
      { label: "Vendas", value: "R$ 0,00", trend: "+0%" },
      { label: "Leads", value: "0", trend: "+0%" }
    ],
    modules: ["Dashboard", "Gestão", "Relatórios"],
    customSections: [],
    strategy: []
  });

  useEffect(() => {
    if (initialTemplate.id === 'ai-magic') handleGenerateWithIA();
  }, []);

  const handleGenerateWithIA = async () => {
    const niche = prompt(`Localização: ${locationContext}\n\nQual o nicho específico para o seu site?`);
    if (!niche) { onClose(); return; }
    setIsGenerating(true);
    const cityOnly = locationContext.split(' - ')[0];
    const data = await generateMockupContent(content.title, niche, isSystem ? 'system' : 'site', cityOnly);
    setContent(data);
    setIsGenerating(false);
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setIsChatting(true);
    const updated = await updateContentWithChat(content, chatInput, locationContext);
    setContent(updated);
    setChatInput("");
    setIsChatting(false);
  };

  return (
    <div className="fixed inset-0 z-[120] bg-[#030712] flex flex-col md:flex-row h-screen overflow-hidden text-white">
      {/* Sidebar de Edição */}
      <div className="w-full md:w-[400px] bg-[#0a0a0f] border-r border-white/10 flex flex-col h-full relative">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="font-black text-xl gradient-text">FD AI Editor</h2>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">{planName} | {locationContext}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-gray-400">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
           <div className="p-5 rounded-2xl bg-cyan-400/5 border border-cyan-400/20 text-[11px] text-gray-400 leading-relaxed">
             <div className="font-black text-cyan-400 uppercase mb-2">Assistente Cleber IA</div>
             Você está editando para <strong>{locationContext}</strong>. Use o chat abaixo para pedir mudanças inteligentes.
           </div>
           
           <div className="space-y-4">
             <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Configurações Básicas</label>
             <input value={content.title} onChange={e => setContent({...content, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-400 outline-none" placeholder="Nome da Marca" />
             <div className="grid grid-cols-2 gap-4">
               <div>
                 <span className="text-[9px] text-gray-600 block mb-1">Cor Primária</span>
                 <input type="color" value={content.primaryColor} onChange={e => setContent({...content, primaryColor: e.target.value})} className="w-full h-10 rounded-lg bg-transparent border border-white/10 cursor-pointer" />
               </div>
               <div>
                 <span className="text-[9px] text-gray-600 block mb-1">Cor Secundária</span>
                 <input type="color" value={content.secondaryColor} onChange={e => setContent({...content, secondaryColor: e.target.value})} className="w-full h-10 rounded-lg bg-transparent border border-white/10 cursor-pointer" />
               </div>
             </div>
           </div>
        </div>

        {/* Chat de IA Integrado */}
        <div className="p-6 border-t border-white/10 bg-[#0d0d12]">
          <form onSubmit={handleChatSubmit} className="relative">
            {isChatting && (
              <div className="absolute -top-12 left-0 right-0 text-center text-cyan-400 text-[10px] font-black animate-pulse">
                Cleber IA processando em {locationContext}...
              </div>
            )}
            <input 
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              disabled={isChatting}
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-5 pr-12 py-4 text-sm focus:border-cyan-400 outline-none"
              placeholder="Peça uma mudança estratégica..."
            />
            <button type="submit" className="absolute right-3 top-3 p-2 text-cyan-400 hover:text-white">
              {isChatting ? '...' : '⚡'}
            </button>
          </form>
          <button onClick={() => window.open(`https://wa.me/5548999019525?text=Olá Cleber! Finalizei o rascunho de ${content.title} para ${locationContext}. Vamos publicar?`, '_blank')} className="w-full mt-4 bg-white text-black py-4 rounded-2xl font-black text-sm hover:bg-cyan-400 transition-all shadow-xl">
            Publicar Projeto Agora 🚀
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 bg-black p-4 md:p-8 overflow-y-auto custom-scrollbar relative">
        {isGenerating && (
          <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center">
             <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-6"></div>
             <h3 className="text-2xl font-black mb-2">Engajando Estratégia Regional...</h3>
             <p className="text-gray-400 text-sm max-w-xs">IA gerando interface de alta conversão para o mercado de {locationContext}.</p>
          </div>
        )}
        <div className={`max-w-6xl mx-auto rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl min-h-screen bg-[#030712] relative flex flex-col`}>
          {isSystem ? (
            <div className="flex h-full min-h-screen">
              <aside className="w-64 border-r border-white/5 bg-[#0a0a0f] p-8 space-y-10">
                <div className="font-black text-xl" style={{ color: content.primaryColor }}>{content.title}</div>
                <nav className="space-y-3">
                  {content.modules?.map((m, i) => (
                    <div key={i} className={`p-4 rounded-xl text-[10px] font-black uppercase tracking-widest ${i===0 ? 'bg-white/5 text-cyan-400' : 'text-gray-500'}`}>
                      {m}
                    </div>
                  ))}
                </nav>
              </aside>
              <main className="flex-1 p-12 space-y-12">
                <div className="grid grid-cols-3 gap-8">
                  {content.dashboardStats?.map((s, i) => (
                    <div key={i} className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all">
                      <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-3">{s.label}</div>
                      <div className="text-4xl font-black text-white">{s.value}</div>
                      <div className="mt-6 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full rounded-full animate-pulse" style={{ width: '75%', backgroundColor: content.primaryColor }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-white/[0.02] border border-white/10 rounded-[3rem] p-10 aspect-[21/9] flex flex-col">
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-10">Métricas Locais - {locationContext}</h4>
                  <svg className="flex-1 w-full" viewBox="0 0 800 200">
                    <path 
                      d="M0,150 Q100,100 200,130 T400,80 T600,110 T800,40" 
                      fill="none" 
                      stroke={content.primaryColor} 
                      strokeWidth="6" 
                      strokeLinecap="round"
                    />
                    <path 
                      d="M0,150 Q100,100 200,130 T400,80 T600,110 T800,40 V200 H0 Z" 
                      fill={`url(#grad-editor-sys)`} 
                      opacity="0.15"
                    />
                    <defs>
                      <linearGradient id="grad-editor-sys" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{stopColor: content.primaryColor, stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: 'transparent', stopOpacity: 0}} />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </main>
            </div>
          ) : (
            <div className="flex-1 relative">
              <div className="relative h-[600px] flex items-center px-12 md:px-24">
                <img src={content.heroImage} className="absolute inset-0 w-full h-full object-cover opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
                <div className="relative z-10 max-w-2xl">
                  <h1 className="text-5xl md:text-7xl font-black mb-8 leading-none tracking-tighter">{content.headline}</h1>
                  <p className="text-lg md:text-xl text-white/50 mb-10 leading-relaxed">{content.subheadline}</p>
                  <button className="px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest text-white shadow-xl" style={{ backgroundColor: content.primaryColor }}>
                    Começar Transformação
                  </button>
                </div>
              </div>
              
              {/* Estratégia no Preview */}
              <div className="py-24 px-12 md:px-24 bg-white/[0.01]">
                <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-12 text-center">Plano de Sucesso para {locationContext}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {content.strategy?.map((s, i) => (
                    <div key={i} className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.01]">
                       <div className="text-2xl font-black text-cyan-400 mb-4">0{i+1}</div>
                       <p className="text-sm text-gray-400 leading-relaxed">{s}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="py-32 px-12 md:px-24 space-y-32">
                {content.customSections?.map(sec => (
                  <div key={sec.id} className={`flex flex-col gap-20 items-center ${sec.imagePosition === 'right' ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="flex-1 space-y-8">
                      <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">{sec.title}</h2>
                      <div className="h-2 w-20 rounded-full" style={{ backgroundColor: content.primaryColor }} />
                      <p className="text-xl text-white/40 leading-relaxed">{sec.text}</p>
                    </div>
                    {sec.imageUrl && (
                      <div className="flex-1">
                        <img src={sec.imageUrl} className="rounded-[3rem] shadow-2xl border border-white/10 w-full aspect-video object-cover" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default TemplateEditor;
