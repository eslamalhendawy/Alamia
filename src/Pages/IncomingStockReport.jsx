import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getData } from "../Services/apiCalls";

import Loading from "../Components/Loading";
import StockNavigation from "../Components/StockNavigation";

const IncomingStockReport = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("incoming");
  const [numberOfPages, setNumberOfPages] = useState(0);
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("incoming-stock" || location.pathname.split("/")[0]);

  useEffect(() => {
    setCurrentPage(location.pathname.split("/")[1]);
  }, [location, currentPage]);

  useEffect(() => {
    const fetchList = async () => {
      const response = await getData("buys", localStorage.getItem("token"));
      if (response.data) {
        setList(response.data);
        setPage(response.paginationResult.currentPage);
        setNumberOfPages(response.paginationResult.numberOfPages);
        setLoading(false);
      }
    };
    fetchList();
  }, []);

  return (
    <section className="grow py-6 px-4 minHeight">
      <StockNavigation />
      <div className="flex justify-center gap-8 mb-6">
        <Link to="/incoming-stock/add" className={`text-lg font-medium text-darkGreen hover:text-white duration-200`}>
          اضافة
        </Link>
        <Link to="/incoming-stock/report" className={`text-lg font-medium text-darkGreen hover:text-white duration-200`}>
          تقرير
        </Link>
      </div>
      {loading && <Loading />}
      {!loading && list.length === 0 && <p className="text-center mt-16 text-2xl font-semibold">لا يوجد بيانات</p>}
      {!loading && list.length > 0 && (
        <div className="xl:w-[70%] xl:mx-auto">
          {list.map((item, index) => (
            <div key={index} className="mb-6 lg:mb-10 bg-white p-4 rounded-xl font-medium">
              <div dir="rtl" className="flex flex-col sm:flex-row gap-3 items-center sm:justify-start mb-3 ">
                <p className="text-right text-lg">المورد: {item.supplayr.supplayr_name}</p>
                <p className="text-right text-lg">النوع: {item.product.type}</p>
                <p className="text-right text-lg">الوزن: {item.E_wieght}</p>
                <p className="text-right text-lg">المقاس: {item.size}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 items-center sm:justify-end mb-3">
                <p className="text-right text-lg">الموظف: {item.user.name}</p>
                <p className="text-right text-lg">التاريخ: {item.createdAt.split("T")[0]}</p>
              </div>
              <div className="flex justify-center sm:justify-end">
                <button className="text-[#01D1ED] font-semibold text-lg">عرض</button>
              </div>
            </div>
          ))}
          <button className="bg-navyColor text-white py-2 px-8 rounded-xl">طباعة</button>
        </div>
      )}
    </section>
  );
};

export default IncomingStockReport;