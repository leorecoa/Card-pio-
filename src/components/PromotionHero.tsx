import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, Clock, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../utils';
import { Product } from '../types';

interface PromotionHeroProps {
  products: Product[];
}

export function PromotionHero({ products }: PromotionHeroProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const featuredProducts = products.slice(0, 5); // Use up to 5 products for a better queue

  const next = () => setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);

  React.useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [featuredProducts.length]);

  if (featuredProducts.length === 0) return null;

  const getProductAt = (offset: number) => {
    const index = (currentIndex + offset + featuredProducts.length) % featuredProducts.length;
    return featuredProducts[index];
  };

  return (
    <div className="relative w-full h-auto lg:min-h-screen bg-zinc-950 flex items-center justify-center py-12 lg:py-24 overflow-hidden">
      {/* Immersive Background Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-emerald-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex flex-col items-center">
        
        {/* 1. Header & Title (Above Image) */}
        <div className="text-center mb-10 lg:mb-14 space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-[0.3em] rounded-full">
              Destaque do Dia
            </span>
            <div className="flex items-center text-amber-400 text-[10px] bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
              <Star className="h-3 w-3 fill-current mr-1" />
              <span className="font-bold">4.9</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1] tracking-tighter line-clamp-2 max-w-3xl mx-auto">
                {getProductAt(0).name}
              </h2>
              <p className="text-zinc-500 text-sm sm:text-base lg:text-lg max-w-xl mx-auto font-medium line-clamp-2 opacity-80">
                {getProductAt(0).description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 2. Product Image & Side Navigation (Center) */}
        <div className="relative w-full flex items-center justify-center mb-12 lg:mb-16 px-12 sm:px-0">
          {/* Navigation - Left */}
          <button 
            onClick={prev}
            className="absolute left-0 sm:-left-16 lg:-left-24 z-30 p-3 sm:p-5 rounded-full border border-white/5 text-white/20 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all backdrop-blur-md group"
          >
            <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8 group-hover:-translate-x-1 transition-transform" />
          </button>

          {/* Active Product Image */}
          <div className="relative h-[280px] sm:h-[420px] lg:h-[500px] w-full max-w-[500px] flex items-center justify-center perspective-[2000px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.85, rotateY: -10 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotateY: 0,
                  y: [0, -12, 0] 
                }}
                exit={{ opacity: 0, scale: 0.85, rotateY: 10 }}
                transition={{ 
                  duration: 0.6, 
                  ease: [0.23, 1, 0.32, 1],
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className="relative z-20 w-full aspect-square"
              >
                {/* Visual Depth Elements */}
                <div className="absolute inset-0 bg-emerald-500/10 blur-[80px] rounded-full scale-75 animate-pulse" />
                
                <div className="relative w-full h-full rounded-[40px] lg:rounded-[56px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/10 group">
                  <motion.img
                    animate={{ rotate: [0, 1.5, 0, -1.5, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    src={getProductAt(0).image_url || `https://picsum.photos/seed/${getProductAt(0).id}/800/800`}
                    alt={getProductAt(0).name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation - Right */}
          <button 
            onClick={next}
            className="absolute right-0 sm:-right-16 lg:-right-24 z-30 p-3 sm:p-5 rounded-full border border-white/5 text-white/20 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all backdrop-blur-md group"
          >
            <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3. Price & Action (Below Image) */}
        <div className="w-full flex flex-col items-center space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center space-y-8 w-full"
            >
              <div className="text-center">
                <span className="text-zinc-500 text-[9px] uppercase tracking-[0.4em] font-bold mb-2 block">Investimento Gourmet</span>
                <span className="text-5xl sm:text-7xl font-black text-white tracking-tighter">
                  {formatCurrency(getProductAt(0).price)}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-10 py-5 bg-emerald-600 text-white font-black text-base lg:text-lg rounded-2xl transition-all shadow-[0_20px_40px_rgba(16,185,129,0.3)] flex items-center justify-center space-x-3"
                >
                  <span>Adicionar ao Pedido</span>
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
                <button className="w-full px-10 py-5 border border-white/10 text-white font-bold text-base lg:text-lg rounded-2xl hover:bg-white/5 transition-all backdrop-blur-sm">
                  Personalizar
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicators */}
          <div className="flex space-x-2 pt-4">
            {featuredProducts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  idx === currentIndex ? 'w-10 bg-emerald-500' : 'w-2 bg-white/10 hover:bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Subtle Scroll Hint */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center space-y-2 opacity-10"
      >
        <div className="w-px h-10 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </div>
  );
}
