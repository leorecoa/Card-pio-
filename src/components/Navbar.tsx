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
    <nav className="sticky top-0 z-50 bg-zinc-950/60 backdrop-blur-2xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center">
            <Link to="/" className="group flex items-center space-x-4">
              <motion.div 
                whileHover={{ rotate: 12, scale: 1.1 }}
                className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-[0_10px_20px_rgba(16,185,129,0.3)]"
              >
                <span className="text-black font-black text-2xl tracking-tighter">M</span>
              </motion.div>
              <span className="text-2xl font-black tracking-tighter text-white hidden sm:block">
                Menu<span className="text-emerald-500">Pro.</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-12">
              <Link to="/" className="text-zinc-500 hover:text-white text-xs font-black uppercase tracking-[0.3em] transition-all relative group">
                Cardápio
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full" />
              </Link>
              {user?.role === 'admin' && (
                <Link to="/admin" className="text-zinc-500 hover:text-white text-xs font-black uppercase tracking-[0.3em] transition-all relative group">
                  Dashboard
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full" />
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/cart" className="relative p-3 text-zinc-500 hover:text-white transition-all group">
              <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-1 right-1 inline-flex items-center justify-center px-2 py-1 text-[10px] font-black leading-none text-black transform translate-x-1/2 -translate-y-1/2 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/20"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-xs font-black text-zinc-500 uppercase tracking-widest hidden sm:inline">{user.name}</span>
                <button 
                  onClick={handleLogout} 
                  className="p-3 text-zinc-500 hover:text-white transition-all border border-white/5 rounded-2xl hover:bg-white/5"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="p-3 text-zinc-500 hover:text-white transition-all border border-white/5 rounded-2xl hover:bg-white/5">
                <User className="h-6 w-6" />
              </Link>
            )}

            <div className="md:hidden">
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="p-3 text-zinc-500 hover:text-white transition-all"
              >
                {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-zinc-950 border-b border-white/5 overflow-hidden"
          >
            <div className="px-6 pt-4 pb-8 space-y-4">
              <Link to="/" onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white block py-4 text-sm font-black uppercase tracking-widest border-b border-white/5">Cardápio</Link>
              {user?.role === 'admin' && (
                <Link to="/admin" onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white block py-4 text-sm font-black uppercase tracking-widest border-b border-white/5">Dashboard</Link>
              )}
              {!user && <Link to="/login" onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white block py-4 text-sm font-black uppercase tracking-widest">Login</Link>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
