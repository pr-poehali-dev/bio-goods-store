import { useState } from "react";
import { PRODUCTS } from "@/data/products";
import Icon from "@/components/ui/icon";

const ADMIN_PASSWORD = "mishka2026admin";

function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === ADMIN_PASSWORD) {
      onSuccess();
    } else {
      setError(true);
      setShake(true);
      setValue("");
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className={`bg-white border border-border rounded-3xl p-8 w-full max-w-sm shadow-xl ${shake ? "animate-scale-in" : ""}`}>
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🐻</div>
          <h2 className="font-montserrat font-bold text-2xl text-foreground">Вход в админ-панель</h2>
          <p className="text-muted-foreground text-sm font-ibm mt-1">Доступ только для администратора</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-ibm font-medium text-muted-foreground mb-1.5">Пароль</label>
            <input
              type="password"
              value={value}
              onChange={e => { setValue(e.target.value); setError(false); }}
              placeholder="Введите пароль"
              autoFocus
              className={`w-full px-4 py-3 border rounded-xl text-sm font-ibm focus:outline-none focus:ring-2 transition-colors
                ${error
                  ? "border-red-400 focus:ring-red-300 bg-red-50"
                  : "border-border focus:ring-[hsl(var(--bear-navy))]"
                }
              `}
            />
            {error && (
              <p className="text-red-500 text-xs font-ibm mt-1.5 flex items-center gap-1">
                <Icon name="AlertCircle" size={12} />
                Неверный пароль
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bear-gradient text-white font-montserrat font-bold py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            Войти
          </button>
        </form>
        <p className="text-center text-xs text-muted-foreground font-ibm mt-4">
          Обратитесь к разработчику для получения пароля
        </p>
      </div>
    </div>
  );
}

const kpiCards = [
  { icon: "TrendingUp", label: "Выручка за месяц", value: "4 820 000 ₽", change: "+12.4%", up: true },
  { icon: "ShoppingBag", label: "Заказов за месяц", value: "1 247", change: "+8.7%", up: true },
  { icon: "Users", label: "Новых пользователей", value: "342", change: "-2.1%", up: false },
  { icon: "Package", label: "Товаров в каталоге", value: "12 084", change: "+34", up: true },
];

const recentOrders = [
  { id: "ММ-20052", customer: "Анна С.", total: 34500, status: "Новый", time: "5 мин назад" },
  { id: "ММ-20051", customer: "Дмитрий К.", total: 89900, status: "В обработке", time: "18 мин назад" },
  { id: "ММ-20050", customer: "Иван П.", total: 12500, status: "Отправлен", time: "1 час назад" },
  { id: "ММ-20049", customer: "Мария Ю.", total: 7400, status: "Доставлен", time: "2 часа назад" },
  { id: "ММ-20048", customer: "Пётр В.", total: 3200, status: "Доставлен", time: "3 часа назад" },
];

const statusColor: Record<string, string> = {
  "Новый": "text-blue-700 bg-blue-50",
  "В обработке": "text-yellow-700 bg-yellow-50",
  "Отправлен": "text-purple-700 bg-purple-50",
  "Доставлен": "text-green-700 bg-green-50",
};

type AdminTab = "overview" | "products" | "orders" | "users";

export default function AdminPage() {
  const [tab, setTab] = useState<AdminTab>("overview");
  const [isAuth, setIsAuth] = useState(() => sessionStorage.getItem("admin_auth") === "1");

  if (!isAuth) {
    return <AdminLogin onSuccess={() => { sessionStorage.setItem("admin_auth", "1"); setIsAuth(true); }} />;
  }

  const tabs: { id: AdminTab; label: string; icon: string }[] = [
    { id: "overview", label: "Обзор", icon: "BarChart3" },
    { id: "products", label: "Товары", icon: "Package" },
    { id: "orders", label: "Заказы", icon: "ShoppingBag" },
    { id: "users", label: "Пользователи", icon: "Users" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bear-gradient flex items-center justify-center text-xl">🐻</div>
          <div>
            <h1 className="font-montserrat font-bold text-2xl text-foreground">Панель управления</h1>
            <p className="text-muted-foreground text-xs font-ibm">МишкаМаркет · Администратор</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-ibm bg-white border border-border px-3 py-2 rounded-xl">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Система работает
          </div>
          <button
            onClick={() => { sessionStorage.removeItem("admin_auth"); setIsAuth(false); }}
            className="flex items-center gap-1.5 text-xs text-red-500 border border-red-200 hover:bg-red-50 px-3 py-2 rounded-xl transition-colors font-ibm"
          >
            <Icon name="LogOut" size={13} />
            Выйти
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted p-1 rounded-xl mb-6 w-fit">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-ibm font-medium rounded-lg transition-all
              ${tab === t.id ? "bg-white text-[hsl(var(--bear-navy))] shadow-sm" : "text-muted-foreground hover:text-foreground"}
            `}
          >
            <Icon name={t.icon} size={14} />
            {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <>
          {/* KPI */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 section-stagger">
            {kpiCards.map(card => (
              <div key={card.label} className="bg-white border border-border rounded-2xl p-5 card-hover animate-fade-in">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[hsl(var(--bear-cream))] flex items-center justify-center">
                    <Icon name={card.icon} size={18} className="text-[hsl(var(--bear-navy))]" />
                  </div>
                  <span className={`text-xs font-ibm font-medium ${card.up ? "text-green-600" : "text-red-500"}`}>
                    {card.change}
                  </span>
                </div>
                <div className="font-montserrat font-extrabold text-xl text-foreground">{card.value}</div>
                <div className="text-xs text-muted-foreground font-ibm mt-0.5">{card.label}</div>
              </div>
            ))}
          </div>

          {/* Recent orders */}
          <div className="bg-white border border-border rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="font-montserrat font-semibold text-lg text-foreground">Последние заказы</h2>
              <button className="text-sm font-ibm text-[hsl(var(--bear-navy))] hover:underline">Все заказы</button>
            </div>
            <div className="divide-y divide-border">
              {recentOrders.map(order => (
                <div key={order.id} className="flex items-center gap-4 px-6 py-4 hover:bg-muted/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-montserrat font-semibold text-sm text-foreground">{order.id}</span>
                      <span className={`text-xs font-ibm font-medium px-2 py-0.5 rounded-full ${statusColor[order.status]}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground font-ibm mt-0.5">{order.customer} · {order.time}</p>
                  </div>
                  <div className="font-montserrat font-bold text-[hsl(var(--bear-navy))] text-sm">
                    {order.total.toLocaleString("ru-RU")} ₽
                  </div>
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    <Icon name="ChevronRight" size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {tab === "products" && (
        <div className="bg-white border border-border rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="font-montserrat font-semibold text-lg text-foreground">Товары ({PRODUCTS.length})</h2>
            <button className="flex items-center gap-2 bg-[hsl(var(--bear-navy))] text-white font-ibm font-medium px-4 py-2 rounded-xl text-sm hover:opacity-90 transition-opacity">
              <Icon name="Plus" size={14} />
              Добавить товар
            </button>
          </div>
          <div className="divide-y divide-border">
            {PRODUCTS.map(product => (
              <div key={product.id} className="flex items-center gap-4 px-6 py-4 hover:bg-muted/50 transition-colors">
                <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-xl flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-montserrat font-semibold text-sm text-foreground truncate">{product.name}</p>
                  <p className="text-xs text-muted-foreground font-ibm">{product.category} · ★ {product.rating}</p>
                </div>
                <div className="text-right">
                  <div className="font-montserrat font-bold text-sm text-[hsl(var(--bear-navy))]">
                    {product.price.toLocaleString("ru-RU")} ₽
                  </div>
                  {product.isVeteran && <span className="text-xs">🎖️</span>}
                </div>
                <div className="flex gap-1">
                  <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
                    <Icon name="Pencil" size={14} className="text-muted-foreground" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-red-50 transition-colors">
                    <Icon name="Trash2" size={14} className="text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "orders" && (
        <div className="bg-white border border-border rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="font-montserrat font-semibold text-lg text-foreground">Управление заказами</h2>
          </div>
          <div className="p-8 text-center text-muted-foreground font-ibm">
            <div className="text-4xl mb-3">📦</div>
            <p>Полный список заказов будет здесь после подключения базы данных</p>
          </div>
        </div>
      )}

      {tab === "users" && (
        <div className="bg-white border border-border rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="font-montserrat font-semibold text-lg text-foreground">Пользователи</h2>
          </div>
          <div className="p-8 text-center text-muted-foreground font-ibm">
            <div className="text-4xl mb-3">👥</div>
            <p>Управление пользователями появится после настройки аутентификации</p>
          </div>
        </div>
      )}
    </div>
  );
}