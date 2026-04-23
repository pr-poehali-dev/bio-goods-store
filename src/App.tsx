import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "@/pages/HomePage";
import CatalogPage from "@/pages/CatalogPage";
import VeteransPage from "@/pages/VeteransPage";
import CartPage from "@/pages/CartPage";
import ProfilePage from "@/pages/ProfilePage";
import ContactsPage from "@/pages/ContactsPage";
import AdminPage from "@/pages/AdminPage";
import Navbar from "@/components/Navbar";
import { CartItem, Product } from "@/types";

export type Page = "home" | "catalog" | "veterans" | "cart" | "profile" | "contacts" | "admin";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [viewHistory, setViewHistory] = useState<number[]>([]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const trackView = (productId: number) => {
    setViewHistory(prev => {
      const filtered = prev.filter(id => id !== productId);
      return [productId, ...filtered].slice(0, 20);
    });
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={setCurrentPage} addToCart={addToCart} trackView={trackView} viewHistory={viewHistory} />;
      case "catalog":
        return <CatalogPage addToCart={addToCart} trackView={trackView} viewHistory={viewHistory} />;
      case "veterans":
        return <VeteransPage addToCart={addToCart} trackView={trackView} />;
      case "cart":
        return <CartPage cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} onNavigate={setCurrentPage} />;
      case "profile":
        return <ProfilePage viewHistory={viewHistory} onNavigate={setCurrentPage} />;
      case "contacts":
        return <ContactsPage />;
      case "admin":
        return <AdminPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} addToCart={addToCart} trackView={trackView} viewHistory={viewHistory} />;
    }
  };

  return (
    <TooltipProvider>
      <Toaster />
      <div className="min-h-screen bg-background">
        <Navbar
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          cartCount={cartCount}
        />
        <main>{renderPage()}</main>
      </div>
    </TooltipProvider>
  );
}
