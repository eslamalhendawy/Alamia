import { useState, useEffect } from "react";
import { useAppContext } from "../Context/AppContext";
import { useLocation, Link } from "react-router-dom";
import { getData } from "../Services/apiCalls";

import Loading from "../Components/Loading";
import BillsNavigation from "../Components/BillsNavigation";

const BillReport = () => {
  const { userData } = useAppContext();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userData.role === "storage_employee") {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setCurrentPage(location.pathname.split("/")[1]);
  }, [location]);

  useEffect(() => {
    if (currentPage !== "") {
      const fetchList = async () => {
        if (currentPage === "receive-bill") {
          const response = await getData(`sell_bell`, localStorage.getItem("token"));
          let temp = response.data.map((item) => {
            return { id: item._id, client: item.clint.clint_name || item.clint, payed: item.payBell, paymentMethod: item.paymentMethod, employee: item.user.name, date: item.updatedAt };
          });
          setList(temp.reverse());
          setLoading(false);
        } else {
          const response = await getData(`buy_bell`, localStorage.getItem("token"));
          let temp = response.data.map((item) => {
            return { id: item._id, client: item.supplayr?.supplayr_name, payed: item.pay_bell, paymentMethod: item.payment_method, employee: item.user.name, date: item.updatedAt };
          });
          setList(temp);
          setLoading(false);
        }
      };
      fetchList();
    }
  }, [currentPage]);

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
      {loading && <Loading />}
      {!loading && list.length === 0 && <p className="text-center mt-16 text-2xl font-semibold">لا يوجد بيانات</p>}
      {!loading && list.length > 0 && userData !== "storage_employee" && (
        <div className="xl:w-[50%] xl:mx-auto">
          {list.map((item) => (
            <div dir="rtl" key={item.id} className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-lg font-medium text-lg mb-6">
              <p className="text-right text-lg">
                {currentPage === "receive-bill" ? "العميل" : "المورد"}: {item.client}
              </p>
              <p className="text-right text-lg">المدفوع: {item.payed}</p>
              <p className="text-right text-lg">طريقة الدفع: {item.paymentMethod}</p>
              <p className="text-right text-lg">الموظف: {item.employee}</p>
              <p className="text-right text-lg">التاريخ: {item.date.split("T")[0]}</p>
              <div className="flex justify-center sm:justify-end">
                <Link to={`/${currentPage === "receive-bill" ? "receive-bill" : "pay-bill"}/${item.id}`} className="text-[#01D1ED] font-semibold text-lg">
                  عرض
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default BillReport;
