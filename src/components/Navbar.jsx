"use client";

import { Button, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

import Logo from "../assets/logo.png";

export const NavbarComponent = () => {
  return (
    <div className="px-10">
      <Navbar fluid rounded>
        <Navbar.Brand href="/">
          <img src= { Logo } className="mr-3 h-6 sm:h-9" alt="Dapur Bunda Bahagia Logo" />
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Link to= "/dashboard/login" ><Button>Admin Dashboard</Button></Link>
          {/* <Navbar.Toggle /> */}
        </div>
      </Navbar>
    </div>
  );
}
