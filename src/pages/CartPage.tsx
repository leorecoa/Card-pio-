import React from 'react';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore, useAuthStore } from '../store';
import { formatCurrency } from '../utils';
import { motion } from 'motion/react';
import { api } from '../services';

export function CartPage() {
  const { items, updateQuantity, removeItem, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = React.useState(false);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-12 max-w-md mx-auto">
          <ShoppingBag className="h-16 w-16 text-zinc-700 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-2">Seu carrinho está vazio</h2>
          <p className="text-zinc-400 mb-8">Que tal explorar nosso cardápio e escolher algo delicioso?</p>
          <Link to="/" className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold transition-all">
            Ver Cardápio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-4xl md:text-6xl font-black text-white mb-12 tracking-tighter">
        Seu <span className="text-emerald-500">Carrinho</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => {
            const imageUrl = item.image_url || `https://picsum.photos/seed/${item.id}/400/300`;
            return (
              <motion.div
                layout
                key={item.id}
                className="bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-[32px] p-6 flex flex-col sm:flex-row items-center gap-6"
              >
                <img
                  src={imageUrl}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-2xl shadow-xl"
                  referrerPolicy="no-referrer"
                />
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-bold text-white mb-1 tracking-tight">{item.name}</h3>
                <p className="text-emerald-400 font-black text-lg">{formatCurrency(item.price)}</p>
              </div>
              <div className="flex items-center bg-zinc-950 rounded-2xl border border-white/5 p-1.5">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-2.5 text-zinc-500 hover:text-white transition-colors"
                >
                  <Minus className="h-5 w-5" />
                </button>
                <span className="w-10 text-center text-white font-black text-lg">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-2.5 text-zinc-500 hover:text-white transition-colors"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="p-3 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all"
              >
                <Trash2 className="h-6 w-6" />
              </button>
              </motion.div>
            );
          })}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-[40px] p-8 sticky top-28 shadow-2xl shadow-black/40">
            <h2 className="text-2xl font-black text-white mb-8 tracking-tight">Resumo do Pedido</h2>
            <div className="space-y-5 mb-8">
              <div className="flex justify-between text-zinc-500 font-medium">
                <span>Subtotal</span>
                <span className="text-zinc-300">{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between text-zinc-500 font-medium">
                <span>Taxa de entrega</span>
                <span className="text-emerald-500 font-bold">Grátis</span>
              </div>
              <div className="h-px bg-white/5 my-6" />
              <div className="flex justify-between text-2xl font-black text-white tracking-tight">
                <span>Total</span>
                <span className="text-emerald-400">{formatCurrency(total)}</span>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full flex items-center justify-center space-x-3 bg-white text-black hover:bg-emerald-500 hover:text-black disabled:bg-zinc-800 disabled:text-zinc-600 py-5 rounded-[24px] font-black text-lg transition-all shadow-xl shadow-black/20"
            >
              {isCheckingOut ? (
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-black"></div>
              ) : (
                <>
                  <span>FINALIZAR PEDIDO</span>
                  <ArrowRight className="h-6 w-6" />
                </>
              )}
            </motion.button>
            <p className="text-center text-zinc-600 text-[10px] uppercase tracking-widest mt-6 font-bold">
              Pagamento seguro via Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
