'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import { useCart } from '@/context/cart-context';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  ShoppingCart,
  Check,
  Minus,
  Plus,
  ArrowLeft,
  Truck,
  Shield,
  RotateCcw,
  Cat,
  Dog,
} from 'lucide-react';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  const { addToCart, items } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    notFound();
  }

  const cartItem = items.find((item) => item.id === product.id);
  const relatedProducts = products
    .filter(
      (p) =>
        p.id !== product.id && (p.category === product.category || p.petType === product.petType)
    )
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const petTypeLabel = {
    perro: 'Perros',
    gato: 'Gatos',
    ambos: 'Perros y Gatos',
  };

  const categoryLabel = {
    comida: 'Comida',
    juguetes: 'Juguetes',
    accesorios: 'Accesorios',
    higiene: 'Higiene',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-muted-foreground mb-8 flex items-center gap-2 text-sm">
        <Link href="/" className="hover:text-foreground">
          Inicio
        </Link>
        <span>/</span>
        <Link href="/tienda" className="hover:text-foreground">
          Tienda
        </Link>
        <span>/</span>
        <Link href={`/tienda?categoria=${product.category}`} className="hover:text-foreground">
          {categoryLabel[product.category]}
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      {/* Back Button */}
      <Link
        href="/tienda"
        className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-2 text-sm"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a la tienda
      </Link>

      {/* Product Details */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image */}
        <div className="bg-secondary relative aspect-square overflow-hidden rounded-2xl">
          <Image src={product.image} alt={product.name} fill className="object-cover" priority />
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <Badge variant="secondary" className="gap-1">
              {product.petType === 'perro' && <Dog className="h-3 w-3" />}
              {product.petType === 'gato' && <Cat className="h-3 w-3" />}
              {product.petType === 'ambos' && (
                <>
                  <Dog className="h-3 w-3" />
                  <Cat className="h-3 w-3" />
                </>
              )}
              {petTypeLabel[product.petType]}
            </Badge>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="outline">{categoryLabel[product.category]}</Badge>
            <span className="text-muted-foreground text-sm">{product.brand}</span>
          </div>

          <h1 className="text-3xl font-bold md:text-4xl">{product.name}</h1>

          <p className="text-muted-foreground mt-4 text-lg">{product.description}</p>

          <div className="mt-6 text-4xl font-bold">${product.price.toFixed(2)}</div>

          {/* Quantity Selector */}
          <div className="mt-8">
            <p className="mb-3 text-sm font-medium">Cantidad</p>
            <div className="flex items-center gap-4">
              <div className="border-border flex items-center rounded-lg border">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {cartItem && (
                <p className="text-muted-foreground text-sm">
                  Ya tienes {cartItem.quantity} en tu carrito
                </p>
              )}
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="mt-8 flex gap-4">
            <Button
              size="lg"
              onClick={handleAddToCart}
              className={`flex-1 gap-2 transition-all ${
                isAdded ? 'bg-green-600 hover:bg-green-600' : ''
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="h-5 w-5" />
                  Agregado al carrito
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  Agregar al carrito
                </>
              )}
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/carrito">Ver carrito</Link>
            </Button>
          </div>

          {/* Features */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="flex items-center gap-3 p-4">
                <Truck className="text-muted-foreground h-5 w-5" />
                <div className="text-sm">
                  <p className="font-medium">Envio gratis</p>
                  <p className="text-muted-foreground">Pedidos +$50</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-3 p-4">
                <Shield className="text-muted-foreground h-5 w-5" />
                <div className="text-sm">
                  <p className="font-medium">Pago seguro</p>
                  <p className="text-muted-foreground">100% protegido</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-3 p-4">
                <RotateCcw className="text-muted-foreground h-5 w-5" />
                <div className="text-sm">
                  <p className="font-medium">Devoluciones</p>
                  <p className="text-muted-foreground">30 dias</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Productos Relacionados</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
