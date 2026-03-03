import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore, useAuthStore } from '../store';
import { cn } from '../utils';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const cartItems = useCartStore((state) => state.items);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-4 sm:px-6 lg:px-8 py-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Glass Container */}
        <div className="flex-1 flex items-center justify-between bg-zinc-950/40 backdrop-blur-3xl border border-white/10 rounded-[32px] px-8 h-20 shadow-2xl">
          <div className="flex items-center">
            <Link to="/" className="group flex items-center space-x-4">
              <motion.div 
                whileHover={{ rotate: 12, scale: 1.1 }}
                className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-[0_10px_20px_rgba(16,185,129,0.3)]"
              >
                <span className="text-black font-black text-xl tracking-tighter">M</span>
              </motion.div>
              <span className="text-xl font-black tracking-tighter text-white hidden sm:block">
                Menu<span className="text-emerald-500">Pro.</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-10">
              <Link to="/" className="text-zinc-500 hover:text-white text-[10px] font-black uppercase tracking-[0.3em] transition-all relative group">
                Cardápio
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full" />
              </Link>
              {user?.role === 'admin' && (
                <Link to="/admin" className="text-zinc-500 hover:text-white text-[10px] font-black uppercase tracking-[0.3em] transition-all relative group">
                  Dashboard
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full" />
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/cart" className="relative p-2 text-zinc-500 hover:text-white transition-all group">
              <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-[8px] font-black leading-none text-black transform translate-x-1/2 -translate-y-1/2 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/20"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <div className="h-6 w-px bg-white/10 hidden sm:block" />

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest hidden sm:inline">{user.name}</span>
                <button 
                  onClick={handleLogout} 
                  className="p-2 text-zinc-500 hover:text-white transition-all border border-white/5 rounded-xl hover:bg-white/5"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="p-2 text-zinc-500 hover:text-white transition-all border border-white/5 rounded-xl hover:bg-white/5">
                <User className="h-5 w-5" />
              </Link>
            )}

            <div className="md:hidden">
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="p-2 text-zinc-500 hover:text-white transition-all"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="md:hidden mt-4 pointer-events-auto"
          >
            <div className="bg-zinc-950/80 backdrop-blur-3xl border border-white/10 rounded-[32px] p-8 shadow-2xl">
              <div className="space-y-6">
                <Link to="/" onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white block py-2 text-xs font-black uppercase tracking-[0.3em]">Cardápio</Link>
                {user?.role === 'admin' && (
                  <Link to="/admin" onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white block py-2 text-xs font-black uppercase tracking-[0.3em]">Dashboard</Link>
                )}
                {!user && <Link to="/login" onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white block py-2 text-xs font-black uppercase tracking-[0.3em]">Login</Link>}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
