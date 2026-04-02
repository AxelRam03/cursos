import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: [],

  addItem: (product, quantity = 1) => {
    const { items } = get();
    const existing = items.find((i) => i.product.id === product.id);
    if (existing) {
      if (existing.quantity + quantity > product.stock)
        throw new Error(`Stock insuficiente. Disponible: ${product.stock}`);
      set({
        items: items.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        ),
      });
    } else {
      if (quantity > product.stock)
        throw new Error(`Stock insuficiente. Disponible: ${product.stock}`);
      set({ items: [...items, { product, quantity }] });
    }
  },

  removeItem: (productId) =>
    set({ items: get().items.filter((i) => i.product.id !== productId) }),

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) { get().removeItem(productId); return; }
    set({
      items: get().items.map((i) =>
        i.product.id === productId ? { ...i, quantity } : i
      ),
    });
  },

  clearCart: () => set({ items: [] }),
  getTotal:  () => get().items.reduce((s, i) => s + i.product.price * i.quantity, 0),
  getCount:  () => get().items.reduce((s, i) => s + i.quantity, 0),
}));
