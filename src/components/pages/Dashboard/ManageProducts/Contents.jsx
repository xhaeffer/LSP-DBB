import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import Swal from "sweetalert2";

import CustomHeader from "../../../../components/DataTables/CustomHeader";
import DataTableMain from "../../../../components/DataTables/DataTableMain";
import ActionsMenu from "../../../../components/DataTables/ActionsMenu";
import ModalCore from "../../../../components/Modals/ModalCore";
import InputText from "../../../../components/Modals/InputText";

import { db } from "../../../../firebase/firebase";

const Contents = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [currentItem, setCurrentItem] = useState();

  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");

  const openEditModal = (item) => {
    setCurrentItem({ ...item });
    setEditModal(true);
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const getProducts = async () => {
    try {
      const menuCollection = collection(db, 'menus');
      const menuSnapshot = await getDocs(menuCollection);
      const menuList = menuSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(menuList);
    } catch (error) {
        console.error("Error getting documents: ", error);
    }
  };

  const addProducts = async (e) => {
    e.preventDefault();

    try {
      if (!name || !stock || !category || !price || !description || !picture) {
        Swal.fire({
          title: "Data Tidak Boleh Kosong",
          icon: "warning",
          confirmButtonColor: "#3085d6",
        });
        return;
      }

      await addDoc(collection(db, "menus"), {
        name,
        stock,
        category,
        price,
        description,
        picture,
      });

      Swal.fire({
        title: "Berhasil Menambahkan Menu",
        icon: "success",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate(0);
      });
    } catch (error) {
      Swal.fire({
        title: "Gagal Menambahkan Menu",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
      console.error("Error adding document: ", error);
    }
  };

  const deleteProducts = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Apakah kamu yakin?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#a3a5a6",
        confirmButtonText: "Ya, hapus!",
      });

      if (!result.isConfirmed) return;

      await deleteDoc(doc(db, "menus", id));
      await Swal.fire({
        title: "Berhasil dihapus!",
        icon: "success",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate(0);
      });
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  const updateProducts = async (e) => {
    e.preventDefault();

    try {
      if (!currentItem.name || !currentItem.stock || !currentItem.category || !currentItem.price || !currentItem.description || !currentItem.picture) {
        Swal.fire({
          title: "Data Tidak Boleh Kosong",
          icon: "warning",
          confirmButtonColor: "#3085d6",
        });
        return;
      }

      await updateDoc(doc(db, "menus", currentItem.id), {
        name: currentItem.name,
        stock: currentItem.stock,
        category: currentItem.category,
        price: currentItem.price,
        description: currentItem.description,
        picture: currentItem.picture,
      });

      Swal.fire({
        title: "Berhasil Memperbarui Menu",
        icon: "success",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate(0);
      });
    } catch (error) {
      Swal.fire({
        title: "Gagal Memperbarui Menu",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
      console.error("Error adding document: ", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const columns = [
    { name: "No", selector: (row, index) => index + 1 + ".", sortable: true },
    { 
      name: "Gambar", 
      selector: (row) => row.picture, sortable: true,
      cell: (row) => (
        <img src={row.picture} alt={row.name} className="w-10 h-10 object-cover rounded-sm" />
      )
    },
    { name: "Nama", selector: (row) => row.name, sortable: true },
    { name: "Harga", selector: (row) => row.price, sortable: true },
    { name: "Deskripsi", selector: (row) => row.description, sortable: true },
    { name: "Stok", selector: (row) => row.stock, sortable: true },
    { name: "Kategori", selector: (row) => row.category, sortable: true },
    {
        name: "Actions",
        cell: (row) => (
        <ActionsMenu
            onEdit={() => openEditModal(row)}
            onDelete={() => deleteProducts(row.id)}
        />
        ),
    },
  ];
  return (
    <div>
      <div className="container mx-auto p-4">
        <CustomHeader
          title="Kelola Menu"
          buttonText="+ Tambah Menu"
          onButtonClick={() => setOpenModal(true)}
          overlay={"add-products-modal"}
        />
        <DataTableMain
          columns={columns}
          data={products}
          searchText={searchText}
          onSearch={handleSearch}
        />
      </div>

      <ModalCore
        title={"Tambah Menu"}
        btnTitle={"Save"}
        formSubmit={addProducts}
        openModal={openModal}
        actClose={() => setOpenModal(false)}
      >
        <div className="mt-10 grid grid-cols-10 gap-3">
          <InputText
            name={"name"}
            title={"Nama"}
            type={"text"}
            value={name}
            inputChange={(e) => setName(e.target.value)}
            placeholder={"Siomay"}
          />
          <InputText
            name={"stock"}
            title={"Stok"}
            type={"text"}
            value={stock}
            inputChange={(e) => setStock(e.target.value)}
            placeholder={"15"}
          />
        </div>
        <div className="mt-10 grid grid-cols-10 gap-3">
          <InputText
            name={"category"}
            title={"Kategori"}
            type={"text"}
            value={category}
            inputChange={(e) => setCategory(e.target.value)}
            placeholder={"1"}
          />
          <InputText
            name={"price"}
            title={"Harga"}
            type={"text"}
            value={price}
            inputChange={(e) => setPrice(e.target.value)}
            placeholder={"15000"}
          />
        </div>
        <div className="mt-10 grid grid-cols-10 gap-3">
          <InputText
            name={"description"}
            title={"Deskripsi"}
            type={"text"}
            value={description}
            inputChange={(e) => setDescription(e.target.value)}
            placeholder={"Enak banget"}
          />
          <InputText
            name={"picture"}
            title={"Link Gambar"}
            type={"text"}
            value={picture}
            inputChange={(e) => setPicture(e.target.value)}
            placeholder={"https://www.google.com"}
          />
        </div>
      </ModalCore>

      {editModal && currentItem && (
        <ModalCore
          title={"Perbarui Menu"}
          btnTitle={"Perbarui"}
          formSubmit={updateProducts}
          openModal={editModal}
          actClose={() => setEditModal(false)}
        >
          <div className="mt-10 grid grid-cols-10 gap-3">
            <InputText
              name={"name"}
              title={"Nama"}
              type={"text"}
              value={currentItem.name}
              inputChange={handleChange}
              placeholder={"Siomay"}
            />
            <InputText
              name={"stock"}
              title={"Stok"}
              type={"text"}
              value={currentItem.stock}
              inputChange={handleChange}
              placeholder={"15"}
            />
          </div>
          <div className="mt-10 grid grid-cols-10 gap-3">
            <InputText
              name={"category"}
              title={"Kategori"}
              type={"text"}
              value={currentItem.category}
              inputChange={handleChange}
              placeholder={"1"}
            />
            <InputText
              name={"price"}
              title={"Harga"}
              type={"text"}
              value={currentItem.price}
              inputChange={handleChange}
              placeholder={"15000"}
            />
          </div>
          <div className="mt-10 grid grid-cols-10 gap-3">
            <InputText
              name={"description"}
              title={"Deskripsi"}
              type={"text"}
              value={currentItem.description}
              inputChange={handleChange}
              placeholder={"Enak banget"}
            />
            <InputText
              name={"picture"}
              title={"Link Gambar"}
              type={"text"}
              value={currentItem.picture}
              inputChange={handleChange}
              placeholder={"https://www.google.com"}
            />
          </div>
        </ModalCore>
      )}
    </div>
  )
}

export default Contents
