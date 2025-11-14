import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product._id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="group overflow-hidden border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative">
        {/* ❤️ Wishlist Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.preventDefault(); // prevent opening product detail when clicked
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full bg-background/70 backdrop-blur-sm shadow-sm ${
            wishlisted ? "text-red-500" : "text-muted-foreground"
          } hover:scale-110 transition-transform`}
        >
          <Heart
            className={`h-5 w-5 ${wishlisted ? "fill-red-500" : "fill-transparent"}`}
          />
        </motion.button>

        {/* Clickable Product Area */}
        <Link to={`/products/${product._id}`}>
          <div className="aspect-square overflow-hidden bg-muted">
            {product.pimage ? (
              <motion.img
                src={product.pimage}
                alt={product.pname}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-muted">
                <span className="text-muted-foreground text-4xl">📦</span>
              </div>
            )}
          </div>

          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">
              {product.pname}
            </h3>
            {product.description && (
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                {product.description}
              </p>
            )}
            <div className="flex items-center justify-between">
              <span className="text-primary font-bold text-xl">
                ₹{product.pprice}
              </span>
              {product.stock !== undefined && (
                <span className="text-xs text-muted-foreground">
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </span>
              )}
            </div>
          </CardContent>
        </Link>

        <CardFooter className="p-4 pt-0">
          <Button
            onClick={() => addToCart(product)}
            className="w-full transition-transform hover:scale-[1.02]"
            disabled={product.stock === 0}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
