import { Page } from "@/App";
import { Product } from "@/types";
import { PRODUCTS, getRecommended } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Icon from "@/components/ui/icon";

interface HomePageProps {
  onNavigate: (page: Page) => void;
  addToCart: (product: Product) => void;
  trackView: (id: number) => void;
  viewHistory: number[];
}

const BEAR_MASCOT = "https://cdn.poehali.dev/projects/62dddb5c-1579-4d18-90f7-7a620496b9a9/files/303f6198-30fb-4326-a034-2bb646498c69.jpg";

const stats = [
  { value: "12 000+", label: "Товаров в каталоге" },
  { value: "98%", label: "Довольных клиентов" },
  { value: "48 ч", label: "Срок доставки" },
  { value: "15 лет", label: "На рынке" },
];

export default function HomePage({ onNavigate, addToCart, trackView, viewHistory }: HomePageProps) {
  const featured = PRODUCTS.filter(p => p.badge && !p.isVeteran).slice(0, 4);
  const recommended = getRecommended(viewHistory, [], 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-0">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl my-6 bear-gradient min-h-[420px] flex items-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[hsl(var(--bear-gold))] blur-3xl translate-y-1/2 -translate-x-1/4" />
        </div>

        <div className="relative z-10 flex items-center justify-between w-full px-8 md:px-16 py-12">
          <div className="max-w-xl animate-slide-right">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 mb-6">
              <span className="text-sm">🐻</span>
              <span className="text-white/90 text-xs font-ibm tracking-wide">Деловой маркетплейс с характером</span>
            </div>
            <h1 className="font-montserrat font-extrabold text-4xl md:text-5xl text-white leading-tight mb-4">
              Всё для бизнеса —<br />
              <span className="text-[hsl(var(--bear-gold))]">с заботой мишки</span>
            </h1>
            <p className="text-white/75 font-ibm text-lg mb-8 leading-relaxed">
              Более 12 000 товаров для работы, офиса и жизни. Умные рекомендации, специальные условия для ветеранов СВО.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate("catalog")}
                className="gold-accent text-[hsl(var(--bear-navy))] font-montserrat font-bold px-6 py-3 rounded-xl text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <Icon name="Grid3X3" size={16} />
                Перейти в каталог
              </button>
              <button
                onClick={() => onNavigate("veterans")}
                className="bg-white/15 border border-white/30 text-white font-ibm font-medium px-6 py-3 rounded-xl text-sm hover:bg-white/25 transition-colors flex items-center gap-2"
              >
                🎖️ Раздел ветеранов
              </button>
            </div>
          </div>

          <div className="hidden lg:block animate-bear-float flex-shrink-0">
            <img
              src={BEAR_MASCOT}
              alt="Мишка-логотип"
              className="w-72 h-72 object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 section-stagger">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white border border-border rounded-2xl p-5 text-center animate-fade-in card-hover">
            <div className="font-montserrat font-extrabold text-2xl text-[hsl(var(--bear-navy))] mb-1">{stat.value}</div>
            <div className="text-xs text-muted-foreground font-ibm">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Featured */}
      <section className="my-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-montserrat font-bold text-2xl text-foreground">Хиты продаж</h2>
            <p className="text-muted-foreground text-sm font-ibm mt-1">Самые популярные товары этой недели</p>
          </div>
          <button
            onClick={() => onNavigate("catalog")}
            className="text-[hsl(var(--bear-navy))] text-sm font-ibm font-medium flex items-center gap-1 hover:gap-2 transition-all"
          >
            Все товары <Icon name="ArrowRight" size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 section-stagger">
          {featured.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onView={trackView}
            />
          ))}
        </div>
      </section>

      {/* Recommendations */}
      <section className="my-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-[hsl(var(--bear-cream))] flex items-center justify-center text-lg">🐻</div>
          <div>
            <h2 className="font-montserrat font-bold text-2xl text-foreground">
              {viewHistory.length > 0 ? "Рекомендации для вас" : "Возможно, понравится"}
            </h2>
            <p className="text-muted-foreground text-sm font-ibm mt-0.5">
              {viewHistory.length > 0 ? "На основе вашей истории просмотров" : "Подборка по популярности"}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 section-stagger">
          {recommended.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onView={trackView}
            />
          ))}
        </div>
      </section>

      {/* Veterans Banner */}
      <section className="my-10 rounded-3xl overflow-hidden">
        <div className="vet-badge p-8 md:p-12 flex flex-col md:flex-row items-center gap-6">
          <div className="text-6xl flex-shrink-0">🎖️</div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-white mb-2">
              Специальный раздел для ветеранов СВО
            </h2>
            <p className="text-white/80 font-ibm text-base leading-relaxed">
              Мы чтим ваш подвиг. Специальные цены, приоритетная доставка и расширенная гарантия для всех ветеранов.
            </p>
          </div>
          <button
            onClick={() => onNavigate("veterans")}
            className="flex-shrink-0 bg-white text-[#b8382b] font-montserrat font-bold px-6 py-3 rounded-xl hover:bg-white/90 transition-colors whitespace-nowrap"
          >
            Перейти в раздел
          </button>
        </div>
      </section>

      {/* Footer mini */}
      <footer className="border-t border-border py-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground font-ibm">
        <div className="flex items-center gap-2">
          <span>🐻</span>
          <span className="font-montserrat font-semibold text-foreground">МишкаМаркет</span>
          <span>© 2026</span>
        </div>
        <div className="flex gap-4">
          {["Каталог", "Ветеранам", "Контакты"].map(label => (
            <button key={label} className="hover:text-foreground transition-colors">{label}</button>
          ))}
        </div>
      </footer>
    </div>
  );
}
