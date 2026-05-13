import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/product-card';
import { Card } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { ArrowRight, Truck, Shield, Clock, Heart, FastForward, Pointer, Gauge, Astroid } from 'lucide-react';
import { getProducts, getCollections } from '@/lib/tribi';

export default async function HomePage() {
  const products = await getProducts();
  const collections = await getCollections();

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden  text-black">
        {/* Glow */}
        <div className="absolute -top-40 -left-40 h-[400px] w-[400px] rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute top-20 right-0 h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative container mx-auto px-4 py-24">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <h1 className="text-4xl leading-tight md:text-6xl">
                Todo para tus <span className='font-bold text-blue-500'>amigos peludos</span> en un solo lugar
              </h1>
            </div>

            {/* Imagen */}
            <div className="relative">
              <div className="absolute inset-0 scale-105 rounded-2xl bg-gradient-to-tr from-violet-500/20 to-transparent blur-xl" />
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src="https://www.purina.es/sites/default/files/styles/ttt_image_510/public/2024-02/sitesdefaultfilesstylessquare_medium_440x440public2022-08West20Highland20White20Terrier2.jpg?itok=vKKwHk8k"
                  alt="Mascota"
                  fill
                  className="object-cover"
                  loading='eager'
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
           <p className='text-3xl font-serif'>
            Explora para tu <span className='text-blue-500 font-bold '>peludo</span>
           </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {collections.map((category) => (
               <Link key={category.handle} href={`/tienda?categoria=${category.handle}`} className="group">
                <Card className="group overflow-hidden p-0 transition-all hover:shadow-lg">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={
                        category.image ? category.image.url : 'https://via.placeholder.com/300x200'
                      }
                      alt={category.title}
                      fill={true}
                      className="h-full w-full object-cover"
                      loading="eager"
                    />

                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-blue-500 text-xl font-bold font-serif">{category.title}</h3>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 🛍 PRODUCTOS */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <p className='text-3xl font-serif'>
              Mejores productos para tu <span className='text-blue-500 font-bold '>peludo</span>
            </p>
            
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ⭐ FEATURES */}
      <div className="mb-8 text-center">
            <p className='text-3xl font-serif'>
              Pago seguro para  <span className='text-blue-500 font-bold '>ti</span>
            </p>
            
          </div>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center gap-4 text-center">
              <FastForward className="h-8 w-8 text-blue-500" />
              <h3 className="text-lg font-semibold">Envío Rápido</h3>
            </div>
            <div className="flex flex-col items-center gap-4 text-center">
              <Pointer className="h-8 w-8 text-blue-500" />
              <h3 className="text-lg font-semibold">Pago Seguro</h3>
            </div>
            <div className="flex flex-col items-center gap-4 text-center">
              <Gauge className="h-8 w-8 text-blue-500" />
              <h3 className="text-lg font-semibold">Soporte 24/7</h3>
            </div>
            <div className="flex flex-col items-center gap-4 text-center">
              <Astroid className="h-8 w-8 text-blue-500" />
              <h3 className="text-lg font-semibold">Productos de Calidad</h3>
            </div>
          </div>
        </div>
      </section>
      {/* 📸 GALLERY */}
      <section className="py-24">
        <div className="container mx-auto px-4">
       <div className="mb-8 text-center">
            <p className='text-3xl font-serif'>
              Tu mascota en <span className='text-blue-500 font-bold '>redes</span>
            </p>
            
          </div>
          

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHlj2EJdtTGJLDSMUVrtVNER5LASaGFMPkEw&s"
              alt="Mascota"
              width={400}
              height={400}
              className="rounded-2xl object-cover"
            />
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_GmHho8IC1v2lL4U1j7QWjIdWgNLD5fBlAQ&s"
              alt="Mascota"
              width={400}
              height={400}
              className="rounded-2xl object-cover"
            />
            <Image
              src="https://i.pinimg.com/736x/1b/6c/c0/1b6cc0b26fa7a4b85664828b2fdb60ff.jpg"
              alt="Mascota"
              width={400}
              height={400}
              className="rounded-2xl object-cover"
            />
            <Image
              src="https://cuapiom.com/src/img/el-gato-vz.jpg"
              alt="Mascota"
              width={400}
              height={400}
              className="rounded-2xl object-cover"
            />
          </div>
        </div>
               <div className="mb-8 text-center">
            <p className='text-3xl font-serif'>
             Prefigo <span className='text-blue-500 font-bold '> #kittens</span>
            </p>
            
          </div>
      </section>

    </div>
  );
}
