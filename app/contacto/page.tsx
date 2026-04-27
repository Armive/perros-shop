'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  MessageCircle,
  Send,
  Check,
} from 'lucide-react';

export default function ContactoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="bg-foreground mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
          <MessageCircle className="text-background h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold md:text-4xl">Contacto</h1>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
          Estamos aqui para ayudarte. Contactanos a traves de cualquiera de nuestros canales o
          envianos un mensaje directo.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Envianos un mensaje</CardTitle>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold">Mensaje enviado</h3>
                <p className="text-muted-foreground mt-2">
                  Gracias por contactarnos. Te responderemos pronto.
                </p>
                <Button variant="outline" className="mt-4" onClick={() => setIsSubmitted(false)}>
                  Enviar otro mensaje
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium">Nombre</label>
                    <Input placeholder="Tu nombre" required />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Email</label>
                    <Input type="email" placeholder="tu@email.com" required />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Asunto</label>
                  <Input placeholder="De que trata tu mensaje?" required />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Mensaje</label>
                  <Textarea placeholder="Escribe tu mensaje aqui..." rows={5} required />
                </div>

                <Button type="submit" className="w-full gap-2" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    'Enviando...'
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Enviar Mensaje
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Contact Info */}
        <div className="space-y-6">
          {/* Info Cards */}
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex items-start gap-4">
                  <div className="bg-secondary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-muted-foreground text-sm">hola@kittens.com</p>
                    <p className="text-muted-foreground text-sm">soporte@kittens.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-secondary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Telefono</h3>
                    <p className="text-muted-foreground text-sm">+1 234 567 890</p>
                    <p className="text-muted-foreground text-sm">+1 234 567 891</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-secondary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Direccion</h3>
                    <p className="text-muted-foreground text-sm">
                      Calle Principal 123
                      <br />
                      Ciudad, Pais 12345
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-secondary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Horario</h3>
                    <p className="text-muted-foreground text-sm">Lun - Vie: 9am - 6pm</p>
                    <p className="text-muted-foreground text-sm">Sab: 10am - 2pm</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          <Card>
            <CardHeader>
              <CardTitle>Siguenos en redes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-sm">
                Mantente al dia con nuestras novedades, promociones y contenido exclusivo sobre el
                cuidado de mascotas.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="lg" className="gap-2" asChild>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-5 w-5" />
                    Instagram
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="gap-2" asChild>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <Facebook className="h-5 w-5" />
                    Facebook
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="gap-2" asChild>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-5 w-5" />
                    Twitter
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Teaser */}
          <Card className="bg-foreground text-background">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold">Preguntas Frecuentes</h3>
              <p className="text-background/80 mt-2 text-sm">
                Visita nuestra seccion de preguntas frecuentes para encontrar respuestas rapidas
                sobre envios, devoluciones y mas.
              </p>
              <Button variant="secondary" className="mt-4">
                Ver FAQ
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
