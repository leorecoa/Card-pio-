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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-[32px] overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10"
    >
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        
        {/* Floating Price Tag */}
        <div className="absolute top-4 right-4 px-4 py-2 bg-zinc-950/60 backdrop-blur-md border border-white/10 rounded-2xl">
          <span className="text-emerald-400 font-black tracking-tight">
            {formatCurrency(product.price)}
          </span>
        </div>
      </Link>

      <div className="p-6">
        <Link to={`/product/${product.id}`} className="block mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors tracking-tight">
            {product.name}
          </h3>
        </Link>
        <p className="text-zinc-500 text-sm line-clamp-2 mb-6 leading-relaxed">
          {product.description}
        </p>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => addItem(product)}
          className="w-full flex items-center justify-center space-x-2 bg-white text-black hover:bg-emerald-500 hover:text-black py-4 rounded-2xl font-black transition-all duration-300 shadow-lg shadow-black/20"
        >
          <Plus className="h-5 w-5" />
          <span>ADICIONAR</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
