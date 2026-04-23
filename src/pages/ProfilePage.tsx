import { Page } from "@/App";
import { Product } from "@/types";
import { PRODUCTS } from "@/data/products";
import Icon from "@/components/ui/icon";
import ProductCard from "@/components/ProductCard";

interface ProfilePageProps {
  viewHistory: number[];
  onNavigate: (page: Page) => void;
}

const orders = [
  { id: "ММ-20041", date: "20 апр 2026", items: 3, total: 127400, status: "Доставлен", color: "text-green-600 bg-green-50" },
  { id: "ММ-20012", date: "12 апр 2026", items: 1, total: 24900, status: "В пути", color: "text-blue-600 bg-blue-50" },
  { id: "ММ-19987", date: "5 апр 2026", items: 2, total: 43400, status: "Доставлен", color: "text-green-600 bg-green-50" },
];

export default function ProfilePage({ viewHistory, onNavigate }: ProfilePageProps) {
  const viewedProducts = viewHistory
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter(Boolean)
    .slice(0, 4) as Product[];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Profile header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-8 p-6 bg-white border border-border rounded-2xl">
        <div className="w-16 h-16 rounded-2xl bear-gradient flex items-center justify-center text-3xl flex-shrink-0">
          🐻
        </div>
        <div className="flex-1">
          <h1 className="font-montserrat font-bold text-2xl text-foreground">Иван Петров</h1>
          <p className="text-muted-foreground font-ibm text-sm">ivan.petrov@email.ru · Клиент с 2024 года</p>
          <div className="flex gap-4 mt-2">
            <span className="text-xs bg-[hsl(var(--bear-cream))] text-[hsl(var(--bear-navy))] font-ibm font-medium px-3 py-1 rounded-full">
              Золотой клиент
            </span>
            <span className="text-xs text-muted-foreground font-ibm">23 заказа · 512 000 ₽ потрачено</span>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-sm font-ibm hover:bg-secondary transition-colors">
          <Icon name="Settings" size={14} />
          Настройки
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Orders */}
        <div className="lg:col-span-2">
          <h2 className="font-montserrat font-bold text-xl text-foreground mb-4">История заказов</h2>
          <div className="space-y-3">
            {orders.map(order => (
              <div key={order.id} className="bg-white border border-border rounded-2xl p-4 flex items-center gap-4 card-hover animate-fade-in">
                <div className="w-10 h-10 rounded-xl bg-[hsl(var(--bear-cream))] flex items-center justify-center flex-shrink-0">
                  <Icon name="Package" size={18} className="text-[hsl(var(--bear-navy))]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-montserrat font-semibold text-sm text-foreground">{order.id}</span>
                    <span className={`text-xs font-ibm font-medium px-2 py-0.5 rounded-full ${order.color}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground font-ibm mt-0.5">{order.date} · {order.items} товара</p>
                </div>
                <div className="text-right">
                  <div className="font-montserrat font-bold text-[hsl(var(--bear-navy))] text-sm">
                    {order.total.toLocaleString("ru-RU")} ₽
                  </div>
                  <button className="text-xs text-[hsl(var(--bear-navy))] font-ibm hover:underline">Повторить</button>
                </div>
              </div>
            ))}
          </div>

          {/* Recently viewed */}
          {viewedProducts.length > 0 && (
            <div className="mt-8">
              <h2 className="font-montserrat font-bold text-xl text-foreground mb-4">Недавно просмотрено</h2>
              <div className="grid grid-cols-2 gap-3 section-stagger">
                {viewedProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    compact
                  />
                ))}
              </div>
            </div>
          )}

          {viewedProducts.length === 0 && (
            <div className="mt-8 p-6 bg-[hsl(var(--bear-cream))] rounded-2xl border border-[hsl(38,60%,88%)] text-center">
              <div className="text-4xl mb-2">🐻</div>
              <p className="font-montserrat font-semibold text-[hsl(var(--bear-navy))]">Просмотренных товаров нет</p>
              <p className="text-sm text-muted-foreground font-ibm mt-1">Загляни в каталог — мишка покажет что-нибудь интересное!</p>
              <button
                onClick={() => onNavigate("catalog")}
                className="mt-3 bg-[hsl(var(--bear-navy))] text-white font-ibm font-medium px-5 py-2 rounded-xl text-sm hover:opacity-90 transition-opacity"
              >
                В каталог
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white border border-border rounded-2xl p-5">
            <h3 className="font-montserrat font-semibold text-base text-foreground mb-3">Накопленные бонусы</h3>
            <div className="text-3xl font-montserrat font-extrabold text-[hsl(var(--bear-navy))] mb-1">5 120 б.</div>
            <p className="text-xs text-muted-foreground font-ibm">≈ 512 ₽ на следующую покупку</p>
            <div className="mt-3 bg-muted rounded-full h-2 overflow-hidden">
              <div className="bg-[hsl(var(--bear-gold))] h-2 rounded-full" style={{ width: "64%" }} />
            </div>
            <p className="text-xs text-muted-foreground font-ibm mt-1">До статуса «Платина» — 2 880 б.</p>
          </div>

          <div className="bg-white border border-border rounded-2xl p-5">
            <h3 className="font-montserrat font-semibold text-base text-foreground mb-3">Личные данные</h3>
            <div className="space-y-2 text-sm font-ibm">
              <div className="flex gap-2 items-center text-muted-foreground">
                <Icon name="User" size={14} />
                <span>Иван Петров</span>
              </div>
              <div className="flex gap-2 items-center text-muted-foreground">
                <Icon name="Mail" size={14} />
                <span>ivan.petrov@email.ru</span>
              </div>
              <div className="flex gap-2 items-center text-muted-foreground">
                <Icon name="Phone" size={14} />
                <span>+7 (999) 123-45-67</span>
              </div>
              <div className="flex gap-2 items-center text-muted-foreground">
                <Icon name="MapPin" size={14} />
                <span>Москва, ул. Деловая, 15</span>
              </div>
            </div>
            <button className="mt-4 w-full border border-border rounded-xl py-2 text-sm font-ibm hover:bg-secondary transition-colors">
              Редактировать
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}