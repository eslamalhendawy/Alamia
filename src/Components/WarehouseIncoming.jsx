import { useState } from "react";

import Select from "react-select";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const tempList = [
  {
    id: 1,
    supplier: "المتحدة",
    type: "فلوت فاخر 112",
    weight: "500ك",
    size: "50",
    employee: "ادهم عباس",
    date: "12/12/2021",
  },
  {
    id: 2,
    supplier: "2المتحدة",
    type: "فلوت فاخر 112",
    weight: "500ك",
    size: "50",
    employee: "ادهم عباس",
    date: "12/12/2021",
  },
  {
    id: 3,
    supplier: "3المتحدة",
    type: "فلوت فاخر 112",
    weight: "500ك",
    size: "50",
    employee: "ادهم عباس",
    date: "12/12/2021",
  },
];

const options = [
  { value: "placeholder 1", label: "Placeholder 1" },
  { value: "placeholder 2", label: "Placeholder 2" },
];

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
    color: "black",
  }),
};

const WarehouseIncoming = () => {
  const [selected, setSelected] = useState("add");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [code, setCode] = useState("");
  const [weight, setWeight] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [list, setList] = useState(tempList);
  const [product, setProduct] = useState("");

  const handleAdd = () => {
    if (!selectedProduct || !code || !weight || !size || !price || !name || !totalPrice) {
      toast.error("برجاء ملئ جميع الحقول");
      return;
    }
    toast.success("تمت الاضافة بنجاح");
  };

  const viewProduct = (item) => () => {
    setSelected("view");
    setProduct(item);
  };

  return (
    <section>
      <div className="flex justify-center gap-8 mb-6">
        <button onClick={() => setSelected("add")} className={`text-lg font-medium ${selected === "add" ? "text-white" : "text-darkGreen"}`}>
          اضافة
        </button>
        <button onClick={() => setSelected("report")} className={`text-lg font-medium ${selected === "report" || selected === "view" ? "text-white" : "text-darkGreen"}`}>
          تقرير
        </button>
      </div>
      {selected === "add" && (
        <>
          <div className="flex justify-center mb-8">
            <Select onChange={(e) => setSelectedProduct(e.value)} className="w-[250px]" styles={customStyles} options={options} placeholder="اسم المنتج" />
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
          </div>
          <div className="flex justify-center mb-6 lg:mb-10">
            <button className=" bg-white text-lg text-[#8b8989] py-2 w-[40%] 2xl:w-[20%] rounded-xl ">تم دفع</button>
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
            <button onClick={handleAdd} className="flex flex-row-reverse items-center justify-center gap-2 bg-navyColor text-white text-xl py-3 px-8 rounded-lg">
              اضافة <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </>
      )}
      {selected === "report" && (
        <div className="xl:w-[70%] xl:mx-auto">
          {list.map((item, index) => (
            <div key={index} className="mb-6 lg:mb-10 bg-white p-4 rounded-xl">
              <div className="flex flex-col sm:flex-row gap-3 items-center sm:justify-end mb-3">
                <p className="text-right text-lg">المورد: {item.supplier}</p>
                <p className="text-right text-lg">النوع: {item.type}</p>
                <p className="text-right text-lg">الوزن: {item.weight}</p>
                <p className="text-right text-lg">المقاس: {item.size}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 items-center sm:justify-end mb-3">
                <p className="text-right text-lg">الموظف: {item.employee}</p>
                <p className="text-right text-lg">التاريخ: {item.date}</p>
              </div>
              <div className="flex justify-center sm:justify-end">
                <button onClick={viewProduct(item)} className="text-[#01D1ED] font-semibold text-lg">
                  عرض
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {selected === "view" && (
        <div className="bg-white rounded-xl p-4 xl:w-[70%] xl:mx-auto">
          <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 mb-4">
            <p className="text-right text-lg md:basis-1/4">الموظف: {product.employee}</p>
            <p className="text-right text-lg md:basis-1/4">المورد: {product.supplier}</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 mb-4">
            <p className="text-right text-lg md:basis-1/4">التاريخ: {product.date}</p>
            <p className="text-right text-lg md:basis-1/4">النوع: {product.type}</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 mb-4">
            <p className="text-right text-lg md:basis-1/4">مدفوع: 2000</p>
            <p className="text-right text-lg">الوزن: {product.weight}</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 mb-4">
            <p className="text-right text-lg md:basis-1/4">باقي: 2000</p>
            <p className="text-right text-lg">المقاس: {product.size}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 items-center sm:justify-end mb-3 ">
            <p className="text-right text-lg">السعر: 4000</p>
          </div>
          <div className="flex justify-center sm:justify-normal gap-1 sm:gap-8">
            <button className="text-white bg-navyColor py-2 px-6 text-lg font-medium rounded-xl">مسح</button>
            <button className="text-white bg-navyColor py-2 px-6 text-lg font-medium rounded-xl">مرتجع</button>
            <button className="text-white bg-navyColor py-2 px-6 text-lg font-medium rounded-xl">
              <i className="fa-regular fa-pen-to-square"></i>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default WarehouseIncoming;
