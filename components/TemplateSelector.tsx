
import React from 'react';
import { TemplateDefinition } from '../types';

const aiTemplate: TemplateDefinition = {
  id: "ai-magic",
  name: "Gerar com IA (Mágico)",
  description: "Deixe nossa IA criar todo o conteúdo, textos e imagens do zero para o seu nicho específico.",
  preview: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400",
  initialContent: { primaryColor: "#22d3ee", secondaryColor: "#3b82f6" }
};

const templatesByPlan: Record<string, TemplateDefinition[]> = {
  "Site Essencial": [
    aiTemplate,
    {
      id: "barber-style",
      name: "Barbearia Vintage",
      description: "Estilo clássico e sofisticado para barbearias e salões masculinos.",
      preview: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=400",
      initialContent: { primaryColor: "#d97706", secondaryColor: "#1c1917", heroImage: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=1200", heroTitle: "O Corte Perfeito para o Homem Moderno" }
    },
    {
      id: "gym-style",
      name: "Academia High-Energy",
      description: "Design vibrante focado em performance e resultados.",
      preview: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400",
      initialContent: { primaryColor: "#eab308", secondaryColor: "#000000", heroImage: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=1200", heroTitle: "Supere Seus Limites Hoje" }
    }
  ],
  "E-commerce Pro": [
    aiTemplate,
    {
      id: "fashion-fem",
      name: "Fashion Feminina",
      description: "Elegante e chic, ideal para boutiques e lojas de acessórios.",
      preview: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=400",
      initialContent: { primaryColor: "#f43f5e", secondaryColor: "#fff1f2", heroImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200", heroTitle: "Sua Nova Coleção Chegou" }
    },
    {
      id: "fashion-masc",
      name: "Moda Masculina Urban",
      description: "Visual urbano e moderno para o público masculino.",
      preview: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&q=80&w=400",
      initialContent: { primaryColor: "#0f172a", secondaryColor: "#f8fafc", heroImage: "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=1200", heroTitle: "O Estilo que Define Você" }
    }
  ],
  "Sistema Custom": [
    aiTemplate,
    {
      id: "glass-dashboard",
      name: "Gestão Enterprise",
      description: "Interface moderna para ERPs e Dashboards administrativos.",
      preview: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400",
      initialContent: { primaryColor: "#3b82f6", secondaryColor: "#ffffff", heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200", heroTitle: "Sua Empresa Sob Controle" }
    }
  ]
};

interface TemplateSelectorProps {
  planName: string;
  onSelect: (template: TemplateDefinition) => void;
  onCancel: () => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ planName, onSelect, onCancel }) => {
  const templates = templatesByPlan[planName] || templatesByPlan["Site Essencial"];

  return (
    <div className="fixed inset-0 z-[110] bg-[#030712] flex flex-col items-center p-6 overflow-y-auto scroll-smooth">
      <div className="max-w-6xl w-full pt-24 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-black text-white mb-2">Escolha seu <span className="text-cyan-400">Estilo Visual</span></h2>
            <p className="text-gray-500">Selecione o ponto de partida ideal para o seu nicho no plano {planName}.</p>
          </div>
          <button 
            onClick={onCancel} 
            className="px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-sm font-bold"
          >
            ← Voltar
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((tpl) => (
            <div 
              key={tpl.id}
              onClick={() => onSelect(tpl)}
              className={`group cursor-pointer bg-white/5 border rounded-[2.5rem] overflow-hidden transition-all hover:-translate-y-2 flex flex-col h-full shadow-2xl ${
                tpl.id === 'ai-magic' ? 'border-cyan-400/50 shadow-[0_0_50px_rgba(6,182,212,0.1)]' : 'border-white/10 hover:border-cyan-400'
              }`}
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img src={tpl.preview} alt={tpl.name} className={`w-full h-full object-cover transition-all duration-700 ${tpl.id === 'ai-magic' ? '' : 'grayscale group-hover:grayscale-0'}`} />
                {tpl.id === 'ai-magic' && (
                   <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 mix-blend-overlay" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-60" />
                {tpl.id === 'ai-magic' && (
                  <div className="absolute top-4 right-4 bg-cyan-400 text-black text-[10px] font-black px-3 py-1 rounded-full animate-pulse">
                    NOVO ✨
                  </div>
                )}
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="mb-4">
                  <h3 className={`text-xl font-bold mb-2 transition-colors ${tpl.id === 'ai-magic' ? 'text-cyan-400' : 'group-hover:text-cyan-400'}`}>
                    {tpl.name}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{tpl.description}</p>
                </div>
                <div className="mt-auto pt-6 border-t border-white/5">
                  <button className={`w-full py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                    tpl.id === 'ai-magic' ? 'bg-cyan-400 text-black' : 'bg-white/5 border border-white/10 group-hover:bg-cyan-400 group-hover:text-black'
                  }`}>
                    {tpl.id === 'ai-magic' ? 'Gerar com IA Agora' : 'Customizar Este'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
