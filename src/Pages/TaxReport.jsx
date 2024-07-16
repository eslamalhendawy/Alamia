import { useState, useEffect } from "react";
import { useAppContext } from "../Context/AppContext";
import { useLocation, Link } from "react-router-dom";
import { getData, deleteData } from "../Services/apiCalls";

import Loading from "../Components/Loading";
import TaxNavigation from "../Components/TaxNavigation";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaxReport = () => {
  const { userData } = useAppContext();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("");
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [authorized, setAuthorized] = useState(true);

  useEffect(() => {
    if (userData.role === "storage_employee" || userData.role === "bill_employee") {
      setLoading(false);
      setAuthorized(false);
    }
  }, []);

  useEffect(() => {
    setCurrentPage(location.pathname.split("/")[1]);
  }, [location]);

  useEffect(() => {
    const fetchList = async () => {
      if (currentPage === "client-tax" && authorized) {
        const response = await getData(`clint_Tax`, localStorage.getItem("token"));
        setList(response.data);
        setLoading(false);
      } else if (currentPage === "supplier-tax" && authorized) {
        const response = await getData(`supplayr_Tax`, localStorage.getItem("token"));
        setList(response.data);
        setLoading(false);
      }
    };
    fetchList();
  }, [currentPage]);

  const handleDelete = async (id) => {
    if (userData.role !== "admin") return toast.error("غير مسموح لك بالحذف");
    if (currentPage === "client-tax") {
      const response = await deleteData(`clint_Tax/${id}`, localStorage.getItem("token"));
      if (response === "") {
        window.location.reload();
      }
    } else if (currentPage === "supplier-tax") {
      const response = await deleteData(`supplayr_Tax/${id}`, localStorage.getItem("token"));
      if (response === "") {
        window.location.reload();
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
      {loading && <Loading />}
      {!loading && list.length === 0 && <p className="text-center mt-16 text-2xl font-semibold">لا يوجد بيانات</p>}
      {!loading && list.length > 0 && authorized && (
        <div className="xl:w-[60%] xl:mx-auto">
          {list.map((item, index) => (
            <div dir="rtl" key={index} className="mb-6 bg-white p-4 rounded-lg font-medium text-lg flex flex-col md:flex-row items-center gap-8">
              <div className="flex flex-wrap gap-4 items-center">
                <p className="text-right text-lg">
                  {currentPage === "client-tax" ? "العميل" : "المورد"}: {currentPage === "client-tax" ? item.clint?.clint_name : item.supplayr.supplayr_name}
                </p>
                <p className="text-right text-lg">التاريخ: {item.updatedAt.split("T")[0]}</p>
                <p className="text-right text-lg">عدد مرات الخصم: {currentPage === "client-tax" ? item.clint?.disCount : item.supplayr.dis_count}</p>
                <p className="text-right text-lg">نسبة الضريبة: {item.taxRate}</p>
                <p className="text-right text-lg">نسبة الخصم: {item.discountRate}</p>
                <p className="text-right text-lg">المبلغ: {item.amount}</p>
                <p className="text-right text-lg">قيمة الضريبة: {Math.floor(item.taxAmount)}</p>
                <p className="text-right text-lg">قيمة الخصم: {item.discountAmount}</p>
                <p className="text-right text-lg">الاجمالي: {Math.floor(item.netAmount)}</p>
                <p className="text-right text-lg">الموظف: {item.user.name}</p>
              </div>
              <div>
                <button onClick={() => handleDelete(item._id)} className="text-xl hover:text-red-500 duration-200">
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TaxReport;
