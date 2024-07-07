import { useState, useEffect } from "react";
import { useAppContext } from "../Context/AppContext";
import { useLocation, Link } from "react-router-dom";
import { getData, postData } from "../Services/apiCalls";

import Select from "react-select";

import BillsNavigation from "../Components/BillsNavigation";

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

const Bills = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("");
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState("");
  const [selectedData, setSelectedData] = useState({});
  const [type, setType] = useState("");
  const [paymentType, setPaymentType] = useState("cash");
  const [amount, setAmount] = useState("");
  const [checkNumber, setCheckNumber] = useState("");
  const [checkDate, setCheckDate] = useState("");
  const { userData } = useAppContext();

  useEffect(() => {
    setCurrentPage(location.pathname.split("/")[1]);
  }, [location]);

  useEffect(() => {
    if (currentPage !== "") {
      const fetchList = async () => {
        if (currentPage === "receive-bill") {
          const response = await getData(`clints`, localStorage.getItem("token"));
          setType("clints");
          let temp = response.data.map((item) => {
            return { value: item._id, label: item.clint_name, name: item.clint_name };
          });
          setList(temp);
        } else {
          const response = await getData(`Supplayrs`, localStorage.getItem("token"));
          setType("Supplayrs");
          let temp = response.data.map((item) => {
            return { value: item._id, label: item.supplayr_name, name: item.supplayr_name };
          });
          setList(temp);
        }
      };
      fetchList();
    }
  }, [currentPage]);

  useEffect(() => {
    if (selected !== "") {
      const fetchSelectedData = async () => {
        const response = await getData(`${type}/${selected}`, localStorage.getItem("token"));
        console.log(response.data);
        setSelectedData(response.data);
      };
      fetchSelectedData();
    }
  }, [selected]);

  const handleAdd = async () => {
    if (selected === "") {
      toast.error("اختر العميل");
      return;
    }
    if (amount === "") {
      toast.error("ادخل المبلغ المدفوع");
      return;
    }
    if (type === "clints") {
      const data = { user: userData.id, clint: selectedData?._id, payBell: amount, paymentMethod: paymentType, checkDate, checkNumber };
      if (paymentType === "cash") {
        delete data.checkDate;
        delete data.checkNumber;
      }
      const response = await postData("sell_bell", data, localStorage.getItem("token"));
      console.log(response);
      if (response.data) {
        window.location.reload();
      }
    } else {
      const data = { user: userData.id, supplayr: selectedData?._id, pay_bell: amount, payment_method: paymentType, check_date: checkDate, check_number: checkNumber };
      if (paymentType === "cash") {
        delete data.check_date;
        delete data.check_number;
      }
      const response = await postData("buy_bell", data, localStorage.getItem("token"));
      if (response.data) {
        window.location.reload();
      }
    }
  };

  return (
    <section className="grow pb-6 pt-[70px] px-4 minHeight">
      <BillsNavigation />
      <div className="flex justify-center gap-8 mb-6">
        <Link to={currentPage === "receive-bill" ? "/receive-bill/add" : "/pay-bill/add"} className={`text-lg font-medium text-darkGreen hover:text-white duration-200`}>
          اضافة
        </Link>
        <Link to={currentPage === "receive-bill" ? "/receive-bill/report" : "/pay-bill/report"} className={`text-lg font-medium text-darkGreen hover:text-white duration-200`}>
          تقرير
        </Link>
      </div>
      <div className="flex justify-center mb-8">
        <Select onChange={(e) => setSelected(e.value)} className="w-[250px]" styles={customStyles} options={list} />
      </div>
      <div className="flex justify-center mb-8">
        <input onChange={(e) => setAmount(e.target.value)} className="border text-right outline-none py-2 px-1 rounded-xl w-[90%] sm:w-[40%] xl:w-[30%] 2xl:w-[25%]" type="number" placeholder="المبلغ المدفوع" />
      </div>
      <div className="flex justify-center gap-6 mb-8">
        <div className="flex gap-2 items-center">
          <label htmlFor="cash" className="text-lg text-[#054A3D] font-medium">
            كاش
          </label>
          <input defaultChecked onChange={(e) => setPaymentType("cash")} type="radio" name="paymentType" id="cash" />
        </div>
        <div className="flex gap-2 items-center">
          <label htmlFor="check" className="text-lg text-[#054A3D] font-medium">
            شيك
          </label>
          <input onChange={(e) => setPaymentType("check")} type="radio" name="paymentType" id="check" />
        </div>
      </div>
      {paymentType === "check" && (
        <>
          <div className="flex justify-center mb-8">
            <input onChange={(e) => setCheckNumber(e.target.value)} className="border text-right outline-none py-2 px-1 rounded-xl w-[90%] sm:w-[40%] xl:w-[30%] 2xl:w-[25%]" type="number" placeholder="رقم الشيك" />
          </div>
          <div className="flex justify-center mb-8">
            <input onChange={(e) => setCheckDate(e.target.value)} className="border text-right outline-none py-2 px-1 rounded-xl w-[90%] sm:w-[40%] xl:w-[30%] 2xl:w-[25%]" type="date" placeholder="تاريخ الشيك" />
          </div>
        </>
      )}
      <div className="flex justify-center mb-8">
        <button onClick={handleAdd} className="flex flex-row-reverse items-center justify-center gap-2 bg-navyColor hover:bg-[#234863] duration-200 text-white text-xl py-3 px-8 rounded-lg">
          اضافة <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      <div dir="rtl" className="flex flex-col gap-3 justify-start lg:pr-12 text-xl font-medium">
        <p>مدفوع : {type === "clints" ? selectedData?.money_pay : selectedData?.price_pay}</p>
        <p>باقي : {type === "clints" ? selectedData?.money_on : selectedData?.price_on}</p>
        <p>اجمالي المبلغ : {type === "clints" ? selectedData?.total_monye : selectedData?.total_price}</p>
      </div>
    </section>
  );
};

export default Bills;
