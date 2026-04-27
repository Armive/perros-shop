'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  ShoppingCart,
  Trash2,
  Minus,
  Plus,
  ArrowLeft,
  CreditCard,
  Truck,
  Gift,
  Check,
} from 'lucide-react';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const shipping = totalPrice >= 50 ? 0 : 5.99;
  const discount = promoApplied ? totalPrice * 0.1 : 0;
  const finalTotal = totalPrice + shipping - discount;

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'kittens10') {
      setPromoApplied(true);
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      alert('Gracias por tu compra! (Esta es una demo)');
      clearCart();
      setIsCheckingOut(false);
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-md text-center">
          <div className="bg-secondary mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full">
            <ShoppingCart className="text-muted-foreground h-12 w-12" />
          </div>
          <h1 className="text-2xl font-bold">Tu carrito esta vacio</h1>
          <p className="text-muted-foreground mt-2">
            Explora nuestra tienda y encuentra productos increibles para tu mascota.
          </p>
          <Button asChild className="mt-6 gap-2">
            <Link href="/tienda">
              <ArrowLeft className="h-4 w-4" />
              Ir a la tienda
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Carrito de Compras</h1>
          <p className="text-muted-foreground mt-1">
            {totalItems} producto{totalItems !== 1 ? 's' : ''} en tu carrito
          </p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:text-destructive gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Vaciar carrito
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Vaciar carrito</AlertDialogTitle>
              <AlertDialogDescription>
                Estas seguro de que quieres eliminar todos los productos de tu carrito? Esta accion
                no se puede deshacer.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={clearCart}>Si, vaciar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="divide-border divide-y p-0">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4">
                  {/* Image */}
                  <Link href={`/producto/${item.id}`} className="shrink-0">
                    <div className="bg-secondary relative h-24 w-24 overflow-hidden rounded-lg">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                      />
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <Link href={`/producto/${item.id}`}>
                        <h3 className="hover:text-muted-foreground font-semibold">{item.name}</h3>
                      </Link>
                      <p className="text-muted-foreground text-sm">{item.brand}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="border-border flex items-center rounded-lg border">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      {/* Price & Remove */}
                      <div className="flex items-center gap-4">
                        <span className="font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive h-8 w-8"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Continue Shopping */}
          <Link
            href="/tienda"
            className="text-muted-foreground hover:text-foreground mt-4 inline-flex items-center gap-2 text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Continuar comprando
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Promo Code */}
              <div>
                <label className="mb-2 block text-sm font-medium">Codigo promocional</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Ingresa tu codigo"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={promoApplied}
                  />
                  <Button
                    variant="outline"
                    onClick={handleApplyPromo}
                    disabled={promoApplied || !promoCode}
                  >
                    {promoApplied ? <Check className="h-4 w-4" /> : 'Aplicar'}
                  </Button>
                </div>
                {promoApplied && (
                  <p className="mt-1 text-sm text-green-600">Codigo KITTENS10 aplicado (-10%)</p>
                )}
                <p className="text-muted-foreground mt-1 text-xs">Prueba: KITTENS10</p>
              </div>

              <Separator />

              {/* Summary Items */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Descuento (10%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Envio</span>
                  <span>{shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-muted-foreground text-xs">
                    Envio gratis en pedidos mayores a $50
                  </p>
                )}
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-3">
              <Button
                className="w-full gap-2"
                size="lg"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? (
                  'Procesando...'
                ) : (
                  <>
                    <CreditCard className="h-4 w-4" />
                    Finalizar Compra
                  </>
                )}
              </Button>

              {/* Trust Badges */}
              <div className="text-muted-foreground mt-2 flex items-center justify-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <Truck className="h-4 w-4" />
                  <span>Envio rapido</span>
                </div>
                <div className="flex items-center gap-1">
                  <Gift className="h-4 w-4" />
                  <span>Devoluciones</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
