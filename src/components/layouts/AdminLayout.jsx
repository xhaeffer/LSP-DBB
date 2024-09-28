import { NavbarComponent } from "../Navbar"
import Sidebar from "../Sidebar"
import Footer from "../Footer"

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <NavbarComponent />
      <Sidebar />
      <main>
        <div className="w-full lg:ps-64 mt-12 lg:mt-auto">
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
