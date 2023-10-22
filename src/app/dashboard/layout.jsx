import Navbar from "./components/navbar";
import Navsidebar from "./components/sidebar";
import '.././globals.css'
import SessionAuthProvider from "@/context/sessionAuthProvider";


export default function DashboardLayout({ children }) {
  const isSidebarOpen = true;

  return (
    <div className="flex flex-col h-screen"> {/* Contenedor principal de columna */}
      <Navbar />
      <div className="flex"> {/* Fila para Navbar y Conteido */}
        <Navsidebar isOpen={isSidebarOpen} />
        <div className="flex-1 p-4 overflow-y-auto">{children}</div> {/* Contenido principal */}
      </div>
    </div>
  );
}


