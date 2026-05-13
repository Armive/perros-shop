'use client';
import ProductCard from '@/components/product-card';
import { useEffect, useState, useMemo, Suspense } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Search, SlidersHorizontal, X, Grid3X3, LayoutList } from 'lucide-react';
export default function TiendaPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialCategory = searchParams.get('categoria')?.split(',') || [];
  const initialSearch = searchParams.get('search') || '';
  const initialSortBy = (searchParams.get('sort') || 'name') as 'name' | 'price-asc' | 'price-desc';

  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/getProducts');
      const data = await response.json();
      setProducts(data.products);
    };
    fetchProducts();
  }, []);
  const [collections, setCollections] = useState<Collection[]>([]);
  useEffect(() => {
    const fetchCollections = async () => {
      const response = await fetch('/api/getCollections');
      const data = await response.json();
      setCollections(data.collections);
    };
    fetchCollections();
  }, []);

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string[]>(initialCategory);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'price-asc' | 'price-desc'>(initialSortBy);

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory.length > 0) {
      params.set('categoria', selectedCategory.join(','));
    } else {
      params.delete('categoria');
    }

    if (search) {
      params.set('search', search);
    } else {
      params.delete('search');
    }
    if (sortBy !== 'name') {
      params.set('sort', sortBy);
    } else {
      params.delete('sort');
    }
    if (viewMode !== 'grid') {
      params.set('view', viewMode);
    } else {
      params.delete('view');
    }

    window.history.replaceState(null, '', `${pathname}?${params.toString()}`);
  }, [selectedCategory, search, sortBy, viewMode]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const title = product?.title || '';
      const matchesSearch = title.toLowerCase().includes((search || '').toLowerCase());
      const matchesCategory =
        selectedCategory.length === 0 ||
        product?.collections?.edges?.some((edge) => selectedCategory.includes(edge?.node?.handle));

      return matchesSearch && matchesCategory;
    });

    switch (sortBy) {
      case 'price-asc':
        result.sort(
          (a, b) =>
            Number(a.selectedOrFirstAvailableVariant.price.amount) -
            Number(b.selectedOrFirstAvailableVariant.price.amount)
        );
        break;
      case 'price-desc':
        result.sort(
          (a, b) =>
            Number(b.selectedOrFirstAvailableVariant.price.amount) -
            Number(a.selectedOrFirstAvailableVariant.price.amount)
        );
        break;
      case 'name':
      default:
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return result;
  }, [products, search, selectedCategory, sortBy]);

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory([]);
    setSortBy('name');
  };

  const hasActiveFilters = search || selectedCategory.length > 0;
  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="mb-3 font-semibold">Categorias</h3>
        <div className="flex flex-wrap gap-2">
          {collections.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory.some((e) => e == category.handle) ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setSelectedCategory((prev) => {
                  if (prev.includes(category.handle)) {
                    return prev.filter((c) => c !== category.handle);
                  }

                  return [...prev, category.handle];
                });
              }}
            >
              {category.title}
              {selectedCategory.some((e) => e == category.handle) && <X className="ml-1 h-3 w-3" />}
            </Button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="mb-3 font-semibold">Ordenar por</h3>
        <div className="flex flex-col gap-2">
          <Button
            variant={sortBy === 'name' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('name')}
            className="justify-start"
          >
            Nombre (A-Z)
          </Button>
          <Button
            variant={sortBy === 'price-asc' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('price-asc')}
            className="justify-start"
          >
            Precio: Menor a Mayor
          </Button>
          <Button
            variant={sortBy === 'price-desc' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('price-desc')}
            className="justify-start"
          >
            Precio: Mayor a Menor
          </Button>
        </div>
      </div>

      {hasActiveFilters && (
        <Button variant="outline" onClick={clearFilters} className="w-full gap-2">
          <X className="h-4 w-4" />
          Limpiar filtros
        </Button>
      )}
    </div>
  );

  return (
    
    <div>
      <section className="relative overflow-hidden bg-white text-black">
        {/* Glow effects */}
        <div className="absolute -top-40 -left-40 h-125 w-125 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute top-0 right-0 h-100 w-100 rounded-full bg-blue-400/20 blur-3xl" />

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="flex flex-col items-center gap-14">
            {/* Imagen grande horizontal */}
            <div className="relative w-full max-w-7xl">
              {/* Glow detrás */}
              <div className="absolute inset-0 scale-105 rounded-[40px] bg-linear-to-r from-violet-500/20 to-blue-500/20 blur-2xl" />

              {/* Imagen */}
              <div className="relative h-75 overflow-hidden rounded-[40px] border border-white/20 shadow-2xl md:h-125">
                <Image
                  src="https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_1920,h_840/https://petplan.es/wp-content/uploads/2021/01/West-Highland-White-Terrier.jpg"
                  alt="Mascota"
                  fill
                  className="object-cover"
                  loading="eager"
                />
                {/* Overlay oscuro */}
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent" />
              </div>
            </div>

            {/* Texto bonito */}
            <div className="max-w-4xl text-center">
              <h1 className="text-4xl leading-tight font-black md:text-7xl">
                Compra todo para tus <span className="text-blue-500">amigos peludos</span>
              </h1>
            </div>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold md:text-4xl">Tienda</h1>
          <p className="text-muted-foreground mt-2">Encuentra todo lo que tu mascota necesita</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 md:max-w-md">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              type="search"
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="border-border hidden items-center gap-1 rounded-lg border p-1 md:flex">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <LayoutList className="h-4 w-4" />
              </Button>
            </div>

            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2 md:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtros
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="ml-1">
                      !
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                aria-describedby="Meaw meaw meaw kittens meaw meaw meaw meaw meaw kittens"
                className="p-0"
              >
                <SheetHeader>
                  <SheetTitle>Filtros</SheetTitle>
                </SheetHeader>
                <div className="p-4 pt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-muted-foreground text-sm">Filtros activos:</span>
            {search && (
              <Badge variant="secondary" className="gap-1" onClick={() => setSearch('')}>
                Busqueda: {search}
                <X className="h-3 w-3 cursor-pointer" />
              </Badge>
            )}
            {selectedCategory.length > 0 &&
              selectedCategory.map((category, i) => (
                <Badge
                  key={category || i}
                  variant="secondary"
                  className="gap-1"
                  onClick={() => setSelectedCategory((prev) => prev.filter((c) => c !== category))}
                >
                  {collections.find((col) => col.handle === category)?.title || category}
                  <X className="h-3 w-3 cursor-pointer" />
                </Badge>
              ))}
          </div>
        )}

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden w-64 shrink-0 md:block">
            <Card className="sticky top-24 p-6">
              <FilterContent />
            </Card>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Count */}
            <p className="text-muted-foreground mb-4 text-sm">
              {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}{' '}
              encontrado
              {filteredProducts.length !== 1 ? 's' : ''}
            </p>

            {filteredProducts.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
                    : 'flex flex-col gap-4'
                }
              >
                {filteredProducts.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="border-border flex flex-col items-center justify-center rounded-lg border border-dashed py-16">
                <Search className="text-muted-foreground mb-4 h-12 w-12" />
                <h3 className="text-lg font-semibold">No se encontraron productos</h3>
                <p className="text-muted-foreground mt-2 text-center">
                  Intenta con otros filtros o terminos de busqueda
                </p>
                <Button variant="outline" onClick={clearFilters} className="mt-4">
                  Limpiar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
