import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/ProductCard";
import { Header } from "@/components/Header";
import { Loader2 } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch("http://localhost:2000/product/sel");
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch products from server");
      }
      
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products");
      console.error("Error fetching products:", err);
      
      // Demo data for testing when backend is not available
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-destructive mb-4">{error}</p>
            <p className="text-muted-foreground text-sm">Showing demo products instead</p>
          </div>
        ) : null}

        {!loading && (
          <>
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Our Products</h1>
              <p className="text-lg text-muted-foreground">
                Authentic handicrafts and local products from Jhargram
              </p>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No products available</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Products;
