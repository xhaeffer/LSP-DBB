import { NavbarComponent } from "../Navbar"

const Layout = ({ children }) => {
  return (
    <div>
      <NavbarComponent />
      { children }
    </div>
  )
}

export default Layout
