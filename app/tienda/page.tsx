import { Suspense } from 'react';
import TiendaClient from './client';

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <TiendaClient />
    </Suspense>
  );
}
