
import React from 'react';

const Header: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-white text-xl">
            FD
          </div>
          <span className="text-xl font-extrabold tracking-tight">
            Developer <span className="text-cyan-400">Web</span>
          </span>
        </a>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#packages" onClick={(e) => scrollToSection(e, 'packages')} className="hover:text-white transition-colors">Planos</a>
          <a href="#portfolio" onClick={(e) => scrollToSection(e, 'portfolio')} className="hover:text-white transition-colors">Portfólio</a>
          <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="hover:text-white transition-colors">FAQ</a>
        </nav>

        <a 
          href="https://wa.me/5548999019525" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all border border-white/10"
        >
          Contato
        </a>
      </div>
    </header>
  );
};

export default Header;
