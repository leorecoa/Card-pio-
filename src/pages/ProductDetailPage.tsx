import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services';
import { Product } from '../types';
import { useCartStore } from '../store';
import { formatCurrency } from '../utils';
import { ArrowLeft, Plus, Clock, Flame, Leaf } from 'lucide-react';
import { motion } from 'motion/react';

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = React.useState<Product | null>(null);
  const [loading, setLoading] = React.useState(true);
  const addItem = useCartStore((state) => state.addItem);

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        const products = await api.getProducts();
        const found = products.find(p => p.id === Number(id));
        setProduct(found || null);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500"></div></div>;
  if (!product) return <div className="text-center py-20 text-white">Produto não encontrado.</div>;

  const imageUrl = product.image_url || `https://picsum.photos/seed/${product.id}/400/300`;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-zinc-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Voltar</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative aspect-square rounded-3xl overflow-hidden border border-white/5"
        >
          <img 
            src={imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
              {product.category_name}
            </span>
            <h1 className="text-4xl font-bold text-white mb-2">{product.name}</h1>
            <p className="text-2xl font-bold text-emerald-400">{formatCurrency(product.price)}</p>
          </div>

          <p className="text-zinc-400 text-lg leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="bg-zinc-900/50 p-4 rounded-2xl border border-white/5 text-center">
              <Clock className="h-5 w-5 text-zinc-500 mx-auto mb-2" />
              <span className="text-xs text-zinc-500 block">Preparo</span>
              <span className="text-sm text-white font-medium">15-20 min</span>
            </div>
            <div className="bg-zinc-900/50 p-4 rounded-2xl border border-white/5 text-center">
              <Flame className="h-5 w-5 text-zinc-500 mx-auto mb-2" />
              <span className="text-xs text-zinc-500 block">Calorias</span>
              <span className="text-sm text-white font-medium">450 kcal</span>
            </div>
            <div className="bg-zinc-900/50 p-4 rounded-2xl border border-white/5 text-center">
              <Leaf className="h-5 w-5 text-zinc-500 mx-auto mb-2" />
              <span className="text-xs text-zinc-500 block">Orgânico</span>
              <span className="text-sm text-white font-medium">Sim</span>
            </div>
          </div>

          <button
            onClick={() => addItem(product)}
            className="mt-auto w-full flex items-center justify-center space-x-3 bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
          >
            <Plus className="h-6 w-6" />
            <span>Adicionar ao Pedido</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
