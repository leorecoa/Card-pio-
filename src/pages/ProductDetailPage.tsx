import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services';
import { Product } from '../types';
import { useCartStore } from '../store';
import { formatCurrency } from '../utils';
import { ArrowLeft, Plus, Clock, Flame, Leaf, Star, ShieldCheck, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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

  if (loading) return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="h-12 w-12 border-t-2 border-emerald-500 rounded-full"
      />
    </div>
  );

  if (!product) return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white p-4">
      <h2 className="text-4xl font-black tracking-tighter mb-4">Produto não encontrado.</h2>
      <button onClick={() => navigate('/')} className="text-emerald-500 font-bold hover:underline">Voltar ao início</button>
    </div>
  );

  const imageUrl = product.image_url || `https://picsum.photos/seed/${product.id}/1000/1000`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="bg-zinc-950 min-h-screen pb-24">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-emerald-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-900/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 relative z-10">
        <motion.button 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="group flex items-center space-x-3 text-zinc-500 hover:text-white mb-12 transition-all"
        >
          <div className="p-2 rounded-full border border-white/5 group-hover:border-white/20 transition-colors">
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          </div>
          <span className="font-bold text-sm uppercase tracking-widest">Voltar ao Cardápio</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Left: Image Section */}
          <div className="lg:col-span-7 sticky top-32">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] lg:aspect-square rounded-[60px] overflow-hidden border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] group"
            >
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8 }}
                src={imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
              
              {/* Floating Action Buttons on Image */}
              <div className="absolute top-8 right-8 flex flex-col space-y-4">
                <button className="p-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl text-white hover:bg-emerald-500 hover:text-black transition-all">
                  <Share2 size={20} />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right: Content Section */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 flex flex-col"
          >
            <motion.div variants={itemVariants} className="mb-10">
              <div className="flex items-center space-x-4 mb-6">
                <span className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em] rounded-full">
                  {product.category_name}
                </span>
                <div className="flex items-center text-amber-400 text-[10px] font-black uppercase tracking-widest">
                  <Star className="h-3 w-3 fill-current mr-1.5" />
                  <span>4.9 (120+ Avaliações)</span>
                </div>
              </div>
              
              <h1 className="text-6xl lg:text-8xl font-black text-white mb-6 tracking-tighter leading-[0.85]">
                {product.name}
              </h1>
              
              <div className="flex items-baseline space-x-3">
                <span className="text-2xl lg:text-3xl font-black text-emerald-500">R$</span>
                <span className="text-5xl lg:text-7xl font-black text-white tracking-tighter">
                  {product.price.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </motion.div>

            <motion.p variants={itemVariants} className="text-zinc-400 text-xl font-medium leading-relaxed mb-12 opacity-80">
              {product.description}
            </motion.p>

            {/* Features Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6 mb-12">
              <div className="bg-zinc-900/30 p-6 rounded-[32px] border border-white/5 flex flex-col items-center text-center group hover:border-emerald-500/30 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-zinc-950 flex items-center justify-center text-zinc-500 mb-4 group-hover:text-emerald-500 transition-colors">
                  <Clock size={24} />
                </div>
                <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-1">Preparo</span>
                <span className="text-white font-bold">20-25 min</span>
              </div>
              <div className="bg-zinc-900/30 p-6 rounded-[32px] border border-white/5 flex flex-col items-center text-center group hover:border-emerald-500/30 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-zinc-950 flex items-center justify-center text-zinc-500 mb-4 group-hover:text-amber-500 transition-colors">
                  <Flame size={24} />
                </div>
                <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-1">Calorias</span>
                <span className="text-white font-bold">450 kcal</span>
              </div>
              <div className="bg-zinc-900/30 p-6 rounded-[32px] border border-white/5 flex flex-col items-center text-center group hover:border-emerald-500/30 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-zinc-950 flex items-center justify-center text-zinc-500 mb-4 group-hover:text-emerald-400 transition-colors">
                  <Leaf size={24} />
                </div>
                <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-1">Orgânico</span>
                <span className="text-white font-bold">100% Nat.</span>
              </div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div variants={itemVariants} className="flex items-center space-x-6 mb-12 p-6 bg-zinc-900/20 rounded-3xl border border-white/5">
              <ShieldCheck className="text-emerald-500 h-8 w-8" />
              <div>
                <p className="text-white font-bold text-sm">Garantia de Qualidade</p>
                <p className="text-zinc-500 text-xs">Ingredientes selecionados e frescos diariamente.</p>
              </div>
            </motion.div>

            {/* Action Button */}
            <motion.div variants={itemVariants} className="mt-auto">
              <motion.button
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => addItem(product)}
                className="group w-full flex items-center justify-center space-x-4 bg-emerald-500 text-black py-6 rounded-[32px] font-black text-xl transition-all shadow-[0_20px_50px_rgba(16,185,129,0.4)] relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                <Plus className="h-7 w-7 relative z-10" />
                <span className="relative z-10">ADICIONAR AO PEDIDO</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
