import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/types/product";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`http://localhost:2000/product/sel/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
           setProduct(null);
            return;
      }
      throw new Error("Failed to fetch product");
    }
    const data = await response.json();
    setProduct(data);
    } catch (err) {
      console.error("Error fetching product:", err);
      setError("Could not load product details.");
      setProduct(null);;
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
         <p className="text-destructive mb-2">{error || "Product not found"}</p>
          <Link to="/products">
           <Button variant="outline" className="mt-4">
             <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
           </Button>
           </Link>
       </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Product not found</p>
        <Link to="/products">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <Link to="/products" className="inline-flex items-center mb-6 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10"
        >
          {/* Left: Product Image */}
          <div className="rounded-lg overflow-hidden bg-muted aspect-square">
            {product.pimage ? (
              <motion.img
                src={product.pimage}
                alt={product.pname}
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-6xl">📦</div>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-2">{product.pname}</h1>
            <p className="text-muted-foreground mb-4">{product.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-primary">
                ₹{product.pprice.toFixed(2)}
              </span>
              {product.stock !== undefined && (
                <span className="text-sm text-muted-foreground">
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </span>
              )}
            </div>

            <Button
              size="lg"
              className="w-full sm:w-auto"
              disabled={product.stock === 0}
              onClick={() => addToCart(product)}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </motion.div>

        {/* “You may also like” section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="rounded-lg overflow-hidden bg-muted h-48"
              >
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Coming soon...
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
