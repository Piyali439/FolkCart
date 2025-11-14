import { useWishlist } from "@/context/WishlistContext";
import { ProductCard } from "@/components/ProductCard";
import { Header } from "@/components/Header";

const Wishlist = () => {
  const { wishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-6">My Favorites ❤️</h1>

        {wishlist.length === 0 ? (
          <p className="text-muted-foreground">No favorite products yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Wishlist;
