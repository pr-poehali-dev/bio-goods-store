import { useState, useMemo } from "react";
import { Product } from "@/types";
import { PRODUCTS, CATEGORIES, getRecommended } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Icon from "@/components/ui/icon";

interface CatalogPageProps {
  addToCart: (product: Product) => void;
  trackView: (id: number) => void;
  viewHistory: number[];
}

export default function CatalogPage({ addToCart, trackView, viewHistory }: CatalogPageProps) {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("popular");

  const filtered = useMemo(() => {
    let result = PRODUCTS.filter(p => !p.isVeteran || activeCategory !== "Все");
    if (activeCategory !== "Все") {
      result = result.filter(p => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    switch (sort) {
      case "price-asc": return [...result].sort((a, b) => a.price - b.price);
      case "price-desc": return [...result].sort((a, b) => b.price - a.price);
      case "rating": return [...result].sort((a, b) => b.rating - a.rating);
      default: return [...result].sort((a, b) => b.reviews - a.reviews);
    }
  }, [activeCategory, search, sort]);

  const recommended = getRecommended(viewHistory, filtered.map(p => p.id), 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="font-montserrat font-bold text-3xl text-foreground mb-1">Каталог товаров</h1>
        <p className="text-muted-foreground font-ibm">Более 12 000 позиций для бизнеса и жизни</p>
      </div>

      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Поиск товаров..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-sm font-ibm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--bear-navy))] bg-white"
          />
        </div>
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="px-4 py-2.5 border border-border rounded-xl text-sm font-ibm bg-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--bear-navy))]"
        >
          <option value="popular">По популярности</option>
          <option value="rating">По рейтингу</option>
          <option value="price-asc">Цена: по возрастанию</option>
          <option value="price-desc">Цена: по убыванию</option>
        </select>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-ibm font-medium transition-all
              ${activeCategory === cat
                ? "bg-[hsl(var(--bear-navy))] text-white shadow-md"
                : "bg-white border border-border text-foreground hover:border-[hsl(var(--bear-navy))]"
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Recommendation strip */}
      {viewHistory.length > 0 && recommended.length > 0 && (
        <div className="mb-8 p-4 bg-[hsl(var(--bear-cream))] rounded-2xl border border-[hsl(38,60%,88%)]">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🐻</span>
            <span className="font-montserrat font-semibold text-sm text-[hsl(var(--bear-navy))]">
              Мишка рекомендует на основе ваших просмотров
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {recommended.map(p => (
              <ProductCard key={p.id} product={p} onAddToCart={addToCart} onView={trackView} compact />
            ))}
          </div>
        </div>
      )}

      {/* Products grid */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground font-ibm">
          Найдено: <span className="font-semibold text-foreground">{filtered.length}</span> товаров
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🐻</div>
          <p className="font-montserrat font-semibold text-lg text-foreground">Мишка ничего не нашёл</p>
          <p className="text-muted-foreground font-ibm text-sm mt-1">Попробуйте изменить запрос или категорию</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 section-stagger">
          {filtered.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onView={trackView}
            />
          ))}
        </div>
      )}
    </div>
  );
}
