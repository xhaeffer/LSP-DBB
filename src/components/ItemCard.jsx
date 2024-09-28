"use client";

import { Card } from "flowbite-react";
import Swal from "sweetalert2";

const successToast = () => {  
  Swal.fire({
    toast: true,
    position: 'bottom-start',
    icon: 'success',
    title: 'Makanan berhasil ditambahkan',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    background: '#1f2937',
    color: '#ffffff',
  });
};

const failToast = (reason) => {
  Swal.fire({
    toast: true,
    position: 'bottom-start',
    icon: 'error',
    title: reason,
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    background: '#1f2937',
    color: '#ffffff',
  });
};

export const ItemCard = ({ picture, name, description, price, quantity = 0, stock = 0, onClick }) => {
  return (
    <Card className="" imgSrc={picture} horizontal>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {description}
      </p>
      <div className="flex flex-row justify-between">
        <p className="font-bold text-gray-800 dark:text-gray-300">
          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price)}
        </p>
        <div>
          {stock === 0 ? (
            <span className="text-red-500 font-bold">Stok Kosong</span>
          ) : quantity > 0 ? (
            <div className="flex items-center space-x-2">
              <button 
                type="button"
                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2.5 inline-flex items-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700"
                onClick={() => {
                  const { error } = onClick('decrease');
                  if (error) failToast(error);
                }}
              >
                -
              </button>
              <span className="text-gray-900 dark:text-white font-bold">{quantity}</span>
              <button 
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => {
                  const { error } = onClick('increase');
                  if (error) failToast(error);
                }}
              >
                +
              </button>
            </div>
          ) : (
            <button 
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => {
                const { error } = onClick('add');
                !error ? successToast() : failToast(error);
              }}
            >
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 1v12m6-6H1"/>
              </svg>
              <span className="sr-only">Icon description</span>
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ItemCard;
