import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProductCard } from '@/components/product-card';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Truck, Shield, Clock, Heart, Cat, Dog, Sparkles } from 'lucide-react';
import { getCollections } from '@/lib/tribi';

export default async function HomePage() {
  const featuredProducts = products.slice(0, 8);
  const collections = await getCollections();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-foreground text-background relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div className="border-background/20 bg-background/10 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm">
                <Sparkles className="h-4 w-4" />
                <span>Nueva coleccion disponible</span>
              </div>
              <h1 className="text-4xl leading-tight font-bold tracking-tight text-balance md:text-5xl lg:text-6xl">
                Todo para tus mejores amigos
              </h1>
              <p className="text-background/80 text-lg text-pretty md:text-xl">
                Descubre productos premium para perros y gatos. Calidad, estilo y amor en cada
                compra.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" variant="secondary" className="gap-2">
                  <Link href="/tienda">
                    Ver Tienda <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-background/20 text-background hover:bg-background/10"
                >
                  <Link href="/tips">Consejos Pet</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-background/10 relative aspect-[4/5] overflow-hidden rounded-2xl">
                    <Image
                      src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=500&fit=crop"
                      alt="Perro feliz"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-background/10 rounded-xl p-4 backdrop-blur">
                    <div className="flex items-center gap-2">
                      <Dog className="h-5 w-5" />
                      <span className="font-medium">+500 productos</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-background/10 rounded-xl p-4 backdrop-blur">
                    <div className="flex items-center gap-2">
                      <Cat className="h-5 w-5" />
                      <span className="font-medium">Envio gratis</span>
                    </div>
                  </div>
                  <div className="bg-background/10 relative aspect-[4/5] overflow-hidden rounded-2xl">
                    <Image
                      src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=500&fit=crop"
                      alt="Gato elegante"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">Explora por Categoria</h2>
            <p className="text-muted-foreground mt-2">
              Encuentra exactamente lo que tu mascota necesita
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {collections.map((category) => (
              <Link key={category.name} href={category.href}>
                <Card className="group overflow-hidden p-0 transition-all hover:shadow-lg">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={
                        category.image ? category.image.url : 'https://via.placeholder.com/300x200'
                      }
                      alt={category.name}
                      fill={true}
                      className="h-full w-full object-cover"
                      loading="eager"
                    />

                    <div className="from-foreground/80 absolute inset-0 bg-gradient-to-t to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-background text-xl font-bold">{category.name}</h3>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="border-border mx-16 border-y py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">Productos Destacados</h2>
              <p className="text-muted-foreground mt-2">Los favoritos de nuestros clientes</p>
            </div>
            <Button asChild variant="outline" className="hidden gap-2 md:flex">
              <Link href="/tienda">
                Ver todos <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Button asChild variant="outline" className="gap-2">
              <Link href="/tienda">
                Ver todos los productos <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-border bg-secondary/30 border-t py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Truck, title: 'Envio Gratis', description: 'En pedidos mayores a $50' },
              { icon: Shield, title: 'Pago Seguro', description: 'Transacciones 100% seguras' },
              { icon: Clock, title: 'Entrega Rapida', description: '24-48 horas habiles' },
              { icon: Heart, title: 'Satisfaccion', description: 'Garantia de devolucion' },
            ].map((feature) => (
              <Card key={feature.title} className="text-center">
                <CardContent className="flex flex-col items-center gap-4 p-6">
                  <div className="bg-foreground flex h-12 w-12 items-center justify-center rounded-full">
                    <feature.icon className="text-background h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Feed Style */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">#KittensPets</h2>
            <p className="text-muted-foreground mt-2">Comparte fotos de tu mascota con nosotros</p>
          </div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
            {[
              'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=300&fit=crop',
              'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=300&fit=crop',
              'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=300&h=300&fit=crop',
              'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=300&h=300&fit=crop',
            ].map((src, idx) => (
              <div key={idx} className="group relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={src}
                  alt={`Pet ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="bg-foreground/0 group-hover:bg-foreground/50 absolute inset-0 flex items-center justify-center opacity-0 transition-all group-hover:opacity-100">
                  <Heart className="text-background h-8 w-8" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-foreground text-background py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Unete a nuestra comunidad</h2>
          <p className="text-background/80 mx-auto mt-4 max-w-xl">
            Recibe ofertas exclusivas, consejos para tu mascota y noticias de nuevos productos.
          </p>
          <div className="mx-auto mt-8 flex max-w-md gap-4">
            <input
              type="email"
              placeholder="Tu correo electronico"
              className="bg-background/10 text-background placeholder:text-background/50 focus:ring-background/50 flex-1 rounded-lg border-0 px-4 py-3 focus:ring-2 focus:outline-none"
            />
            <Button variant="secondary" size="lg">
              Suscribirse
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
