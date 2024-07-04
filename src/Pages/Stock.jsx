import { useEffect, useState } from "react";
import { getData } from "../Services/apiCalls";

import Select from "react-select";

import Loading from "../Components/Loading";
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

const Stock = () => {
  const [products, setProducts] = useState([{ value: "", label: "" }]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [size, setSize] = useState("");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getData("products", localStorage.getItem("token"));
      if (response) {
        let temp = response.data.map((item) => {
          return { value: item._id, label: item.type };
        });
        setProducts(prev => [
          ...prev,
          ...temp
        ])
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    const response = await getData(`warehous?${selectedProduct != "" ? `product=${selectedProduct}` : ""}${size != "" ? `&size=${size}` : ""}`, localStorage.getItem("token"));
    console.log(response.data);
    if (response) {
      setList(response.data);
      setLoading(false);
      setHidden(false);
    }
  };

  return (
    <section className="grow pb-6 pt-[70px] px-4 minHeight">
      <StockNavigation />
      <div className="flex flex-col-reverse md:flex-row items-center gap-4 justify-center mb-16">
        <button onClick={handleSearch} className="bg-navyColor hover:bg-[#234863] duration-200 text-white text-xl size-[40px] flex justify-center items-center rounded-lg">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <input onChange={(e) => setSize(e.target.value)} type="text" className="w-[250px] bg-[#bcbaba] p-2 outline-none text-right rounded" placeholder="المقاس" />
        <Select onChange={(e) => setSelectedProduct(e.value)} className="w-[250px]" styles={customStyles} options={products} placeholder="اسم المنتج" />
      </div>
      {loading && <Loading />}
      {!loading && !hidden && list.length === 0 && <p className="text-center mt-16 text-2xl font-semibold">لا يوجد بيانات</p>}
      {!loading && list.length > 0 && (
        <div className="xl:w-[50%] xl:mx-auto">
          {list.map((item, index) => (
            <div key={index} className="mb-6 lg:mb-10 bg-white p-4 rounded-xl font-medium">
              <div dir="rtl" className="flex flex-col sm:flex-row gap-3 items-center sm:justify-start mb-3 ">
                <p className="text-right text-lg">النوع: {item.product?.type}</p>
                <p className="text-right text-lg">الوزن: {item.weight}</p>
                <p className="text-right text-lg">المقاس: {item.size}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 items-center sm:justify-end mb-3">
                <p className="text-right text-lg">التاريخ: {item.createdAt.split("T")[0]}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Stock;
