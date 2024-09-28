const Receipt = ({ order, tableNumber, note, paymentMethod, totalPrice }) => {
  return (
    <div id="receipt" style={{ display: 'none' }}>
      <h2>Kwitansi</h2>
      <p>Nomor Meja: {tableNumber}</p>
      <p>Total Harga: {totalPrice}</p>
      <p>Metode Pembayaran: {paymentMethod === '2' ? 'Kartu Kredit' : 'Tunai'}</p>
      <p>Catatan: {note}</p>
      <ul>
        {order.map(item => (
          <li key={item.id}>
            {item.name} x {item.quantity} = {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price * item.quantity)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Receipt;
