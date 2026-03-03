import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import { api } from '../services';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export function LoginPage() {
  const [email, setEmail] = React.useState('admin@menupro.com');
  const [password, setPassword] = React.useState('admin123');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await api.login({ email, password });
      setAuth(data.user, data.token);
      navigate(data.user.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      setError('E-mail ou senha incorretos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-zinc-950 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-900/10 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg bg-zinc-900/30 border border-white/5 rounded-[48px] p-12 backdrop-blur-3xl shadow-[0_50px_100px_rgba(0,0,0,0.5)] relative z-10"
      >
        <div className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_20px_40px_rgba(16,185,129,0.3)]"
          >
            <span className="text-black font-black text-4xl tracking-tighter">M</span>
          </motion.div>
          <h1 className="text-5xl font-black text-white mb-4 tracking-tighter">Bem-vindo.</h1>
          <p className="text-zinc-500 font-medium text-lg">Acesse sua conta para gerenciar seus pedidos</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] ml-4">E-mail</label>
            <div className="relative group">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-950/50 border border-white/5 rounded-[24px] py-5 pl-16 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium placeholder:text-zinc-700"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] ml-4">Senha</label>
            <div className="relative group">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-950/50 border border-white/5 rounded-[24px] py-5 pl-16 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium placeholder:text-zinc-700"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm text-center font-bold"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="group w-full flex items-center justify-center space-x-4 bg-emerald-500 text-black py-6 rounded-[24px] font-black text-xl transition-all shadow-[0_20px_50px_rgba(16,185,129,0.3)] relative overflow-hidden disabled:bg-zinc-800 disabled:text-zinc-600"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
            {loading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-black"></div>
            ) : (
              <>
                <span className="relative z-10">ENTRAR</span>
                <ArrowRight className="h-6 w-6 relative z-10 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-12 text-center">
          <p className="text-zinc-500 font-bold text-sm">
            Não tem uma conta? <button className="text-emerald-400 hover:underline">Criar conta</button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
