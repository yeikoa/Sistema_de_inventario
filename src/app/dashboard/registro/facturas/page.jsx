'use client'
import { useState } from 'react';
import Modal from '../../components/billsComponents/modal';
import ManualRegister from '../../components/billsComponents/manualRegister';
import PdfReader from '../../components/billsComponents/pdfReader';

export default function BillsRegister() {
  
  const [isLectorOpen, setIsLectorOpen] = useState(false);
  const [isIngresoOpen, setIsIngresoOpen] = useState(false);

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
          onClick={() => setIsLectorOpen(true)}
        >
          Lector de Facturas
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setIsIngresoOpen(true)}
        >
          Ingreso Manualmente
        </button>
      </div>

      <Modal isOpen={isLectorOpen} onClose={() => setIsLectorOpen(false)}>
        <h2 className="text-2xl mb-4">Lector de Facturas</h2>
        <PdfReader/>
      </Modal>

      <Modal isOpen={isIngresoOpen} onClose={() => setIsIngresoOpen(false)}>
        <h2 className="text-2xl mb-4">Ingreso Manualmente</h2>
        <ManualRegister/>
      </Modal>
    </div>
  );
};



  

