import { useState } from "react";
import { useAppContext } from "../Context/AppContext";
import { getData } from "../Services/apiCalls";

import Loading from "../Components/Loading";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Report = () => {
  const { userData } = useAppContext();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleSearch = async () => {
    if (userData.role !== "admin") {
      return toast.error("غير مسموح لك بالبحث");
    }
    if (!startDate || !endDate) {
      return toast.error("الرجاء ادخال تاريخ البداية والنهاية");
    }
    setLoading(true);
    const response = await getData(`report?startDate=${startDate}&endDate=${endDate}`, localStorage.getItem("token"));    
    if (response.data) {
      setResult(response.data);
      setLoading(false);
    }
  };

  return (
    <section className="minHeight grow pb-6 pt-[70px] px-4">
      <div className="flex flex-col sm:flex-row-reverse justify-center items-center gap-4 md:gap-8 pt-[50px] mb-12">
        <input onChange={(e) => setStartDate(e.target.value)} className="bg-[#bcbaba] text-white outline-none p-2 lg:w-[250px]" type="date" />
        <span className="text-lg text-navyColor font-medium">الى</span>
        <input onChange={(e) => setEndDate(e.target.value)} className="bg-[#bcbaba] text-white outline-none p-2 lg:w-[250px]" type="date" />
        <button onClick={handleSearch} className="bg-navyColor hover:bg-[#234863] duration-200 text-white text-xl size-[40px] flex justify-center items-center rounded-lg">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      {loading && <Loading />}
      {!loading && result && (
        <div dir="rtl" className="xl:w-[100%] 2xl:w-[70%] xl:mx-auto bg-white p-6 rounded-xl font-medium text-lg">
          <div className="flex flex-col xl:flex-row items-center gap-3 xl:gap-0 justify-between mb-3">
            <p className="basis-1/3">اجمالي المبيع : {result.totalSales.toFixed(2)} ج م</p>
            <p className="basis-1/3">متبقي على العملاء : {result.totalDueFromClients.toFixed(2)} ج م</p>
          </div>
          <div className="flex flex-col xl:flex-row items-center gap-3 xl:gap-0 justify-between mb-3">
            <p className="basis-1/3">اجمالي شراء : {result.totalPurchases.toFixed(2)} ج م</p>
            <p className="basis-1/3">تم سداد : {result.totalDueFromClients.toFixed(2)} ج م</p>
          </div>
          <div className="flex flex-col xl:flex-row items-center gap-3 xl:gap-0 justify-between mb-3">
            <p className="basis-1/3">اجمالي مخزون مالي : {result.totalWightMoney.toFixed(2)} ج م</p>
            <p className="basis-1/3"> هامش الربح : {result.totalPurchases.toFixed(2)} ج م</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Report;
