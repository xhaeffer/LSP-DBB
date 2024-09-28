import { useEffect, useState } from "react";
import { collection, getDocs } from 'firebase/firestore';
import Swal from "sweetalert2";

import CustomHeader from "../../../../components/DataTables/CustomHeader";
import DataTableMain from "../../../../components/DataTables/DataTableMain";

import { db } from "../../../../firebase/firebase";

const Contents = () => {

  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const getProducts = async () => {
    try {
      const collections = collection(db, 'transactions');
      const snapshot = await getDocs(collections);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(data);
    } catch (error) {
        console.error("Error getting documents: ", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Tanggal", selector: (row) => row.orderDate, sortable: true },
    { name: "No Meja", selector: (row) => row.tableNumber, sortable: true },
    { name: "Catatan", selector: (row) => row.note, sortable: true },
    { name: "Metode Pembayaran", selector: (row) => row.paymentMethod, sortable: true },
    { name: "Cardholder", selector: (row) => row.cardholderName, sortable: true },
    { name: "Nomor Kartu", selector: (row) => row.cardNumber, sortable: true },
    { name: "CVV", selector: (row) => row.cvv, sortable: true },
    { name: "Total", selector: (row) => row.totalOrderPrice, sortable: true },
  ];

  const subColumns = [
    { name: "Nama", selector: (row) => row.name, sortable: true },
    { name: "Harga", selector: (row) => row.pricePerItem, sortable: true },
    { name: "Kuantitas", selector: (row) => row.quantity, sortable: true },
    { name: "Subtotal", selector: (row) => row.totalPrice, sortable: true },
  ];

  const ExpandedComponent = ({ data }) => (
    <div className="px-14">
      <DataTableMain
          columns={subColumns}
          data={data.items}
          hideSearch={true}
        />
    </div>
  );

  return (
    <div>
      <div className="container mx-auto p-4">
        <CustomHeader
          title="Kelola Menu"
          hideButton={true}
        />
        <DataTableMain
          columns={columns}
          data={products}
          searchText={searchText}
          onSearch={handleSearch}
          expandableRows
          expandableRowsComponent={ExpandedComponent}
        />
      </div>
    </div>
  )
}

export default Contents
