import { useEffect, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import { Link, useLocation } from "react-router-dom";
import { getData, postData } from "../Services/apiCalls";

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
  const [productData, setProductData] = useState({});
  const [code, setCode] = useState("");
  const [weight, setWeight] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [name, setName] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [pay, setPay] = useState("");
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("incoming-stock" || location.pathname.split("/")[0]);
  const { userData } = useAppContext();
  const [averagePrice, setAveragePrice] = useState("");
  const [totalStock, setTotalStock] = useState("");

  useEffect(() => {
    setCurrentPage(location.pathname.split("/")[1]);
  }, [location, currentPage]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getData("warehous", localStorage.getItem("token"));
      if (response) {
        let temp = response.data.map((item) => {
          return { value: item.product._id, label: `${item.product.type} - ${item.product_code}`, weight: item.weight, size: item.size, avg_price: item.product.avg_price, stock: item.product.wieght };
        });
        setProductsList(temp);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedProduct !== "") {
      setCode(productsList.find((item) => item.value === selectedProduct).label.split(" - ")[1]);
      setWeight(productsList.find((item) => item.value === selectedProduct).weight);
      setSize(productsList.find((item) => item.value === selectedProduct).size);
    }
  }, [selectedProduct]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      const response = await getData("clints", localStorage.getItem("token"));
      if (response) {
        let temp = response.data.map((item) => {
          return { value: item._id, label: item.clint_name };
        });
        setSuppliers(temp);
      }
    };
    fetchSuppliers();
  }, []);

  useEffect(() => {
    if (weight && price) {
      setTotalPrice(weight * price);
    } else {
      setTotalPrice("");
    }
  }, [weight, price]);

  const handleAdd = async () => {
    if (!selectedProduct || !code || !weight || !size || !price || !selectedSupplier || !totalPrice || !pay) {
      toast.error("برجاء ملئ جميع الحقول");
      return;
    }
    toast.info("جاري اضافة البيانات");
    const response = await postData("sells", { user: userData.id, clint: selectedSupplier, o_wieght: weight, product: selectedProduct, size_o: size, product_code: code, priceForKilo: price, price_allQuantity: totalPrice, pay_now: pay }, localStorage.getItem("token"));
    if (response.data){
      toast.success("تمت الاضافة بنجاح");
      setCode("");
      setWeight("");
      setSize("");
      setPrice("");
      setTotalPrice("");
      setName("");
      setPay("");
    }
  };

  return (
    <section className="grow pb-6 pt-[70px] px-4 minHeight">
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
        <Select
          onChange={(e) => {
            setSelectedProduct(e.value);
            setAveragePrice(e.avg_price);
            setTotalStock(e.stock);
          }}
          className="w-[250px]"
          styles={customStyles}
          options={productsList}
          placeholder="اسم المنتج"
        />
      </div>
      <div className="flex flex-col items-center sm:flex-row justify-center gap-6 sm:gap-8 xl:gap-16 mb-6 lg:mb-10">
        <input value={weight} onChange={(e) => setWeight(e.target.value)} className="text-right outline-none py-2 px-1 rounded-xl w-[90%] sm:w-[40%] xl:w-[30%] 2xl:w-[25%]" type="number" placeholder="وزن" />
        <input value={code} readOnly className="text-right outline-none py-2 px-1 rounded-xl w-[90%] sm:w-[40%] xl:w-[30%] 2xl:w-[25%]" type="number" placeholder="كود" />
      </div>
      <div className="flex flex-col items-center sm:flex-row justify-center gap-6 sm:gap-8 xl:gap-16 mb-6 lg:mb-10">
        <input value={price} onChange={(e) => setPrice(e.target.value)} className="text-right outline-none py-2 px-1 rounded-xl w-[90%] sm:w-[40%] xl:w-[30%] 2xl:w-[25%]" type="number" placeholder="السعر ك" />
        <input value={size} readOnly className="text-right outline-none py-2 px-1 rounded-xl w-[90%] sm:w-[40%] xl:w-[30%] 2xl:w-[25%]" type="number" placeholder="المقاس" />
      </div>
      <div className="flex flex-col items-center sm:flex-row justify-center gap-6 sm:gap-8 xl:gap-16 mb-6 lg:mb-10">
        <input value={totalPrice} readOnly className="text-right outline-none py-2 px-1 rounded-xl w-[90%] sm:w-[40%] xl:w-[30%] 2xl:w-[25%]" type="number" placeholder="السعر الاجمالي" />
        {/* <input value={name} onChange={(e) => setName(e.target.value)} className="text-right outline-none py-2 px-1 rounded-xl w-[90%] sm:w-[40%] xl:w-[30%] 2xl:w-[25%]" type="text" placeholder="اسم المورد" /> */}
        <Select onChange={(e) => setSelectedSupplier(e.value)} className="w-[90%] sm:w-[40%] xl:w-[30%] 2xl:w-[25%]" styles={customStyles2} options={suppliers} placeholder="اسم العميل " />
      </div>
      <div className="flex justify-center mb-6 lg:mb-10">
        <input value={pay} onChange={(e) => setPay(e.target.value)} className="text-right outline-none py-2 px-1 rounded-xl w-[90%] sm:w-[40%] xl:w-[30%] 2xl:w-[25%]" type="text" placeholder="تم دفع" />
      </div>
      <div className="flex flex-col justify-center items-center mb-6 lg:mb-10">
        <p dir="rtl" className=" text-[#8b8989] text-xl mb-4">
          متوسط السعر: <span className="text-black">{averagePrice}</span>
        </p>
        <p dir="rtl" className=" text-[#8b8989] text-xl">
          اجمالي المخزون: <span className="text-black">{totalStock}</span>
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
