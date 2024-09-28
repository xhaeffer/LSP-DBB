"use client";

import { Button } from "flowbite-react";


const MenuFilter = ({ setSelectedCategory }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-4 lg:grid-rows-1 mb-20 gap-4 lg:gap-10 lg:px-24">
      <Button color="gray" className="border-black" onClick={() => setSelectedCategory(0)}>
        Semua
      </Button>
      <Button color="gray" className="border-black" onClick={() => setSelectedCategory(1)}>
        Makanan Pembuka
      </Button>
      <Button color="gray" className="border-black" onClick={() => setSelectedCategory(2)}>
        Makanan Utama
      </Button>
      <Button color="gray" className="border-black" onClick={() => setSelectedCategory(3)}>
        Minuman
      </Button>
    </div>
  );
};

export default MenuFilter
