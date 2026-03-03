import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Instagram, Twitter, Facebook, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/5 pt-24 pb-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Section */}
          <div className="space-y-8">
            <Link to="/" className="group flex items-center space-x-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-[0_10px_20px_rgba(16,185,129,0.3)]">
                <span className="text-black font-black text-2xl tracking-tighter">M</span>
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">
                Menu<span className="text-emerald-500">Pro.</span>
              </span>
            </Link>
            <p className="text-zinc-500 font-medium leading-relaxed">
              Elevando a experiência gastronômica digital com tecnologia de ponta e design artesanal.
            </p>
            <div className="flex items-center space-x-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -4, scale: 1.1 }}
                  className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-500 hover:text-white hover:border-white/20 transition-all"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.4em] mb-10">Navegação</h4>
            <ul className="space-y-4">
              {['Cardápio', 'Ofertas', 'Sobre Nós', 'Contatos'].map((item, i) => (
                <li key={i}>
                  <Link to="/" className="text-zinc-500 hover:text-emerald-500 font-bold transition-colors flex items-center group">
                    <span className="w-0 group-hover:w-4 h-px bg-emerald-500 mr-0 group-hover:mr-3 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.4em] mb-10">Contato</h4>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-emerald-500 flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <span className="text-zinc-500 font-medium text-sm leading-relaxed">
                  Av. Paulista, 1000<br />Bela Vista, São Paulo - SP
                </span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-emerald-500 flex-shrink-0">
                  <Phone size={18} />
                </div>
                <span className="text-zinc-500 font-medium text-sm">(11) 99999-9999</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.4em] mb-10">Newsletter</h4>
            <p className="text-zinc-500 text-sm mb-6 font-medium">Receba ofertas exclusivas e novidades.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="w-full bg-zinc-900 border border-white/5 rounded-2xl py-4 pl-6 pr-14 text-white focus:outline-none focus:border-emerald-500/50 transition-all font-medium"
              />
              <button className="absolute right-2 top-2 bottom-2 w-10 bg-emerald-500 rounded-xl flex items-center justify-center text-black hover:scale-105 transition-transform">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">
            © {new Date().getFullYear()} MenuPro Digital. Todos os direitos reservados.
          </p>
          <div className="flex items-center space-x-8">
            <a href="#" className="text-zinc-600 hover:text-zinc-400 text-[10px] font-black uppercase tracking-widest transition-colors">Termos de Uso</a>
            <a href="#" className="text-zinc-600 hover:text-zinc-400 text-[10px] font-black uppercase tracking-widest transition-colors">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
