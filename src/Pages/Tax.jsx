import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { getData, postData } from "../Services/apiCalls";
import { useAppContext } from "../Context/AppContext";

import Select from "react-select";

import TaxNavigation from "../Components/TaxNavigation";

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

const Tax = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("");
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState("");
  const [amount, setAmount] = useState("");
  const [taxAmount, setTaxAmount] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");
  const [notes, setNotes] = useState("");
  const { userData } = useAppContext();

  useEffect(() => {
    setCurrentPage(location.pathname.split("/")[1]);
  }, [location]);

  useEffect(() => {
    setSelected("");
    if (currentPage !== "") {
      const fetchList = async () => {
        if (currentPage === "client-tax") {
          const response = await getData(`clints`, localStorage.getItem("token"));
          let temp = response.data.map((item) => {
            return { value: item._id, label: item.clint_name, name: item.clint_name, discountNumber: item.disCount, payed: item.money_pay, debt: item.money_on, total: item.total_monye };
          });
          setList(temp.reverse());
        } else {
          const response = await getData(`Supplayrs`, localStorage.getItem("token"));
          let temp = response.data.map((item) => {
            return { value: item._id, label: item.supplayr_name, name: item.supplayr_name, discountNumber: item.dis_count, payed: item.price_pay, debt: item.price_on, total: item.total_price };
          });
          setList(temp.reverse());
        }
      };
      fetchList();
    }
  }, [currentPage]);

  const handleAdd = async () => {
    if (userData.role === "storage_employee" || userData.role === "bill_employee") {
      return toast.error("غير مسموح لك بالاضافة");
    }
    if (selected === "" || amount === "" || taxAmount === "") {
      return toast.error("الرجاء ملئ جميع الحقول");
    }
    if (currentPage === "client-tax") {
      const response = await postData(`clint_Tax`, { user: userData.id, clint: selected.value, amount, taxRate: taxAmount, discountRate: discountAmount, Notes: notes }, localStorage.getItem("token"));
      if (response.data) {
        toast.success("تم الاضافة بنجاح");
        setAmount("");
        setTaxAmount("");
        setDiscountAmount("");
        setNotes("");
      }
    } else if (currentPage === "supplier-tax") {
      const response = await postData(`supplayr_Tax`, { user: userData.id, supplayr: selected.value, amount, taxRate: taxAmount, discountRate: discountAmount, Notes: notes }, localStorage.getItem("token"));
      if (response.data) {
        toast.success("تم الاضافة بنجاح");
        setAmount("");
        setTaxAmount("");
        setDiscountAmount("");
        setNotes("");
      }
    }
  };

  return (
    <section className="grow pb-6 pt-[70px] px-4 minHeight">
      <TaxNavigation />
      <div className="flex justify-center gap-8 mb-6">
        <Link to={currentPage === "client-tax" ? "/client-tax/add" : "/supplier-tax/add"} className={`text-lg font-medium text-darkGreen hover:text-white duration-200`}>
          اضافة
        </Link>
        <Link to={currentPage === "client-tax" ? "/client-tax/report" : "/supplier-tax/report"} className={`text-lg font-medium text-darkGreen hover:text-white duration-200`}>
          تقرير
        </Link>
      </div>
      <div className="flex justify-center mb-12">
        <Select onChange={(e) => setSelected(e)} className="w-[250px]" styles={customStyles} options={list} />
      </div>
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 mb-16">
        <div className="flex flex-col gap-6 basis-1/3">
          <input value={amount} onChange={(e) => setAmount(e.target.value)} className="border text-right outline-none py-2 px-1 rounded-xl" type="number" placeholder="المبلغ" />
          <input value={taxAmount} onChange={(e) => setTaxAmount(e.target.value)} className="border text-right outline-none py-2 px-1 rounded-xl" type="number" placeholder="قيمة الضريبة" />
          <input value={discountAmount} onChange={(e) => setDiscountAmount(e.target.value)} className="border text-right outline-none py-2 px-1 rounded-xl" type="number" placeholder="قيمة الخصم" />
        </div>
        <div className="basis-1/3">
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full min-h-[200px] h-full resize-none border text-right outline-none py-2 px-1 rounded-xl" placeholder="ملاحظات"></textarea>
        </div>
      </div>
      <div className="flex justify-center mb-8">
        <button onClick={handleAdd} className="flex flex-row-reverse items-center justify-center gap-2 bg-navyColor hover:bg-[#234863] duration-200 text-white text-xl py-3 px-8 rounded-lg">
          اضافة <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      <div dir="rtl" className="flex flex-col gap-3 justify-start lg:pr-12 text-xl font-medium">
        <p>عدد مرات الخصم : {selected !== "" && selected.discountNumber}</p>
        <p>مدفوع : {selected !== "" && Math.round(selected.payed)}</p>
        <p>باقي : {selected !== "" && Math.round(selected.debt)}</p>
        <p>اجمالي المبلغ : {selected !== "" && Math.round(selected.total)}</p>
      </div>
    </section>
  );
};

export default Tax;
