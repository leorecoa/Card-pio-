import React from 'react';
import { api } from '../services';
import { Product, Category } from '../types';
import { ProductCard } from '../components/ProductCard';
import { PromotionHero } from '../components/PromotionHero';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';

export function HomePage() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<number | null>(null);
  const [search, setSearch] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [p, c] = await Promise.all([api.getProducts(), api.getCategories()]);
        setProducts(p);
        setCategories(c);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory ? p.category_id === selectedCategory : true;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                         p.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950">
      {/* Immersive Hero Section */}
      <PromotionHero products={products} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div className="text-center md:text-left">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter"
            >
              Nosso <span className="text-emerald-500">Cardápio</span>
            </motion.h2>
            <p className="text-zinc-500 text-lg max-w-md mx-auto md:mx-0">
              Escolha entre nossas diversas categorias e saboreie o melhor da culinária.
            </p>
          </div>
          
          <div className="w-full md:w-96">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
              <input
                type="text"
                placeholder="O que você deseja hoje?"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-zinc-600"
              />
            </div>
          </div>
        </div>

        {/* Categories Filter - Centered */}
        <div className="mb-20">
          <div className="flex items-center justify-center space-x-3 overflow-x-auto pb-4 no-scrollbar">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-10 py-4 rounded-2xl font-bold whitespace-nowrap transition-all duration-300 border ${
                selectedCategory === null 
                  ? 'bg-emerald-500 border-emerald-500 text-black shadow-2xl shadow-emerald-500/30' 
                  : 'bg-zinc-900/50 border-white/5 text-zinc-400 hover:text-white hover:border-white/10'
              }`}
            >
              Todos
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-10 py-4 rounded-2xl font-bold whitespace-nowrap transition-all duration-300 border ${
                  selectedCategory === cat.id 
                    ? 'bg-emerald-500 border-emerald-500 text-black shadow-2xl shadow-emerald-500/30' 
                    : 'bg-zinc-900/50 border-white/5 text-zinc-400 hover:text-white hover:border-white/10'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-32">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-zinc-900 mb-6">
              <Search className="h-8 w-8 text-zinc-700" />
            </div>
            <p className="text-zinc-500 text-xl font-medium">Nenhum prato encontrado.</p>
            <button 
              onClick={() => { setSearch(''); setSelectedCategory(null); }}
              className="mt-4 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
