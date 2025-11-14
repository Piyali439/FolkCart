import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { CartItem, Product } from "@/types/product";
import { toast } from "@/hooks/use-toast";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// --- NEW: Session ID Logic ---
const generateSessionId = (): string => {
    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
        // Generate a simple unique ID
        sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
        localStorage.setItem("sessionId", sessionId);
    }
    return sessionId;
};

// --- NEW: Session ID constant generated once ---
const SESSION_ID = generateSessionId();
const CART_API_URL = "http://localhost:2000/cart/save"; 


export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Load from localStorage on startup
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });


  // --- NEW: Helper function to sync cart with backend ---
  const syncCart = async (currentCart: CartItem[]) => {
    const total = currentCart.reduce((t, item) => t + item.price * item.quantity, 0);

    // Map cart items to match the expected backend schema keys (productId, name, price, quantity)
    const cartItemsForBackend = currentCart.map(item => ({
      productId: item._id, // Use _id as productId
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));

    try {
      await fetch(CART_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: SESSION_ID,
          cartItems: cartItemsForBackend,
          totalPrice: total
        }),
      });
      // console.log("Cart synced with database.");
    } catch (error) {
      console.error("Failed to sync cart with database:", error);
      // Optional: Show an error toast here if syncing is critical
    }
  };


  // ✅ Persist cart to localStorage AND Database whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    // --- CALL SYNC FUNCTION ---
    syncCart(cart);
    // --------------------------
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      if (existingItem) {
        toast({
          title: "Cart Updated",
          description: `${product.pname} quantity increased`,
        });
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      toast({
        title: "Added to Cart",
        description: `${product.pname} has been added to your cart`,
      });

      const newCartItem: CartItem = {
        _id: product._id,
        name: product.pname,
        price: product.pprice,
        image: product.pimage,
        quantity: 1,
      };

      return [...prevCart, newCartItem];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
    toast({
      title: "Item Removed",
      description: "Product removed from cart",
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast({
      title: "Cart Cleared",
      description: "All items removed from cart",
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};