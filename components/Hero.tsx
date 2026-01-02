
import React from 'react';

interface HeroProps {
  onStartQuiz: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartQuiz }) => {
  const scrollToPackages = () => {
    const element = document.getElementById('packages');
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative pt-40 pb-20 px-6 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-8 animate-float">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          Desenvolvimento Premium & Sistemas
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-[1.1] tracking-tight">
          Sua empresa merece um <br />
          <span className="gradient-text">Site que vende de verdade</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Sistemas sob medida e Landing Pages de alta conversão. Descubra quanto o seu negócio pode faturar a mais com nossa tecnologia.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={onStartQuiz}
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-[0_0_40px_rgba(6,182,212,0.3)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
            Começar Diagnóstico Grátis
          </button>

          <button 
            onClick={scrollToPackages}
            className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all"
          >
            Ver Planos & Preços
          </button>
        </div>
        
        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="flex -space-x-3 items-center">
            {[1, 2, 3, 4].map((i) => (
              <img 
                key={i} 
                src={`https://picsum.photos/seed/${i + 10}/40/40`} 
                className="w-10 h-10 rounded-full border-2 border-[#030712]" 
                alt="user"
              />
            ))}
          </div>
          <div className="text-sm text-gray-400">
            <span className="text-white font-bold">+50</span> empresas transformadas pela nossa tecnologia
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
