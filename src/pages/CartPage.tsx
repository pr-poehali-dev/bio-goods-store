import { CartItem, Product } from "@/types";
import { Page } from "@/App";
import Icon from "@/components/ui/icon";

interface CartPageProps {
  cart: CartItem[];
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  onNavigate: (page: Page) => void;
}

export default function CartPage({ cart, removeFromCart, updateQuantity, onNavigate }: CartPageProps) {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const savings = cart.reduce((sum, item) => {
    if (item.product.oldPrice) return sum + (item.product.oldPrice - item.product.price) * item.quantity;
    return sum;
  }, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="text-7xl mb-6">🐻</div>
        <h2 className="font-montserrat font-bold text-2xl text-foreground mb-2">Корзина пуста</h2>
        <p className="text-muted-foreground font-ibm mb-8">Мишка ждёт, когда вы добавите что-нибудь в корзину</p>
        <button
          onClick={() => onNavigate("catalog")}
          className="bg-[hsl(var(--bear-navy))] text-white font-montserrat font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity"
        >
          Перейти в каталог
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="font-montserrat font-bold text-3xl text-foreground mb-2">Корзина</h1>
      <p className="text-muted-foreground font-ibm mb-8">{totalItems} {totalItems === 1 ? "товар" : totalItems < 5 ? "товара" : "товаров"}</p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Items */}
        <div className="flex-1 space-y-3">
          {cart.map(item => (
            <div key={item.product.id} className="bg-white border border-border rounded-2xl p-4 flex gap-4 card-hover animate-fade-in">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground font-ibm">{item.product.category}</p>
                <h3 className="font-montserrat font-semibold text-sm text-foreground mt-0.5 line-clamp-2">{item.product.name}</h3>
                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map(s => (
                    <span key={s} className={`text-xs ${s <= Math.floor(item.product.rating) ? "text-[hsl(var(--bear-gold))]" : "text-muted"}`}>★</span>
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">({item.product.reviews})</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3 flex-shrink-0">
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Icon name="Trash2" size={14} />
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                  >
                    <Icon name="Minus" size={12} />
                  </button>
                  <span className="font-montserrat font-semibold text-sm w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                  >
                    <Icon name="Plus" size={12} />
                  </button>
                </div>
                <div className="text-right">
                  <div className="font-montserrat font-bold text-[hsl(var(--bear-navy))] text-sm">
                    {(item.product.price * item.quantity).toLocaleString("ru-RU")} ₽
                  </div>
                  {item.product.oldPrice && (
                    <div className="text-xs text-muted-foreground line-through">
                      {(item.product.oldPrice * item.quantity).toLocaleString("ru-RU")} ₽
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="bg-white border border-border rounded-2xl p-6 sticky top-24">
            <h3 className="font-montserrat font-bold text-lg text-foreground mb-4">Итого</h3>
            <div className="space-y-3 pb-4 border-b border-border">
              <div className="flex justify-between text-sm font-ibm">
                <span className="text-muted-foreground">Товары ({totalItems} шт.)</span>
                <span>{total.toLocaleString("ru-RU")} ₽</span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between text-sm font-ibm">
                  <span className="text-muted-foreground">Экономия</span>
                  <span className="text-green-600 font-medium">-{savings.toLocaleString("ru-RU")} ₽</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-ibm">
                <span className="text-muted-foreground">Доставка</span>
                <span className="text-green-600 font-medium">Бесплатно</span>
              </div>
            </div>
            <div className="flex justify-between items-center py-4">
              <span className="font-montserrat font-bold text-foreground">К оплате</span>
              <span className="font-montserrat font-extrabold text-xl text-[hsl(var(--bear-navy))]">
                {total.toLocaleString("ru-RU")} ₽
              </span>
            </div>
            {savings > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4 text-xs text-green-700 font-ibm text-center">
                Вы экономите {savings.toLocaleString("ru-RU")} ₽
              </div>
            )}
            <button className="w-full bg-[hsl(var(--bear-navy))] hover:bg-[hsl(220,70%,28%)] text-white font-montserrat font-bold py-4 rounded-xl transition-colors">
              Оформить заказ
            </button>
            <button
              onClick={() => onNavigate("catalog")}
              className="w-full mt-3 text-[hsl(var(--bear-navy))] font-ibm font-medium py-2 text-sm hover:underline transition-all"
            >
              ← Продолжить покупки
            </button>

            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground font-ibm">
              <div className="flex items-center gap-1"><Icon name="ShieldCheck" size={12} /><span>Безопасная оплата</span></div>
              <div className="flex items-center gap-1"><Icon name="Truck" size={12} /><span>Быстрая доставка</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
