import React from 'react';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore, useAuthStore } from '../store';
import { formatCurrency } from '../utils';
import { motion, AnimatePresence } from 'motion/react';
import { api } from '../services';

export function CartPage() {
  const { items, updateQuantity, removeItem, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = React.useState(false);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleWhatsAppCheckout = () => {
    const phoneNumber = '5511999999999'; // Exemplo de número
    const itemsList = items.map(item => `${item.quantity}x ${item.name} - ${formatCurrency(item.price * item.quantity)}`).join('\n');
    const message = `Olá! Gostaria de fazer um pedido:\n\n${itemsList}\n\n*Total: ${formatCurrency(total)}*`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;
    
    setIsCheckingOut(true);
    try {
      await api.createOrder({
        items: items.map(i => ({ id: i.id, quantity: i.quantity, price: i.price })),
        total,
        userId: user?.id
      });
      clearCart();
      alert('Pedido realizado com sucesso!');
      navigate('/');
    } catch (error) {
      alert('Erro ao processar pedido. Tente novamente.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-zinc-900/20 border border-white/5 rounded-[64px] p-12 sm:p-24 max-w-3xl mx-auto relative overflow-hidden"
        >
          {/* Decorative Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-emerald-500/5 blur-[100px] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="w-32 h-32 bg-zinc-950 rounded-[40px] flex items-center justify-center mx-auto mb-12 border border-white/10 shadow-2xl">
              <ShoppingBag className="h-12 w-12 text-zinc-800" />
            </div>
            <h2 className="text-5xl sm:text-7xl font-black text-white mb-6 tracking-tighter leading-none">
              Seu carrinho <br /><span className="text-emerald-500">está vazio.</span>
            </h2>
            <p className="text-zinc-500 text-xl mb-16 font-medium max-w-md mx-auto leading-relaxed">
              Parece que você ainda não escolheu sua próxima experiência gastronômica.
            </p>
            <Link to="/" className="group inline-flex items-center justify-center bg-emerald-500 text-black px-16 py-6 rounded-[24px] font-black text-lg uppercase tracking-widest transition-all hover:scale-105 shadow-[0_20px_50px_rgba(16,185,129,0.3)]">
              <span>EXPLORAR CARDÁPIO</span>
              <ArrowRight className="ml-4 h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
        <div>
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/')}
            className="flex items-center space-x-3 text-zinc-500 hover:text-white mb-10 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center group-hover:border-white/20">
              <ShoppingBag size={14} className="group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest">Voltar ao Cardápio</span>
          </motion.button>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4 mb-6"
          >
            <div className="h-px w-12 bg-emerald-500" />
            <span className="text-emerald-500 font-black text-xs uppercase tracking-[0.4em]">Checkout</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.85]"
          >
            Seu <span className="text-emerald-500">Carrinho.</span>
          </motion.h1>
        </div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-500 text-xl font-medium max-w-xs lg:text-right leading-relaxed"
        >
          Revise seus itens e finalize sua experiência gastronômica.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        <div className="lg:col-span-7 space-y-8">
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => {
              const imageUrl = item.image_url || `https://picsum.photos/seed/${item.id}/400/300`;
              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, x: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
                  className="bg-zinc-900/30 backdrop-blur-sm border border-white/5 rounded-[40px] p-8 flex flex-col sm:flex-row items-center gap-8 group hover:border-emerald-500/20 transition-colors"
                >
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <img
                      src={imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-3xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-2xl font-black text-white mb-2 tracking-tighter leading-none">{item.name}</h3>
                    <p className="text-emerald-500 font-black text-xl tracking-tighter">{formatCurrency(item.price)}</p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center bg-zinc-950 rounded-2xl border border-white/5 p-1.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-3 text-zinc-600 hover:text-white transition-colors"
                      >
                        <Minus className="h-5 w-5" />
                      </button>
                      <span className="w-12 text-center text-white font-black text-xl">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-3 text-zinc-600 hover:text-white transition-colors"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-4 text-zinc-700 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all"
                    >
                      <Trash2 className="h-6 w-6" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-5">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-900/30 backdrop-blur-sm border border-white/5 rounded-[48px] p-10 sticky top-32 shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
          >
            <h2 className="text-3xl font-black text-white mb-10 tracking-tighter">Resumo do Pedido</h2>
            
            <div className="space-y-6 mb-10">
              <div className="flex justify-between text-zinc-500 font-bold text-sm uppercase tracking-widest">
                <span>Subtotal</span>
                <span className="text-zinc-300">{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between text-zinc-500 font-bold text-sm uppercase tracking-widest">
                <span>Taxa de entrega</span>
                <span className="text-emerald-500">Grátis</span>
              </div>
              
              <div className="h-px bg-white/5 my-8" />
              
              <div className="flex justify-between items-baseline">
                <span className="text-zinc-400 font-black text-sm uppercase tracking-[0.3em]">Total</span>
                <span className="text-5xl font-black text-white tracking-tighter">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="group w-full flex items-center justify-center space-x-4 bg-emerald-500 text-black py-6 rounded-[32px] font-black text-xl transition-all shadow-[0_20px_50px_rgba(16,185,129,0.3)] relative overflow-hidden disabled:bg-zinc-800 disabled:text-zinc-600 disabled:shadow-none mb-4"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              {isCheckingOut ? (
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-black"></div>
              ) : (
                <>
                  <span className="relative z-10">FINALIZAR PEDIDO</span>
                  <ArrowRight className="h-7 w-7 relative z-10 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleWhatsAppCheckout}
              className="w-full flex items-center justify-center space-x-4 bg-[#25D366] text-white py-6 rounded-[32px] font-black text-xl transition-all shadow-[0_20px_50px_rgba(37,211,102,0.2)]"
            >
              <span>PEDIR VIA WHATSAPP</span>
            </motion.button>
            
            <div className="mt-10 flex items-center justify-center space-x-3 text-zinc-600">
              <ShieldCheck size={16} />
              <p className="text-[10px] uppercase tracking-widest font-black">
                Checkout Seguro & Criptografado
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Recommended Section */}
      <div className="mt-48">
        <div className="flex items-center space-x-4 mb-16">
          <div className="h-px w-12 bg-emerald-500" />
          <span className="text-emerald-500 font-black text-xs uppercase tracking-[0.4em]">Você também pode gostar</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 opacity-40 hover:opacity-100 transition-opacity duration-700">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-zinc-900/20 border border-white/5 rounded-[32px] p-6 animate-pulse">
              <div className="aspect-square bg-zinc-800 rounded-2xl mb-4" />
              <div className="h-4 bg-zinc-800 rounded w-2/3 mb-2" />
              <div className="h-4 bg-zinc-800 rounded w-1/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
