import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2 } from "lucide-react";

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CartSheet = ({ open, onOpenChange }: CartSheetProps) => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
  } = useCart();

  const total = getTotalPrice();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col h-full">
        <SheetHeader className="border-b pb-2">
          <SheetTitle>Your Cart 🛒</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          <AnimatePresence>
            {cart.length > 0 ? (
              cart.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between border-b pb-3"
                >
                  {/* Product Info */}
                  <div className="flex items-center gap-3">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-14 h-14 bg-muted rounded-md flex items-center justify-center text-xl">
                        📦
                      </div>
                    )}

                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ₹{item.price.toFixed(2)} × {item.quantity}
                      </p>
                      <p className="text-sm font-semibold text-primary">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateQuantity(item._id, item.quantity - 1)
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item._id)}
                    >
                      <X className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-muted-foreground mt-20"
              >
                Your cart is empty 🛍️
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <SheetFooter className="border-t pt-3">
            <div className="flex flex-col w-full space-y-3">
              <div className="flex justify-between text-base font-medium">
                <span>Total:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              <div className="flex justify-between gap-3">
                <Button
                  variant="destructive"
                  className="w-1/2"
                  onClick={clearCart}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Cart
                </Button>
                <Button className="w-1/2" onClick={() => alert("Checkout coming soon!")}>
                  Checkout
                </Button>
              </div>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
