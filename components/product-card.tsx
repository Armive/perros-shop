'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Check } from 'lucide-react';
import { useState } from 'react';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const price = product.selectedOrFirstAvailableVariant?.price?.amount;
  const currency = product.selectedOrFirstAvailableVariant?.price?.currencyCode;

  const formattedPrice = price
    ? new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(parseFloat(price))
    : '';

  const cleanId = product.id.split('/').pop();

  return (
    <Link href={`/tienda/${cleanId}`} className="block">
      <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-md">
        {/* 🟣 Glow visible */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
          <div className="absolute inset-0 rounded-2xl shadow-[0_0_40px_10px_rgba(139,92,246,0.25)]" />
        </div>

        {/* Imagen */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.featuredImage?.url || '/placeholder.png'}
            alt={product.title || 'Producto'}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
          />

          {/* Badge */}
          {product.collections?.edges?.length > 0 && (
            <div className="absolute top-3 left-3">
              <Badge className="border bg-white/90 text-xs text-black backdrop-blur">
                {product.collections.edges[0].node.title}
              </Badge>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-2 p-4">
          <h3 className="line-clamp-2 text-sm font-medium text-gray-800 transition group-hover:text-black">
            {product.title}
          </h3>

          <p className="text-lg font-semibold text-black">{formattedPrice}</p>
        </div>

        {/* Botón */}
        <div className="p-4 pt-0">
          <Button
            size="sm"
            onClick={handleAddToCart}
            className={`w-full rounded-lg transition-all ${
              isAdded ? 'bg-green-600 hover:bg-green-600' : 'bg-black text-white hover:bg-gray-900'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="mr-1 h-4 w-4" />
                Agregado
              </>
            ) : (
              <>
                <ShoppingCart className="mr-1 h-4 w-4" />
                Agregar
              </>
            )}
          </Button>
        </div>
      </div>
    </Link>
  );
}
