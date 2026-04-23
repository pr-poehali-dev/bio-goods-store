import { useState } from "react";
import { Page } from "@/App";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  cartCount: number;
}

const navItems: { id: Page; label: string; icon: string }[] = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "catalog", label: "Каталог", icon: "Grid3X3" },
  { id: "veterans", label: "Ветеранам", icon: "Shield" },
  { id: "cart", label: "Корзина", icon: "ShoppingCart" },
  { id: "profile", label: "Профиль", icon: "User" },
  { id: "contacts", label: "Контакты", icon: "Phone" },
  { id: "admin", label: "Админ", icon: "Settings" },
];

export default function Navbar({ currentPage, onNavigate, cartCount }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 group"
          >
            <span className="text-2xl group-hover:animate-bear-float inline-block transition-transform">🐻</span>
            <div className="flex flex-col leading-none">
              <span className="font-montserrat font-800 text-lg text-[hsl(var(--bear-navy))] tracking-tight">
                Мишка<span className="text-[hsl(var(--bear-gold))]">Маркет</span>
              </span>
              <span className="text-[10px] text-muted-foreground font-ibm tracking-widest uppercase">
                Деловой маркетплейс
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative px-3 py-2 text-sm font-ibm font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5
                  ${currentPage === item.id
                    ? "bg-[hsl(var(--bear-navy))] text-white"
                    : "text-foreground hover:bg-secondary hover:text-[hsl(var(--bear-navy))]"
                  }
                  ${item.id === "veterans" ? "text-[#b8382b] hover:bg-red-50" : ""}
                  ${item.id === "veterans" && currentPage === "veterans" ? "bg-[#b8382b] text-white" : ""}
                `}
              >
                {item.id === "veterans" && <span className="text-xs">🎖️</span>}
                {item.label}
                {item.id === "cart" && cartCount > 0 && (
                  <span className="ml-0.5 bg-[hsl(var(--bear-gold))] text-[hsl(var(--bear-navy))] text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            {cartCount > 0 && (
              <button onClick={() => onNavigate("cart")} className="relative p-2">
                <Icon name="ShoppingCart" size={20} />
                <span className="absolute -top-1 -right-1 bg-[hsl(var(--bear-gold))] text-[hsl(var(--bear-navy))] text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              </button>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg hover:bg-secondary"
            >
              <Icon name={mobileOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border pb-3 pt-2 animate-fade-in">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-ibm rounded-lg transition-colors
                  ${currentPage === item.id
                    ? "bg-[hsl(var(--bear-navy))] text-white"
                    : "text-foreground hover:bg-secondary"
                  }
                `}
              >
                <Icon name={item.icon} size={16} />
                {item.label}
                {item.id === "cart" && cartCount > 0 && (
                  <Badge className="ml-auto bg-[hsl(var(--bear-gold))] text-[hsl(var(--bear-navy))]">
                    {cartCount}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}