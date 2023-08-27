import React from 'react';

export default function ProductsMovements() {
  const productMovements = [
    {
      fecha: '2023-08-27',
      hora: '09:30 AM',
      codigo: 'P123',
      nombre: 'Producto A',
      cantidad: 10,
      tipoMovimiento: 'Entrada',
    },
    {
      fecha: '2023-08-27',
      hora: '02:15 PM',
      codigo: 'P124',
      nombre: 'Producto B',
      cantidad: 5,
      tipoMovimiento: 'Salida',
    },
    // Agregar más movimientos de productos aquí
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Movimientos de productos</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold text-gray-600">Fecha</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold text-gray-600">Hora</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold text-gray-600">Código</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold text-gray-600">Nombre</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold text-gray-600">Cantidad</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold text-gray-600">Entrada/Salida</th>
            </tr>
          </thead>
          <tbody>
            {productMovements.map((movement, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-300 text-sm">
                  {movement.fecha}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 text-sm">
                  {movement.hora}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 text-sm ">
                  {movement.codigo}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 text-sm">
                  {movement.nombre}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 text-sm">
                  {movement.cantidad}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 text-sm">
                  {movement.tipoMovimiento === 'Entrada' ? (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {movement.tipoMovimiento}
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full">
                      {movement.tipoMovimiento}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
