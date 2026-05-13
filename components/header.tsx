'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCart } from '@/context/cart-context';
import { ShoppingCart } from 'lucide-react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/tienda', label: 'Tienda' },
  { href: '/contacto', label: 'Contacto' }
];

export function Header() {
  const { totalItems } = useCart();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);

  const isShop = pathname.startsWith('/tienda');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isExpanded = !scrolled || hovered;

  return (
    <div
      className={`fixed left-1/2 z-50 -translate-x-1/2 transition-all duration-300 ${isShop ? 'bottom-4' : 'top-4'} `}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`flex items-center rounded-full border border-black/10 bg-white/70 shadow-xl backdrop-blur-xl transition-all duration-300 ${isExpanded ? 'gap-6 px-6 py-2' : 'gap-3 px-4 py-2'} `}
      >
        {/* Logo */}
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Kittens
        </Link>

        {/* Nav */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isExpanded ? 'ml-4 max-w-[400px] opacity-100' : 'max-w-0 opacity-0'
          }`}
        >
          <div className="flex gap-6 text-sm text-black/70">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition ${
                  pathname === link.href ? 'font-medium text-black' : 'hover:text-black'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Cart */}
        <Link href="/carrito" className="relative">
          <ShoppingCart className="h-4 w-4 text-black/80" />

          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-black px-1 text-[10px] text-white">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
}
