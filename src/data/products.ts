import { Product } from "@/types";

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Деловой ноутбук ProBook 15",
    price: 89900,
    oldPrice: 105000,
    category: "Электроника",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 234,
    badge: "Хит продаж",
    description: "Мощный ноутбук для бизнеса с процессором Intel Core i7",
    tags: ["ноутбук", "электроника", "офис"],
  },
  {
    id: 2,
    name: "Кожаный портфель Executive",
    price: 12500,
    category: "Аксессуары",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 89,
    description: "Натуральная кожа, отделения для документов и ноутбука",
    tags: ["портфель", "кожа", "офис"],
  },
  {
    id: 3,
    name: "Умные часы Business Pro",
    price: 24900,
    oldPrice: 29900,
    category: "Электроника",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 156,
    badge: "Скидка 17%",
    description: "Бизнес-часы с уведомлениями и мониторингом здоровья",
    tags: ["часы", "электроника", "смарт"],
  },
  {
    id: 4,
    name: "Офисное кресло ErgoMax",
    price: 34500,
    category: "Мебель",
    image: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 312,
    badge: "Выбор редакции",
    description: "Эргономичное кресло для многочасовой работы",
    tags: ["кресло", "мебель", "офис", "эргономика"],
  },
  {
    id: 5,
    name: "Беспроводные наушники SoundBiz",
    price: 8900,
    oldPrice: 11500,
    category: "Электроника",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    rating: 4.5,
    reviews: 445,
    description: "Шумоподавление, 30 часов автономной работы",
    tags: ["наушники", "электроника", "звук"],
  },
  {
    id: 6,
    name: "Планировщик Premium 2026",
    price: 2800,
    category: "Канцелярия",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&h=300&fit=crop",
    rating: 4.4,
    reviews: 67,
    description: "Кожаный ежедневник с перьевой бумагой",
    tags: ["ежедневник", "планер", "офис"],
  },
  {
    id: 7,
    name: "Тактический рюкзак Ветеран",
    price: 6900,
    oldPrice: 9500,
    category: "Снаряжение",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 203,
    badge: "Для ветеранов",
    isVeteran: true,
    description: "Прочный тактический рюкзак 45л для любых условий",
    tags: ["рюкзак", "тактический", "ветеран"],
  },
  {
    id: 8,
    name: "Медицинская аптечка Первая помощь",
    price: 3200,
    category: "Здоровье",
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop",
    rating: 5.0,
    reviews: 89,
    badge: "Для ветеранов",
    isVeteran: true,
    description: "Комплектная аптечка первой помощи профессионального уровня",
    tags: ["аптечка", "медицина", "ветеран"],
  },
  {
    id: 9,
    name: "Спортивный костюм Recovery Pro",
    price: 7400,
    oldPrice: 10000,
    category: "Одежда",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 134,
    badge: "Для ветеранов",
    isVeteran: true,
    description: "Специальный реабилитационный костюм для восстановления",
    tags: ["одежда", "спорт", "реабилитация", "ветеран"],
  },
  {
    id: 10,
    name: "Монитор UltraWide 34\"",
    price: 54900,
    category: "Электроника",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 178,
    description: "Ультраширокий монитор для продуктивной работы",
    tags: ["монитор", "электроника", "офис"],
  },
  {
    id: 11,
    name: "Кофемашина Office Barista",
    price: 18900,
    oldPrice: 22000,
    category: "Техника",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 290,
    badge: "Новинка",
    description: "Автоматическая кофемашина для офиса на 20 человек",
    tags: ["кофе", "техника", "офис"],
  },
  {
    id: 12,
    name: "Настольная лампа Smart Desk",
    price: 4500,
    category: "Освещение",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop",
    rating: 4.3,
    reviews: 55,
    description: "Умная лампа с настройкой цветовой температуры",
    tags: ["лампа", "освещение", "умный дом"],
  },
];

export const CATEGORIES = ["Все", "Электроника", "Аксессуары", "Мебель", "Канцелярия", "Снаряжение", "Здоровье", "Одежда", "Техника", "Освещение"];

export const getRecommended = (viewHistory: number[], excludeIds: number[] = [], count = 4): Product[] => {
  if (viewHistory.length === 0) {
    return PRODUCTS.filter(p => !excludeIds.includes(p.id)).slice(0, count);
  }

  const viewedProducts = viewHistory
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter(Boolean) as Product[];

  const tagFrequency: Record<string, number> = {};
  viewedProducts.forEach(p => {
    p.tags.forEach(tag => {
      tagFrequency[tag] = (tagFrequency[tag] || 0) + 1;
    });
  });

  const scored = PRODUCTS
    .filter(p => !viewHistory.includes(p.id) && !excludeIds.includes(p.id))
    .map(p => ({
      product: p,
      score: p.tags.reduce((sum, tag) => sum + (tagFrequency[tag] || 0), 0) + p.rating,
    }))
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, count).map(s => s.product);
};
