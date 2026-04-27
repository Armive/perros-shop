import Link from 'next/link';
import { Cat, Dog, Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  return (
    <footer className="border-border bg-secondary/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Cat className="h-5 w-5" />
                <Dog className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">Kittens</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Tu tienda favorita para consentir a tus mascotas. Productos de calidad para perros y
              gatos.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" asChild>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Enlaces Rapidos</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-muted-foreground hover:text-foreground text-sm">
                Inicio
              </Link>
              <Link href="/tienda" className="text-muted-foreground hover:text-foreground text-sm">
                Tienda
              </Link>
              <Link href="/tips" className="text-muted-foreground hover:text-foreground text-sm">
                Tips para Mascotas
              </Link>
              <Link
                href="/contacto"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Contacto
              </Link>
            </nav>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold">Categorias</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/tienda?categoria=comida"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Comida
              </Link>
              <Link
                href="/tienda?categoria=juguetes"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Juguetes
              </Link>
              <Link
                href="/tienda?categoria=accesorios"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Accesorios
              </Link>
              <Link
                href="/tienda?categoria=higiene"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Higiene
              </Link>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold">Newsletter</h3>
            <p className="text-muted-foreground text-sm">
              Suscribete para recibir ofertas exclusivas y novedades.
            </p>
            <form className="flex gap-2">
              <Input type="email" placeholder="Tu email" className="flex-1" />
              <Button type="submit">Enviar</Button>
            </form>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-border text-muted-foreground mt-8 flex flex-wrap items-center justify-center gap-6 border-t pt-8 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Calle Principal 123, Ciudad</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>+1 234 567 890</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>hola@kittens.com</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-muted-foreground mt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Kittens. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
