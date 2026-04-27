'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product, useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Check } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const petTypeLabel = {
    perro: 'Perros',
    gato: 'Gatos',
    ambos: 'Perros y Gatos',
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
      <Link href={`/producto/${product.id}`}>
        <div className="bg-secondary relative aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            <Badge variant="secondary" className="text-xs">
              {petTypeLabel[product.petType]}
            </Badge>
          </div>
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/producto/${product.id}`}>
          <p className="text-muted-foreground text-xs">{product.brand}</p>
          <h3 className="hover:text-muted-foreground mt-1 line-clamp-1 font-semibold transition-colors">
            {product.name}
          </h3>
          <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">{product.description}</p>
        </Link>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
        <Button
          size="sm"
          onClick={handleAddToCart}
          className={`transition-all ${isAdded ? 'bg-green-600 hover:bg-green-600' : ''}`}
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
      </CardFooter>
    </Card>
  );
}
