import React from 'react';
import { api } from '../services';
import { Product, Category } from '../types';
import { ProductCard } from '../components/ProductCard';
import { PromotionHero } from '../components/PromotionHero';
import { motion, AnimatePresence } from 'motion/react';
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
    <div className="bg-zinc-950 min-h-screen">
      {/* Immersive Hero Section */}
      <PromotionHero products={products} />

      {/* Brutalist Marquee */}
      <div className="bg-emerald-500 py-4 overflow-hidden select-none border-y border-black/10">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-black font-black text-xs uppercase tracking-[0.5em] mx-10">
              Fresh Ingredients • Hand Crafted • Premium Quality • Fresh Ingredients • Hand Crafted • Premium Quality
            </span>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-32">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4 mb-6"
            >
              <div className="h-px w-12 bg-emerald-500" />
              <span className="text-emerald-500 font-black text-xs uppercase tracking-[0.4em]">Menu Exclusivo</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.85]"
            >
              Sabores que <br />
              <span className="text-emerald-500">Inspiram.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-zinc-500 text-xl font-medium max-w-md"
            >
              Uma curadoria gastronômica pensada para os paladares mais exigentes.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-96"
          >
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" />
              <input
                type="text"
                placeholder="O que você deseja hoje?"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-zinc-900/30 border border-white/5 rounded-[32px] py-6 pl-16 pr-6 text-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all placeholder:text-zinc-700 font-medium text-lg"
              />
            </div>
          </motion.div>
        </div>

        {/* Chef's Special Section */}
        <div className="mb-48">
          <div className="flex items-center space-x-4 mb-12">
            <div className="h-px w-12 bg-emerald-500" />
            <span className="text-emerald-500 font-black text-xs uppercase tracking-[0.4em]">Chef's Choice</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[16/9] rounded-[48px] overflow-hidden group border border-white/5"
            >
              <img 
                src="https://picsum.photos/seed/chef/1200/800" 
                alt="Chef Special" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <h3 className="text-4xl font-black text-white mb-2 tracking-tighter">O Segredo do Chef</h3>
                <p className="text-zinc-300 font-medium max-w-md">Descubra os ingredientes secretos que tornam nossos pratos únicos.</p>
              </div>
            </motion.div>
            <div className="flex flex-col justify-center space-y-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-start space-x-6"
              >
                <div className="w-16 h-16 rounded-3xl bg-zinc-900 border border-white/5 flex items-center justify-center text-emerald-500 flex-shrink-0">
                  <span className="text-2xl font-black">01</span>
                </div>
                <div>
                  <h4 className="text-xl font-black text-white mb-2 tracking-tight">Ingredientes Locais</h4>
                  <p className="text-zinc-500 font-medium">Trabalhamos apenas com produtores locais para garantir o frescor máximo.</p>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex items-start space-x-6"
              >
                <div className="w-16 h-16 rounded-3xl bg-zinc-900 border border-white/5 flex items-center justify-center text-emerald-500 flex-shrink-0">
                  <span className="text-2xl font-black">02</span>
                </div>
                <div>
                  <h4 className="text-xl font-black text-white mb-2 tracking-tight">Técnicas Ancestrais</h4>
                  <p className="text-zinc-500 font-medium">Combinamos modernidade com métodos tradicionais de preparo.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Categories Filter - Crafted Style */}
        <div className="mb-32">
          <div className="flex items-center space-x-4 overflow-x-auto pb-8 no-scrollbar">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(null)}
              className={`px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest transition-all duration-500 border ${
                selectedCategory === null 
                  ? 'bg-emerald-500 border-emerald-500 text-black shadow-[0_20px_40px_rgba(16,185,129,0.3)]' 
                  : 'bg-zinc-900/50 border-white/5 text-zinc-500 hover:text-white hover:border-white/20'
              }`}
            >
              Todos
            </motion.button>
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest transition-all duration-500 border ${
                  selectedCategory === cat.id 
                    ? 'bg-emerald-500 border-emerald-500 text-black shadow-[0_20px_40px_rgba(16,185,129,0.3)]' 
                    : 'bg-zinc-900/50 border-white/5 text-zinc-500 hover:text-white hover:border-white/20'
                }`}
              >
                {cat.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Products Grid with Reveal Animation */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.05,
                  ease: [0.23, 1, 0.32, 1]
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-48"
          >
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-zinc-900/50 border border-white/5 mb-10">
              <Search className="h-12 w-12 text-zinc-800" />
            </div>
            <p className="text-zinc-600 text-2xl font-black tracking-tighter">Nenhum prato encontrado.</p>
            <button 
              onClick={() => { setSearch(''); setSelectedCategory(null); }}
              className="mt-6 text-emerald-500 font-bold hover:text-emerald-400 transition-colors uppercase tracking-widest text-sm"
            >
              Limpar filtros
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
