import { Product } from "@/types";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Icon from "@/components/ui/icon";

const VET_BEAR = "https://cdn.poehali.dev/projects/62dddb5c-1579-4d18-90f7-7a620496b9a9/files/6de9b880-4334-479d-a2eb-2092f9234338.jpg";

interface VeteransPageProps {
  addToCart: (product: Product) => void;
  trackView: (id: number) => void;
}

const benefits = [
  { icon: "BadgePercent", title: "Скидка 15%", desc: "На все товары при предъявлении удостоверения" },
  { icon: "Truck", title: "Бесплатная доставка", desc: "Приоритетная доставка в течение 24 часов" },
  { icon: "ShieldCheck", title: "Расширенная гарантия", desc: "Гарантия 3 года вместо стандартного 1 года" },
  { icon: "Headphones", title: "Личный менеджер", desc: "Выделенный специалист для помощи в выборе" },
];

export default function VeteransPage({ addToCart, trackView }: VeteransPageProps) {
  const vetProducts = PRODUCTS.filter(p => p.isVeteran);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-0">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl my-6 min-h-[380px] flex items-center"
        style={{ background: "linear-gradient(135deg, #8b1a1a 0%, #b8382b 40%, #c0392b 100%)" }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-yellow-400 blur-2xl" />
        </div>

        <div className="relative z-10 flex items-center justify-between w-full px-8 md:px-16 py-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">🎖️</span>
              <div className="w-px h-10 bg-white/30" />
              <span className="text-white/80 font-ibm text-sm tracking-wide uppercase">Специальный раздел</span>
            </div>
            <h1 className="font-montserrat font-extrabold text-4xl md:text-5xl text-white leading-tight mb-4">
              Для ветеранов<br />
              <span className="text-yellow-300">специальные условия</span>
            </h1>
            <p className="text-white/75 font-ibm text-lg mb-6 leading-relaxed">
              Мы выражаем глубокую благодарность ветеранам СВО. Специально подобранные товары и эксклюзивные условия для вас и вашей семьи.
            </p>
            <div className="flex items-center gap-2 text-yellow-200 font-ibm text-sm">
              <Icon name="Star" size={14} />
              <span>Для получения льгот предъявите удостоверение ветерана при оформлении заказа</span>
            </div>
          </div>

          <div className="hidden lg:block animate-bear-float flex-shrink-0">
            <img
              src={VET_BEAR}
              alt="Ветеранский мишка"
              className="w-64 h-64 object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="my-10">
        <h2 className="font-montserrat font-bold text-2xl text-foreground mb-6 text-center">
          Ваши привилегии
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 section-stagger">
          {benefits.map(b => (
            <div key={b.title} className="bg-white border border-border rounded-2xl p-5 card-hover animate-fade-in text-center">
              <div className="w-12 h-12 rounded-full vet-badge flex items-center justify-center mx-auto mb-3">
                <Icon name={b.icon} size={22} />
              </div>
              <h3 className="font-montserrat font-semibold text-base text-foreground mb-1">{b.title}</h3>
              <p className="text-sm text-muted-foreground font-ibm">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Verification form */}
      <section className="my-10 bg-[hsl(var(--bear-cream))] border border-[hsl(38,60%,88%)] rounded-3xl p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="ShieldCheck" size={20} className="text-[#b8382b]" />
              <h3 className="font-montserrat font-bold text-xl text-foreground">Верификация статуса</h3>
            </div>
            <p className="text-muted-foreground font-ibm text-sm">
              Для получения льгот пройдите простую верификацию. Наш менеджер свяжется с вами в течение 24 часов.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <input
              type="text"
              placeholder="Ваш телефон или email"
              className="px-4 py-3 border border-border rounded-xl text-sm font-ibm bg-white focus:outline-none focus:ring-2 focus:ring-[#b8382b] w-64"
            />
            <button className="vet-badge px-6 py-3 rounded-xl font-montserrat font-semibold text-sm whitespace-nowrap hover:opacity-90 transition-opacity">
              Подать заявку
            </button>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="my-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">🎖️</span>
          <div>
            <h2 className="font-montserrat font-bold text-2xl text-foreground">Товары для ветеранов</h2>
            <p className="text-muted-foreground text-sm font-ibm">Специально подобранные позиции с расширенными условиями</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 section-stagger">
          {vetProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onView={trackView}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
