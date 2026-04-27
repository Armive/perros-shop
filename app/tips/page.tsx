import { tips } from '@/data/products';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Droplet,
  Heart,
  Sparkles,
  Stethoscope,
  Users,
  Home,
  Cat,
  Dog,
  Lightbulb,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  droplet: Droplet,
  heart: Heart,
  sparkles: Sparkles,
  stethoscope: Stethoscope,
  users: Users,
  home: Home,
};

export default function TipsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="bg-foreground mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
          <Lightbulb className="text-background h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold md:text-4xl">Tips para Mascotas</h1>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
          Consejos utiles para mantener a tu mascota feliz y saludable. Aprende de los expertos y
          brinda el mejor cuidado a tu mejor amigo.
        </p>
      </div>

      {/* Tips Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tips.map((tip) => {
          const IconComponent = iconMap[tip.icon] || Lightbulb;
          const petTypeLabel = {
            perro: 'Perros',
            gato: 'Gatos',
            ambos: 'Todos',
          };

          return (
            <Card key={tip.id} className="group transition-all hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex items-center justify-between">
                  <div className="bg-secondary group-hover:bg-foreground flex h-12 w-12 items-center justify-center rounded-full transition-colors">
                    <IconComponent className="group-hover:text-background h-6 w-6 transition-colors" />
                  </div>
                  <Badge variant="outline" className="gap-1">
                    {tip.petType === 'perro' && <Dog className="h-3 w-3" />}
                    {tip.petType === 'gato' && <Cat className="h-3 w-3" />}
                    {tip.petType === 'ambos' && (
                      <>
                        <Dog className="h-3 w-3" />
                        <Cat className="h-3 w-3" />
                      </>
                    )}
                    {petTypeLabel[tip.petType]}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{tip.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{tip.content}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Info Section */}
      <section className="mt-16">
        <div className="bg-secondary/50 rounded-2xl p-8 md:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold md:text-3xl">Mas consejos utiles</h2>
            <p className="text-muted-foreground mt-4">
              En Kittens nos preocupamos por el bienestar de tu mascota. Aqui hay algunos consejos
              adicionales para mantenerlos saludables.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                    <Dog className="text-background h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Alimentacion para perros</h3>
                    <p className="text-muted-foreground mt-2 text-sm">
                      Divide la comida en 2-3 porciones diarias. Evita alimentos toxicos como
                      chocolate, uvas y cebolla. Siempre manten agua fresca disponible.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                    <Cat className="text-background h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Cuidado para gatos</h3>
                    <p className="text-muted-foreground mt-2 text-sm">
                      Los gatos necesitan estimulacion mental. Proporciona juguetes interactivos y
                      lugares altos donde puedan observar su entorno.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                    <Heart className="text-background h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Salud dental</h3>
                    <p className="text-muted-foreground mt-2 text-sm">
                      Cepilla los dientes de tu mascota regularmente. Los problemas dentales pueden
                      causar enfermedades graves si no se tratan.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                    <Stethoscope className="text-background h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Visitas regulares al vet</h3>
                    <p className="text-muted-foreground mt-2 text-sm">
                      Programa revisiones anuales incluso si tu mascota parece sana. La prevencion
                      es la mejor medicina para una vida larga y feliz.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
