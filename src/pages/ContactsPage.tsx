import Icon from "@/components/ui/icon";

const contacts = [
  { icon: "Phone", label: "Телефон", value: "+7 (800) 550-60-50", sub: "Бесплатно по России" },
  { icon: "Mail", label: "Email", value: "hello@mishkamarket.ru", sub: "Ответим в течение 2 часов" },
  { icon: "MapPin", label: "Офис", value: "Москва, ул. Деловая, 15", sub: "Пн–Пт: 9:00–18:00" },
  { icon: "MessageCircle", label: "Telegram", value: "@mishkamarket", sub: "Онлайн-поддержка 24/7" },
];

export default function ContactsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">🐻</div>
        <h1 className="font-montserrat font-bold text-3xl text-foreground mb-2">Свяжитесь с нами</h1>
        <p className="text-muted-foreground font-ibm">Мы всегда рады помочь. Выберите удобный способ связи</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 section-stagger">
        {contacts.map(c => (
          <div key={c.label} className="bg-white border border-border rounded-2xl p-6 card-hover animate-fade-in flex gap-4">
            <div className="w-12 h-12 rounded-xl bear-gradient flex items-center justify-center flex-shrink-0">
              <Icon name={c.icon} size={20} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-ibm mb-0.5">{c.label}</p>
              <p className="font-montserrat font-semibold text-foreground">{c.value}</p>
              <p className="text-xs text-muted-foreground font-ibm mt-0.5">{c.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="bg-white border border-border rounded-3xl p-8">
        <h2 className="font-montserrat font-bold text-xl text-foreground mb-6">Написать нам</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-ibm font-medium text-muted-foreground mb-1.5">Имя</label>
            <input
              type="text"
              placeholder="Иван Петров"
              className="w-full px-4 py-3 border border-border rounded-xl text-sm font-ibm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--bear-navy))]"
            />
          </div>
          <div>
            <label className="block text-xs font-ibm font-medium text-muted-foreground mb-1.5">Email или телефон</label>
            <input
              type="text"
              placeholder="ivan@email.ru"
              className="w-full px-4 py-3 border border-border rounded-xl text-sm font-ibm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--bear-navy))]"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-xs font-ibm font-medium text-muted-foreground mb-1.5">Тема</label>
          <select className="w-full px-4 py-3 border border-border rounded-xl text-sm font-ibm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--bear-navy))] bg-white">
            <option>Вопрос о товаре</option>
            <option>Статус заказа</option>
            <option>Возврат / обмен</option>
            <option>Льготы для ветеранов</option>
            <option>Сотрудничество</option>
            <option>Другое</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-xs font-ibm font-medium text-muted-foreground mb-1.5">Сообщение</label>
          <textarea
            rows={4}
            placeholder="Опишите ваш вопрос..."
            className="w-full px-4 py-3 border border-border rounded-xl text-sm font-ibm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--bear-navy))] resize-none"
          />
        </div>
        <button className="bear-gradient text-white font-montserrat font-bold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2">
          <Icon name="Send" size={16} />
          Отправить сообщение
        </button>
      </div>
    </div>
  );
}
