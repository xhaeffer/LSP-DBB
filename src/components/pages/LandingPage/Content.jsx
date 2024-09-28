import { useState, useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore';
import Swal from "sweetalert2";

import MenuFilter from './MenuFilter';
import { ItemCard } from '../../ItemCard';
import { db } from '../../../firebase/firebase';

const Content = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      const menuCollection = collection(db, 'menus');
      const menuSnapshot = await getDocs(menuCollection);
      const menuList = menuSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMenuItems(menuList);
    } catch (error) {
      console.error("Error fetching menu items: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredItems = selectedCategory === 0
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  const getCartQuantity = (itemId) => {
    const currentCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItem = currentCart.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0; 
  };

  const addToCart = (itemId, menuItems) => {
    const currentCart = JSON.parse(localStorage.getItem('cartItems')) || [];
  
    const itemToAdd = menuItems.find(item => item.id === itemId);
    if (!itemToAdd) {
      Swal.fire({
        toast: true,
        position: 'bottom-start',
        icon: 'error',
        title: 'Item tidak ditemukan',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        background: '#1f2937',
        color: '#ffffff',
      });
      return {error: 'Item tidak ditemukan'};
    }
  
    const existingItem = currentCart.find(item => item.id === itemId);
    if (itemToAdd.stock <= existingItem?.quantity) {
      return {error: 'Stok tidak tersedia'};
    }
  
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentCart.push({ id: itemToAdd.id, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(currentCart));
    return true
  };
  
  return (
    <section className="text-gray-700 body-font px-48" id="content">
      <div className="container px-5 py-10 mx-auto">
        <div className="flex flex-wrap w-full mb-8 flex-col items-center text-center">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">PILIHAN MENU</h1>
        </div>
        <MenuFilter setSelectedCategory={setSelectedCategory} />
        <div className="grid grid-cols-1 px-10 lg:grid-cols-2 gap-4">
          {filteredItems.map((data) => (
            <div className="flex justify-center items-center" key={data.id}>
              <ItemCard 
                picture={data.picture}
                name={data.name}
                description={data.description}
                price={data.price}
                stock={data.stock}
                quantity={getCartQuantity(data.id)}
                onClick={() => addToCart(data.id, menuItems)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Content;
