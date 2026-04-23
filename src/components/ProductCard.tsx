import { Product } from "@/types";
import Icon from "@/components/ui/icon";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onView?: (productId: number) => void;
  compact?: boolean;
}

export default function ProductCard({ product, onAddToCart, onView, compact }: ProductCardProps) {
  const handleClick = () => {
    if (onView) onView(product.id);
  };

  return (
    <div
      className="bg-white rounded-2xl border border-border overflow-hidden card-hover cursor-pointer group animate-fade-in"
      onClick={handleClick}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${compact ? "h-36" : "h-48"}`}
        />
        {product.badge && (
          <span className={`absolute top-2 left-2 text-xs font-montserrat font-semibold px-2 py-1 rounded-full
            ${product.badge.includes("ветеран") || product.badge.includes("Ветеран")
              ? "vet-badge"
              : "bg-[hsl(var(--bear-navy))] text-white"
            }
          `}>
            {product.badge}
          </span>
        )}
        {product.isVeteran && (
          <span className="absolute top-2 right-2 text-lg">🎖️</span>
        )}
      </div>

      <div className={`${compact ? "p-3" : "p-4"}`}>
        <p className="text-xs text-muted-foreground font-ibm mb-1">{product.category}</p>
        <h3 className={`font-montserrat font-semibold text-foreground leading-tight mb-2 ${compact ? "text-sm" : "text-base"}`}>
          {product.name}
        </h3>

        {!compact && (
          <p className="text-xs text-muted-foreground font-ibm mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[1, 2, 3, 4, 5].map(star => (
              <span key={star} className={`text-xs ${star <= Math.floor(product.rating) ? "text-[hsl(var(--bear-gold))]" : "text-muted"}`}>
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-muted-foreground font-ibm">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className={`font-montserrat font-bold text-[hsl(var(--bear-navy))] ${compact ? "text-base" : "text-lg"}`}>
              {product.price.toLocaleString("ru-RU")} ₽
            </span>
            {product.oldPrice && (
              <span className="text-xs text-muted-foreground line-through ml-2">
                {product.oldPrice.toLocaleString("ru-RU")} ₽
              </span>
            )}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); if (onAddToCart) onAddToCart(product); }}
            className="flex items-center gap-1 bg-[hsl(var(--bear-navy))] hover:bg-[hsl(220,70%,28%)] text-white text-xs font-ibm font-medium px-3 py-2 rounded-xl transition-colors"
          >
            <Icon name="ShoppingCart" size={13} />
            {!compact && "В корзину"}
          </button>
        </div>
      </div>
    </div>
  );
}