import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Product } from "@/types/product";
import { toast } from "@/hooks/use-toast";

interface WishlistContextType {
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isWishlisted: (id: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // ✅ Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) setWishlist(JSON.parse(stored));
  }, []);

  // ✅ Persist changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p._id === product._id);
      if (exists) {
        toast({
          title: "Removed from Favorites",
          description: `${product.pname} was removed.`,
        });
        return prev.filter((p) => p._id !== product._id);
      } else {
        toast({
          title: "Added to Favorites",
          description: `${product.pname} saved to wishlist.`,
        });
        return [...prev, product];
      }
    });
  };

  const isWishlisted = (id: string) => wishlist.some((p) => p._id === id);

  const clearWishlist = () => {
    setWishlist([]);
    toast({
      title: "Wishlist Cleared",
      description: "All favorite items removed.",
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
};
