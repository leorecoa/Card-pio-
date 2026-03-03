import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { formatCurrency } from '../utils';
import { useCartStore } from '../store';

interface ProductCardProps {
  product: Product;
  key?: React.Key;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const imageUrl = product.image_url || `https://picsum.photos/seed/${product.id}/600/800`;
  
  const [rotate, setRotate] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="bg-zinc-900/30 backdrop-blur-xl border border-white/5 rounded-[48px] overflow-hidden group transition-all duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.7)] hover:border-emerald-500/30 perspective-[1000px] h-full flex flex-col"
    >
      <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden flex-shrink-0">
        <motion.img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
        
        {/* Quick View Hint */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="px-6 py-3 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl text-white font-black text-[10px] uppercase tracking-[0.3em] translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            Ver Detalhes
          </div>
        </div>

        {/* Floating Price Tag */}
        <div className="absolute top-6 right-6 px-5 py-2.5 bg-emerald-500 text-black font-black rounded-2xl shadow-[0_10px_20px_rgba(16,185,129,0.3)] transform -rotate-3 group-hover:rotate-6 transition-transform duration-500">
          <span className="text-sm tracking-tighter">
            {formatCurrency(product.price)}
          </span>
        </div>

        {/* Category Tag */}
        <div className="absolute top-6 left-6">
          <span className="px-3 py-1 bg-white/5 backdrop-blur-xl border border-white/10 text-zinc-400 text-[8px] font-black uppercase tracking-widest rounded-lg">
            {product.category_name}
          </span>
        </div>
      </Link>

      <div className="p-8 flex flex-col flex-grow justify-between">
        <div className="space-y-3 mb-8">
          <h3 className="text-2xl font-black text-white tracking-tighter leading-none group-hover:text-emerald-400 transition-colors">
            {product.name}
          </h3>
          <p className="text-zinc-500 text-xs font-medium line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.preventDefault();
            addItem(product);
          }}
          className="w-full flex items-center justify-center space-x-3 bg-zinc-950 hover:bg-emerald-500 text-zinc-500 hover:text-black py-5 rounded-[24px] font-black transition-all duration-500 border border-white/5 hover:border-emerald-500 group/btn"
        >
          <Plus className="h-5 w-5 group-hover/btn:rotate-90 transition-transform" />
          <span className="text-[10px] tracking-[0.3em] uppercase">Adicionar</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
