
import React from 'react';

const cases = [
  {
    title: "A Mais Indicada",
    category: "Cachaçaria & Bebidas de Alambique",
    image: "https://images.unsplash.com/photo-1568271675068-f76a588bb593?auto=format&fit=crop&q=80&w=800",
    desc: "Transformamos a tradição dos alambiques em uma experiência digital premium. E-commerce robusto com gestão de estoque por barris, catálogo sensorial e logística para colecionadores de bebidas artesanais.",
    url: "https://amaisindicada.com.br/"
  },
  {
    title: "Chatguru",
    category: "SaaS / Automação WhatsApp",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800",
    desc: "Líder em automação de atendimento. Dashboard complexo de métricas, bots inteligentes e gestão de múltiplos atendentes em um único número.",
    url: "https://chatguru.com.br/"
  },
  {
    title: "FFlip",
    category: "Marketplace Digital",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    desc: "Plataforma focada em performance e UX para o mercado financeiro e de investimentos digitais.",
    url: "https://www.fflip.com.br/"
  },
  {
    title: "Doctor Assistant",
    category: "HealthTech / IA",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    desc: "Copiloto de IA para médicos, otimizando o preenchimento de prontuários e a gestão da agenda clínica.",
    url: "https://doctorassistant.ai/"
  }
];

const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Projetos de <br /><span className="text-cyan-400">Elite</span></h2>
            <p className="text-gray-400 text-lg">Cases reais de empresas que confiaram na FD Developer Web para escalar seus resultados online.</p>
          </div>
          <div className="flex items-center gap-4 text-sm font-bold text-gray-500">
            <span>Explorar Cases</span>
            <div className="w-12 h-[1px] bg-white/10" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {cases.map((c, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-6 border border-white/10 shadow-2xl bg-[#0a0a0a]">
                <img 
                  src={c.image} 
                  alt={c.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=800'; 
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/10 to-transparent opacity-90" />
                <div className="absolute bottom-8 left-8">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-cyan-400 border border-cyan-400/20 mb-2 block w-fit">
                    {c.category}
                  </span>
                  <h3 className="text-3xl font-bold text-white">{c.title}</h3>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">{c.desc}</p>
              <div className="flex items-center gap-2">
                <a 
                  href={c.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-cyan-400 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2"
                >
                  Ver Projeto 
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
