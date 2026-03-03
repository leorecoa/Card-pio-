import React from 'react';
import { api } from '../services';
import { Order } from '../types';
import { useAuthStore } from '../store';
import { formatCurrency } from '../utils';
import { motion, AnimatePresence } from 'motion/react';
import { Package, Clock, CheckCircle, XCircle, TrendingUp, Users, DollarSign, ArrowUpRight } from 'lucide-react';

export function AdminDashboard() {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { token } = useAuthStore();

  React.useEffect(() => {
    const fetchOrders = async () => {
      if (!token) return;
      try {
        const data = await api.getAdminOrders(token);
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4 text-amber-400" />;
      case 'preparing': return <Package className="h-4 w-4 text-blue-400" />;
      case 'delivered': return <CheckCircle className="h-4 w-4 text-emerald-400" />;
      default: return <XCircle className="h-4 w-4 text-red-400" />;
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-400/10 text-amber-400 border-amber-400/20';
      case 'preparing': return 'bg-blue-400/10 text-blue-400 border-blue-400/20';
      case 'delivered': return 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20';
      default: return 'bg-red-400/10 text-red-400 border-red-400/20';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'preparing': return 'Preparando';
      case 'delivered': return 'Entregue';
      default: return 'Cancelado';
    }
  };

  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-950">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-12 w-12 border-t-2 border-emerald-500 rounded-full"
        />
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
      >
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-px w-8 bg-emerald-500" />
            <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.4em]">Management</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-none">
            Painel <span className="text-emerald-500">Admin.</span>
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-zinc-900/50 border border-white/5 px-6 py-3 rounded-2xl backdrop-blur-xl">
            <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest block mb-1">Status do Sistema</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-white font-bold text-sm">Operacional</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
      >
        {[
          { label: 'Receita Total', value: formatCurrency(totalRevenue), icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
          { label: 'Pedidos Hoje', value: orders.length, icon: Package, color: 'text-blue-400', bg: 'bg-blue-400/10' },
          { label: 'Novos Clientes', value: '12', icon: Users, color: 'text-purple-400', bg: 'bg-purple-400/10' },
          { label: 'Pendentes', value: pendingOrders, icon: Clock, color: 'text-amber-400', bg: 'bg-amber-400/10' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            variants={itemVariants}
            className="bg-zinc-900/30 border border-white/5 rounded-[32px] p-8 group hover:border-white/10 transition-all"
          >
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <stat.icon size={24} />
            </div>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-black text-white tracking-tighter">{stat.value}</h3>
              <div className="flex items-center text-emerald-500 text-xs font-bold">
                <TrendingUp size={14} className="mr-1" />
                +12%
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Orders Table */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-zinc-900/30 border border-white/5 rounded-[40px] overflow-hidden backdrop-blur-xl shadow-2xl"
      >
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-2xl font-black text-white tracking-tighter">Pedidos Recentes</h2>
          <button className="text-zinc-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors flex items-center">
            Ver Todos <ArrowUpRight size={14} className="ml-2" />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-950/50">
                <th className="px-8 py-5 text-zinc-500 font-black text-[10px] uppercase tracking-widest">ID</th>
                <th className="px-8 py-5 text-zinc-500 font-black text-[10px] uppercase tracking-widest">Cliente</th>
                <th className="px-8 py-5 text-zinc-500 font-black text-[10px] uppercase tracking-widest">Data & Hora</th>
                <th className="px-8 py-5 text-zinc-500 font-black text-[10px] uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-zinc-500 font-black text-[10px] uppercase tracking-widest">Total</th>
                <th className="px-8 py-5 text-zinc-500 font-black text-[10px] uppercase tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence>
                {orders.map((order, idx) => (
                  <motion.tr 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.05 }}
                    key={order.id} 
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-8 py-6 text-zinc-400 font-mono text-xs">#{order.id}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-black text-zinc-500 uppercase">
                          {order.user_name ? order.user_name.charAt(0) : 'V'}
                        </div>
                        <span className="text-white font-bold">{order.user_name || 'Visitante'}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-zinc-500 text-sm font-medium">
                      {new Date(order.created_at).toLocaleString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-8 py-6">
                      <div className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${getStatusStyles(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span>{getStatusLabel(order.status)}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-emerald-400 font-black text-lg tracking-tighter">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="p-3 bg-zinc-950 border border-white/5 rounded-xl text-zinc-500 hover:text-white hover:border-white/20 transition-all">
                        <ArrowUpRight size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        
        {orders.length === 0 && (
          <div className="py-20 text-center">
            <Package className="h-12 w-12 text-zinc-800 mx-auto mb-4" />
            <p className="text-zinc-600 font-bold uppercase tracking-widest text-xs">Nenhum pedido encontrado</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
