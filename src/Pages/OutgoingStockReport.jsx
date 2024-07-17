import { useState, useEffect } from "react";
import { useAppContext } from "../Context/AppContext";
import { Link, useLocation } from "react-router-dom";
import { getData } from "../Services/apiCalls";

import Loading from "../Components/Loading";
import StockNavigation from "../Components/StockNavigation";

const OutgoingStockReport = () => {
  const { userData } = useAppContext();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(true);
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("incoming-stock" || location.pathname.split("/")[0]);

  useEffect(() => {
    if (userData.role === "bill_employee" || userData.role === "manager") {
      setLoading(false);
      setAuthorized(false);
    }
  }, []);

  useEffect(() => {
    setCurrentPage(location.pathname.split("/")[1]);
  }, [location, currentPage]);

  useEffect(() => {
    const fetchList = async () => {
      const response = await getData("sells", localStorage.getItem("token"));
      if (response.data) {
        setList(response.data.reverse());
        setLoading(false);
      }
    };
    fetchList();
  }, []);

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
      {loading && <Loading />}
      {((!loading && list.length === 0) || !authorized) && <p className="text-center mt-16 text-2xl font-semibold">لا يوجد بيانات</p>}
      {!loading && list.length > 0 && authorized && (
        <div className="xl:w-[50%] xl:mx-auto">
          {list.map((item, index) => (
            <div key={index} dir="rtl" className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-lg font-medium text-lg mb-6">
              <p className="text-right text-lg">المورد: {item.clint.clint_name}</p>
              <p className="text-right text-lg">النوع: {item.product?.type}</p>
              <p className="text-right text-lg">الوزن: {item.o_wieght}</p>
              <p className="text-right text-lg">المقاس: {item.size_o}</p>
              <p className="text-right text-lg">الموظف: {item.user.name}</p>
              <p className="text-right text-lg">التاريخ: {item.createdAt.split("T")[0]}</p>
              <div className="flex justify-center sm:justify-end">
                <Link to={`/outgoing-stock/${item._id}`} className="text-[#01D1ED] font-semibold text-lg">
                  عرض
                </Link>
              </div>
            </div>
          ))}
          <a href="https://alalamya.onrender.com/api/v1/sells/export/excel" target="_blank" className="bg-navyColor hover:bg-[#234863] duration-200 text-white py-2 px-8 rounded-xl">
            طباعة
          </a>
        </div>
      )}
    </section>
  );
};

export default OutgoingStockReport;
