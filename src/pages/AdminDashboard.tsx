import React from 'react';
import { api } from '../services';
import { Order } from '../types';
import { useAuthStore } from '../store';
import { formatCurrency } from '../utils';
import { motion } from 'motion/react';
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';

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
      case 'pending': return <Clock className="h-5 w-5 text-amber-400" />;
      case 'preparing': return <Package className="h-5 w-5 text-blue-400" />;
      case 'delivered': return <CheckCircle className="h-5 w-5 text-emerald-400" />;
      default: return <XCircle className="h-5 w-5 text-red-400" />;
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Painel Administrativo</h1>
          <p className="text-zinc-400">Gerencie os pedidos e acompanhe o desempenho em tempo real.</p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl">
          <span className="text-emerald-400 font-medium">{orders.length} Pedidos hoje</span>
        </div>
      </div>

      <div className="bg-zinc-900/50 border border-white/5 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-zinc-950/50">
                <th className="px-6 py-4 text-zinc-400 font-medium text-sm">ID</th>
                <th className="px-6 py-4 text-zinc-400 font-medium text-sm">Cliente</th>
                <th className="px-6 py-4 text-zinc-400 font-medium text-sm">Data</th>
                <th className="px-6 py-4 text-zinc-400 font-medium text-sm">Status</th>
                <th className="px-6 py-4 text-zinc-400 font-medium text-sm">Total</th>
                <th className="px-6 py-4 text-zinc-400 font-medium text-sm">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map((order) => (
                <motion.tr 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={order.id} 
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 text-white font-mono text-sm">#{order.id}</td>
                  <td className="px-6 py-4 text-white">{order.user_name || 'Visitante'}</td>
                  <td className="px-6 py-4 text-zinc-400 text-sm">
                    {new Date(order.created_at).toLocaleString('pt-BR')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <span className="text-sm text-white">{getStatusLabel(order.status)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-emerald-400 font-bold">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-zinc-400 hover:text-white text-sm font-medium transition-colors">
                      Ver Detalhes
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
