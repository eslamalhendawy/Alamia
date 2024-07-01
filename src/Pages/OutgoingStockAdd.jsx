import { useEffect, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import { Link, useLocation } from "react-router-dom";
import { getData } from "../Services/apiCalls";

import Select from "react-select";

import StockNavigation from "../Components/StockNavigation";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#bcbaba",
    outline: "none",
    textAlign: "right",
    color: "#fff",
    margin: "0 auto",
  }),
  option: (provided) => ({
    ...provided,
    backgroundColor: "#fff",
    textAlign: "right",
    color: "black",
  }),
};

const customStyles2 = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#fff",
    padding: "4px 8px",
    borderRadius: "12px",
    outline: "none",
    textAlign: "right",
    color: "#fff",
    margin: "0 auto",
  }),
  option: (provided) => ({
    ...provided,
    backgroundColor: "#fff",
    textAlign: "right",
    color: "black",
  }),
};

const OutgoingStockAdd = () => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [productsList, setProductsList] = useState([]);
  const [code, setCode] = useState("");
  const [weight, setWeight] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [name, setName] = useState("");
  // const [suppliers, setSuppliers] = useState([]);
  // const [selectedSupplier, setSelectedSupplier] = useState("");
  const [pay, setPay] = useState("");
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("incoming-stock" || location.pathname.split("/")[0]);
  const { userData } = useAppContext();

  useEffect(() => {
    setCurrentPage(location.pathname.split("/")[1]);
  }, [location, currentPage]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getData("products", localStorage.getItem("token"));
      if (response) {
        let temp = response.data.map((item) => {
          return { value: item._id, label: item.type };
        });
        setProductsList(temp);
      }
    };
    fetchProducts();
  }, []);

  // useEffect(() => {
  //   const fetchSuppliers = async () => {
  //     const response = await getData("Supplayrs", localStorage.getItem("token"));
  //     if (response) {
  //       let temp = response.data.map((item) => {
  //         return { value: item._id, label: item.supplayr_name };
  //       });
  //       setSuppliers(temp);
  //     }
  //   };
  //   fetchSuppliers();
  // }, []);

  const handleAdd = () => {
    if (!selectedProduct || !code || !weight || !size || !price || !name || !totalPrice || !pay) {
      toast.error("برجاء ملئ جميع الحقول");
      return;
    }
    toast.success("تمت الاضافة بنجاح");
  };

  return (
    <section className="grow py-6 px-4 minHeight">
      <StockNavigation />
      <div className="flex justify-center gap-8 mb-6">
        <Link to="/outgoing-stock/add" className={`text-lg font-medium text-darkGreen hover:text-white duration-200`}>
          اضافة
        </Link>
        <Link to="/outgoing-stock/report" className={`text-lg font-medium text-darkGreen hover:text-white duration-200`}>
          تقرير
        </Link>
      </div>
      <div className="flex justify-center mb-8">
        <Select onChange={(e) => setSelectedProduct(e.value)} className="w-[250px]" styles={customStyles} options={productsList} placeholder="اسم المنتج" />
      </div>
      <div className="flex flex-col items-center sm:flex-row justify-center gap-6 sm:gap-8 xl:gap-16 mb-6 lg:mb-10">
        <input onChange={(e) => setWeight(e.target.value)} className="text-right outline-none py-2 px-1 rounded-xl w-[90%] sm:w-[40%] xl:w-[30%] 2xl:w-[25%]" type="text" placeholder="وزن" />
        <input onChange={(e) => setCode(e.target.value)} className="text-right outline-none py-2 px-1 rounded-xl w-[90%] sm:w-[40%] xl:w-[30%] 2xl:w-[25%]" type="text" placeholder="كود" />
      </div>
      <div className="flex flex-col items-center sm:flex-row justify-center gap-6 sm:gap-8 xl:gap-16 mb-6 lg:mb-10">
        <input onChange={(e) => setPrice(e.target.value)} className="text-right outline-none py-2 px-1 rounded-xl w-[90%] sm:w-[40%] xl:w-[30%] 2xl:w-[25%]" type="text" placeholder="السعر ك" />
        <input onChange={(e) => setSize(e.target.value)} className="text-right outline-none py-2 px-1 rounded-xl w-[90%] sm:w-[40%] xl:w-[30%] 2xl:w-[25%]" type="text" placeholder="المقاس" />
      </div>
      <div className="flex flex-col items-center sm:flex-row justify-center gap-6 sm:gap-8 xl:gap-16 mb-6 lg:mb-10">
        <input onChange={(e) => setTotalPrice(e.target.value)} className="text-right outline-none py-2 px-1 rounded-xl w-[90%] sm:w-[40%] xl:w-[30%] 2xl:w-[25%]" type="text" placeholder="السعر الاجمالي" />
        <input onChange={(e) => setName(e.target.value)} className="text-right outline-none py-2 px-1 rounded-xl w-[90%] sm:w-[40%] xl:w-[30%] 2xl:w-[25%]" type="text" placeholder="اسم المورد" />
        {/* <Select onChange={(e) => setSelectedSupplier(e.value)} className="w-[90%] sm:w-[40%] xl:w-[30%] 2xl:w-[25%]" styles={customStyles2} options={suppliers} placeholder="اسم المورد" /> */}
      </div>
      <div className="flex justify-center mb-6 lg:mb-10">
        <input onChange={(e) => setPay(e.target.value)} className="text-right outline-none py-2 px-1 rounded-xl w-[90%] sm:w-[40%] xl:w-[30%] 2xl:w-[25%]" type="text" placeholder="تم دفع" />
        {/* <button className=" bg-white text-lg text-[#8b8989] py-2 w-[40%] 2xl:w-[20%] rounded-xl ">تم دفع</button> */}
      </div>
      <div className="flex flex-col justify-center items-center mb-6 lg:mb-10">
        <p className=" text-[#8b8989] text-xl mb-4">
          متوسط السعر: <span className="text-black">420</span>
        </p>
        <p className=" text-[#8b8989] text-xl">
          اجمالي المخزون: <span className="text-black">420</span>
        </p>
      </div>
      <div className="flex justify-center">
        <button onClick={handleAdd} className="flex flex-row-reverse items-center justify-center gap-2 bg-navyColor hover:bg-[#234863] duration-200 text-white text-xl py-3 px-8 rounded-lg">
          اضافة <i className="fa-solid fa-plus"></i>
        </button>
      </div>
    </section>
  );
};

export default OutgoingStockAdd;
