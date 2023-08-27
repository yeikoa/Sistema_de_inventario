import Navbar from "./components/navbar";
import '.././globals.css'
export default function DashboardLayout({children}){
  
    return (
      <>
        {/* Layout de dashboard */}
        <Navbar/>
   
        {children}
      </>
    )
  }