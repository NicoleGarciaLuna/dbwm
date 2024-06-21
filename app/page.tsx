import AppLayout from '@/components/AppLayout';

export default function Home() {
  return (
    <AppLayout>
      <div className="p-4 bg-blue-100 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Bienvenido</h1>
        <p>Este es el contenido de la página principal.</p>
      </div>
    </AppLayout>
  );
}
