import React from 'react';
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
    <nav className="sticky top-0 z-50 bg-zinc-950/60 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="group flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-emerald-500/20">
                <span className="text-black font-black text-xl">M</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white hidden sm:block">
                Menu<span className="text-emerald-500">Pro</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-10">
              <Link to="/" className="text-zinc-400 hover:text-white text-sm font-semibold transition-colors relative group">
                Cardápio
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full" />
              </Link>
              {user?.role === 'admin' && (
                <Link to="/admin" className="text-zinc-400 hover:text-white text-sm font-semibold transition-colors relative group">
                  Dashboard
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full" />
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 text-zinc-400 hover:text-white transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-emerald-500 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-zinc-400 hidden sm:inline">{user.name}</span>
                <button onClick={handleLogout} className="p-2 text-zinc-400 hover:text-white transition-colors">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="p-2 text-zinc-400 hover:text-white transition-colors">
                <User className="h-6 w-6" />
              </Link>
            )}

            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-zinc-400 hover:text-white transition-colors">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn("md:hidden bg-zinc-950 border-b border-white/5 overflow-hidden transition-all duration-300", isOpen ? "max-h-64" : "max-h-0")}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="text-zinc-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Cardápio</Link>
          {user?.role === 'admin' && (
            <Link to="/admin" className="text-zinc-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>
          )}
          {!user && <Link to="/login" className="text-zinc-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Login</Link>}
        </div>
      </div>
    </nav>
  );
}
