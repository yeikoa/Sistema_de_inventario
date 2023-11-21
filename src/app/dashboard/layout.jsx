import Navbar from "./components/navbar";
import Navsidebar from "./components/sidebar";
import '.././globals.css'

import 'react-toastify/dist/ReactToastify.css';

export default function DashboardLayout({ children }) {
  const isSidebarOpen = true;

  return (
    <div className="flex flex-col h-screen bg-gray-200"> {/* Contenedor principal de columna */}
      <Navbar />
      <div className="flex"> {/* Fila para Navbar y Conteido */}
        <Navsidebar isOpen={isSidebarOpen} />
        <div className="flex-1 p-4 overflow-y-auto bg-gray-200">{children}</div> {/* Contenido principal */}
      </div>
      <footer className="mt-auto bg-gray-50 text-gray-600 text-center py-4 border-t border-gray-300">
        <p>Derechos reservados © Eligam</p>
      </footer>
    </div>
  );
}


