import AppLayout from '@/components/AppLayout';

export default function Home() {
  return (
    <AppLayout>
      <div className="p-6 bg-blue-100 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-blue-800">Bienvenido</h1>
        <p className="text-lg text-gray-700">Este es el contenido de la página principal.</p>
        <p className="mt-4 text-gray-600">Aquí puedes agregar más información o componentes según sea necesario.</p>
      </div>
    </AppLayout>
  );
}
