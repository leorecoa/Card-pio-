import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { formatCurrency } from '../utils';
import { Product } from '../types';

interface PromotionHeroProps {
  products: Product[];
}

export function PromotionHero({ products }: PromotionHeroProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const featuredProducts = products.slice(0, 5);

  const next = () => setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);

  React.useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, [featuredProducts.length]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePosition({
      x: (clientX / innerWidth - 0.5) * 20,
      y: (clientY / innerHeight - 0.5) * 20,
    });
  };

  if (featuredProducts.length === 0) return null;

  const currentProduct = featuredProducts[currentIndex];

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[90vh] lg:min-h-screen bg-zinc-950 flex items-center justify-center py-12 lg:py-24 overflow-hidden"
    >
      {/* 1. Advanced Parallax Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            x: mousePosition.x * -1.5,
            y: mousePosition.y * -1.5,
          }}
          className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] bg-emerald-500/10 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ 
            x: mousePosition.x * 1.2,
            y: mousePosition.y * 1.2,
          }}
          className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-emerald-900/10 blur-[120px] rounded-full" 
        />
        
        {/* Floating Decorative Elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              y: [0, -40, 0],
              x: [0, 20, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 10 + i * 2, 
              repeat: Infinity, 
              ease: "linear",
              delay: i * 1.5
            }}
            className="absolute text-emerald-500/20"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + (i * 17) % 80}%`,
            }}
          >
            <Sparkles size={12 + i * 4} />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left Side: Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3 mb-8"
          >
            <span className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em] rounded-full">
              Experiência Gourmet
            </span>
            <div className="flex items-center text-amber-400 text-[10px] bg-amber-400/10 px-3 py-1.5 rounded-full border border-amber-400/20 font-black">
              <Star className="h-3 w-3 fill-current mr-1.5" />
              <span>TOP RATED</span>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter">
                {currentProduct.name.split(' ').map((word, i) => (
                  <span key={i} className="inline-block mr-4">
                    {word === 'Especial' ? <span className="text-emerald-500">{word}</span> : word}
                  </span>
                ))}
              </h2>
              
              <p className="text-zinc-400 text-lg lg:text-xl max-w-xl font-medium leading-relaxed opacity-80">
                {currentProduct.description}
              </p>

              <div className="flex flex-col items-center lg:items-start space-y-2">
                <span className="text-zinc-500 text-[10px] uppercase tracking-[0.5em] font-bold">Valor da Experiência</span>
                <div className="text-5xl lg:text-7xl font-black text-white tracking-tighter flex items-baseline">
                  <span className="text-2xl lg:text-3xl text-emerald-500 mr-2">R$</span>
                  {currentProduct.price.toFixed(2).replace('.', ',')}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                <motion.button
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-12 py-6 bg-emerald-500 text-black font-black text-lg rounded-2xl transition-all shadow-[0_20px_50px_rgba(16,185,129,0.4)] flex items-center space-x-4 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                  <span className="relative z-10">PEDIR AGORA</span>
                  <ArrowRight className="relative z-10 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                
                <button className="px-10 py-6 border border-white/10 text-white font-bold text-lg rounded-2xl hover:bg-white/5 transition-all backdrop-blur-sm flex items-center space-x-3 group">
                  <span>VER DETALHES</span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 group-hover:scale-150 transition-transform" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Visuals */}
        <div className="relative flex items-center justify-center order-1 lg:order-2">
          {/* Navigation Controls - Floating */}
          <div className="absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 flex flex-col space-y-4 z-30">
            <button 
              onClick={prev}
              className="p-4 rounded-full border border-white/10 text-white/40 hover:text-white hover:bg-emerald-500 hover:border-emerald-500 transition-all backdrop-blur-xl group"
            >
              <ChevronLeft className="h-6 w-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={next}
              className="p-4 rounded-full border border-white/10 text-white/40 hover:text-white hover:bg-emerald-500 hover:border-emerald-500 transition-all backdrop-blur-xl group"
            >
              <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Main Image Container */}
          <div className="relative w-full aspect-square max-w-[550px] perspective-[2000px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.8, rotateY: 20, rotateX: 10 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotateY: mousePosition.x * 0.5,
                  rotateX: mousePosition.y * -0.5,
                  y: [0, -20, 0]
                }}
                exit={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.16, 1, 0.3, 1],
                  y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }}
                className="relative z-20 w-full h-full"
              >
                {/* Glow Aura */}
                <div className="absolute inset-[-10%] bg-emerald-500/20 blur-[100px] rounded-full animate-pulse" />
                
                <div className="relative w-full h-full rounded-[60px] lg:rounded-[80px] overflow-hidden shadow-[0_50px_120px_rgba(0,0,0,0.9)] border border-white/10 group">
                  <motion.img
                    src={currentProduct.image_url || `https://picsum.photos/seed/${currentProduct.id}/1000/1000`}
                    alt={currentProduct.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Glass Overlay Info */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-10 left-10 right-10 p-6 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-black">
                        <Clock size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] text-zinc-400 uppercase font-black tracking-widest">Preparo</p>
                        <p className="text-white font-bold">25-35 min</p>
                      </div>
                    </div>
                    <div className="h-10 w-px bg-white/10" />
                    <div className="text-right">
                      <p className="text-[10px] text-zinc-400 uppercase font-black tracking-widest">Calorias</p>
                      <p className="text-white font-bold">450 kcal</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress Indicators - Vertical Side */}
            <div className="absolute -right-8 lg:-right-16 top-1/2 -translate-y-1/2 flex flex-col space-y-3">
              {featuredProducts.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className="group relative flex items-center justify-end"
                >
                  <span className={`mr-4 text-[10px] font-black transition-all duration-300 ${idx === currentIndex ? 'text-emerald-500 opacity-100' : 'text-white opacity-0 group-hover:opacity-40'}`}>
                    0{idx + 1}
                  </span>
                  <div className={`transition-all duration-500 rounded-full ${
                    idx === currentIndex ? 'h-12 w-1.5 bg-emerald-500' : 'h-3 w-1.5 bg-white/10 group-hover:bg-white/30'
                  }`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background Text - Brutalist Element */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-[0.02] select-none">
        <motion.h1 
          animate={{ x: [0, -1000, 0] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="text-[25vw] font-black text-white whitespace-nowrap leading-none"
        >
          {currentProduct.name} • {currentProduct.name} • {currentProduct.name}
        </motion.h1>
      </div>
    </div>
  );
}
