import Navbar from "./components/navbar";

export default function DashboardLayout({children}){
  
    return (
      <>
        {/* Layout de dashboard */}
        <Navbar/>
   
        {children}
      </>
    )
  }