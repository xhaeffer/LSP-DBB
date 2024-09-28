import { useState, useEffect } from "react";
import { getDoc, doc, addDoc, collection, updateDoc } from 'firebase/firestore';
import { FloatingLabel, Label, Select, Textarea } from "flowbite-react";
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';

import { ItemCard } from '../../ItemCard';
import { db } from '../../../firebase/firebase';
import DashBox from "../../DashBox";
import Receipt from "../../pages/OrderPage/Receipt";

const Content = () => {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("1");
  const [tableNumber, setTableNumber] = useState('');
  const [note, setNote] = useState('');

  const fetchMenuItems = async () => {
    try {
      let cartItems = localStorage.getItem('cartItems');
      if (cartItems) {
        cartItems = JSON.parse(cartItems);
  
        const cartIds = cartItems.map(item => item.id);
        if (cartIds.length > 0) {  
          const menuPromises = cartIds.map(async (id) => {
            const docRef = doc(db, 'menus', id);
            const docSnap = await getDoc(docRef);
  
            if (docSnap.exists()) {
              return { 
                id: docSnap.id, 
                ...docSnap.data(), 
                quantity: cartItems.find(item => item.id === docSnap.id).quantity };
            }
          });
  
          const menuList = (await Promise.all(menuPromises)).filter(item => item !== null);
          setOrder(menuList);
        }
      }
    } catch (error) {
      console.error("Error fetching menu items: ", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalPrice = () => {
    const total = order.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(total);
  };

  const submitButtonHandler = async () => {
    try {
      const updateStockPromises = order.map(async (item) => {
        const itemDocRef = doc(db, 'menus', item.id);
        const newStock = item.stock - item.quantity;
  
        if (newStock >= 0) {
          await updateDoc(itemDocRef, {
            stock: newStock
          });
        } else {
          throw new Error(`Stok untuk ${item.name} tidak cukup!`);
        }
      });
  
      await Promise.all(updateStockPromises);
  
      const transactionData = {
        items: order.map(item => ({
          name: item.name,
          quantity: item.quantity,
          pricePerItem: item.price,
          totalPrice: item.price * item.quantity,
          orderDate: new Date().toISOString()
        })),
        totalOrderPrice: calculateTotalPrice().replace(/[^\d]/g, ''),
        tableNumber,
        note,
        paymentMethod,
        ...(paymentMethod === '2' && {
          cardholderName: document.getElementById('cardholder_name').value,
          cardNumber: document.getElementById('card_number').value,
          cvv: document.getElementById('card_cvv').value
        })
      };
  
      await addDoc(collection(db, "transactions"), transactionData);

      localStorage.removeItem('cartItems');
  
      Swal.fire({
        icon: 'success',
        title: 'Transaksi Berhasil!',
        text: 'Pesanan Anda telah disimpan.',
        confirmButtonText: 'Unduh Struk',
        showCancelButton: true,
        cancelButtonText: 'Tutup',
      }).then((result) => {
        if (result.isConfirmed) {
          const receiptElement = document.getElementById('receipt');
          receiptElement.style.display = 'block';

          html2canvas(receiptElement).then(canvas => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'kwitansi.png';
            link.click();

            receiptElement.style.display = 'none';
          });
        }
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Terjadi kesalahan`,
        confirmButtonText: 'OK'
      });
      console.error("Error dalam proses transaksi: ", error);
    }
  };  

  useEffect(() => {
    fetchMenuItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="text-gray-700 body-font" id="content">
      <div className="container px-5 py-10 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Order
          </h1>
        </div>
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="grid grid-cols-1 px-10 md:grid-cols-1 gap-4">
            {order.map((data) => (
              <div className="flex justify-center lg:justify-end items-end" key={data.id}>
                <ItemCard 
                    picture={data.picture}
                    name={data.name}
                    description={data.description}
                    price={data.price}
                    quantity={data.quantity}
                    stock={data.stock}
                    onClick={() => {}}
                  />
              </div>
            ))}
          </div>
          <div className="flex flex-col px-10 gap-4">
            <DashBox value={"Rincian Harga"}>
              <br />
              <div className="flex justify-between items-center w-full">
                <p className="text-center tracking-wide">Total Pesanan</p>
                <h3 className="text-xl sm:text-2xl font-medium text-color4">{order.length}</h3>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-center tracking-wide">Total Harga</p>
                <h3 className="text-xl sm:text-2xl font-medium text-color4">{calculateTotalPrice()}</h3>
              </div>
            </DashBox>
            <DashBox value={"Pembayaran"}>
              <br />
              <div className="mb-2 block">
                <Label htmlFor="payment" value="Metode Pembayaran" />
              </div>
              <Select 
                id="payment"
                value={paymentMethod}
                onChange={(e) => {setPaymentMethod(e.target.value)}} 
                required
              >
                <option value="1">Tunai</option>
                <option value="2">Kartu Kredit/Debit</option>
              </Select>
              
              {paymentMethod === '2' && (
                <div>
                  <div>
                    <label htmlFor="cardholder_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Pemegang Kartu</label>
                    <input type="url" id="cardholder_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required />
                  </div>
                  <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="card_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nomor Kartu</label>
                      <input type="number" id="card_number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="XXXX-XXXX-XXXX-XXXX" required />
                    </div>
                    <div>
                      <label htmlFor="card_cvv" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CVV</label>
                      <input type="number" id="card_cvv" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="XXX" required />
                    </div>
                  </div>
                </div>
              )}
            </DashBox>
            <DashBox value={"Informasi Pemesanan"}>
              <br />
              <FloatingLabel
                variant="outlined"
                label="Nomor Meja"
                type="number"
                required
                onChange={(e) => setTableNumber(e.target.value)}
              />
              <Textarea 
                placeholder="Tinggalkan Catatan..." 
                required
                rows={4}
                onChange={(e) => setNote(e.target.value)}  
              />
            </DashBox>
            <button 
              className="w-full bg-cyan-700 hover:bg-color3 text-white font-bold py-2 px-4 rounded"
              onClick={submitButtonHandler}
            >
              Pesan Sekarang
            </button>
            <Receipt 
              order={order} 
              tableNumber={tableNumber} 
              note={note} 
              paymentMethod={paymentMethod} 
              totalPrice={calculateTotalPrice()}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Content;
