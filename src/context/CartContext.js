import React, { createContext, useContext, useMemo, useState } from 'react';
import { promoCodes } from '../data/mockData';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // { id, name, price, qty, notes }
  const [promo, setPromo] = useState(null);
  const [orderType, setOrderType] = useState('Dine-in'); // 'Dine-in' | 'Takeaway'
  const [orderStatus, setOrderStatus] = useState(null); // null until placed

  function addToCart(menuItem) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === menuItem.id);
      if (existing) {
        return prev.map((i) => (i.id === menuItem.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...menuItem, qty: 1, notes: '' }];
    });
  }

  function updateQty(id, delta) {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i))
        .filter((i) => i.qty > 0)
    );
  }

  function updateNotes(id, notes) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, notes } : i)));
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function applyPromo(code) {
    const key = code.trim().toUpperCase();
    if (promoCodes[key]) {
      setPromo({ code: key, discount: promoCodes[key] });
      return true;
    }
    setPromo(null);
    return false;
  }

  function clearCart() {
    setItems([]);
    setPromo(null);
  }

  function placeOrder() {
    setOrderStatus('Order Placed');
  }

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items]);
  const discount = promo ? subtotal * promo.discount : 0;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + tax;
  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);

  const value = {
    items,
    addToCart,
    updateQty,
    updateNotes,
    removeItem,
    promo,
    applyPromo,
    clearCart,
    orderType,
    setOrderType,
    subtotal,
    discount,
    tax,
    total,
    itemCount,
    orderStatus,
    setOrderStatus,
    placeOrder,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
