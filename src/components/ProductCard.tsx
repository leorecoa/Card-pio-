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
  const imageUrl = product.image_url || `https://picsum.photos/seed/${product.id}/400/300`;
  
  const [rotate, setRotate] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-[40px] overflow-hidden group transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)] hover:border-emerald-500/30 perspective-[1000px]"
    >
      <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden">
        <motion.img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
        
        {/* Floating Price Tag - Crafted Style */}
        <div className="absolute top-6 right-6 px-5 py-2.5 bg-emerald-500 text-black font-black rounded-2xl shadow-xl shadow-emerald-500/20 transform -rotate-3 group-hover:rotate-0 transition-transform">
          <span className="text-sm tracking-tighter">
            {formatCurrency(product.price)}
          </span>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="space-y-2"
          >
            <h3 className="text-2xl font-black text-white tracking-tighter leading-none">
              {product.name}
            </h3>
            <p className="text-zinc-400 text-xs font-medium line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              {product.description}
            </p>
          </motion.div>
        </div>
      </Link>

      <div className="p-6 pt-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => addItem(product)}
          className="w-full flex items-center justify-center space-x-3 bg-white/5 hover:bg-emerald-500 text-white hover:text-black py-5 rounded-3xl font-black transition-all duration-300 border border-white/5 hover:border-emerald-500 shadow-lg group/btn"
        >
          <Plus className="h-5 w-5 group-hover/btn:rotate-90 transition-transform" />
          <span className="text-sm tracking-widest uppercase">Adicionar</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
