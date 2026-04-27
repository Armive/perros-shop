'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/product-card';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Search, SlidersHorizontal, X, Cat, Dog, Grid3X3, LayoutList } from 'lucide-react';

const categories = [
  { value: 'all', label: 'Todas' },
  { value: 'comida', label: 'Comida' },
  { value: 'juguetes', label: 'Juguetes' },
  { value: 'accesorios', label: 'Accesorios' },
  { value: 'higiene', label: 'Higiene' },
];

const petTypes = [
  { value: 'all', label: 'Todas las mascotas' },
  { value: 'perro', label: 'Perros' },
  { value: 'gato', label: 'Gatos' },
];

function StoreContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('categoria') || 'all';
  const initialPetType = searchParams.get('mascota') || 'all';

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPetType, setSelectedPetType] = useState(initialPetType);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'price-asc' | 'price-desc'>('name');

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase()) ||
        product.brand.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

      const matchesPetType =
        selectedPetType === 'all' ||
        product.petType === selectedPetType ||
        product.petType === 'ambos';

      return matchesSearch && matchesCategory && matchesPetType;
    });

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
      default:
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [search, selectedCategory, selectedPetType, sortBy]);

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedPetType('all');
    setSortBy('name');
  };

  const hasActiveFilters = search || selectedCategory !== 'all' || selectedPetType !== 'all';

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Pet Type */}
      <div>
        <h3 className="mb-3 font-semibold">Tipo de Mascota</h3>
        <div className="flex flex-wrap gap-2">
          {petTypes.map((type) => (
            <Button
              key={type.value}
              variant={selectedPetType === type.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPetType(type.value)}
              className="gap-2"
            >
              {type.value === 'perro' && <Dog className="h-4 w-4" />}
              {type.value === 'gato' && <Cat className="h-4 w-4" />}
              {type.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="mb-3 font-semibold">Categorias</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.value)}
            >
              {category.label}
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
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
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
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
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
            <Badge variant="secondary" className="gap-1">
              Busqueda: {search}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setSearch('')} />
            </Badge>
          )}
          {selectedCategory !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              {categories.find((c) => c.value === selectedCategory)?.label}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory('all')} />
            </Badge>
          )}
          {selectedPetType !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              {petTypes.find((p) => p.value === selectedPetType)?.label}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedPetType('all')} />
            </Badge>
          )}
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
            {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado
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
              {filteredProducts.map((product) => (
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
  );
}

export default function TiendaPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Cargando...</div>}>
      <StoreContent />
    </Suspense>
  );
}
