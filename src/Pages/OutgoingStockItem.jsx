import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getData } from "../Services/apiCalls";

import Loading from "../Components/Loading";
import StockNavigation from "../Components/StockNavigation";

const OutgoingStockItem = () => {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchItem = async () => {
      const response = await getData(`sells/${id}`, localStorage.getItem("token"));
      if (response.data) {
        setItem(response.data);
        setLoading(false);
      }
    };
    fetchItem();
  }, []);

  return (
    <section className="grow py-6 px-4 minHeight">
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
      {!loading && (
        <div dir="rtl" className="xl:w-[70%] 2xl:w-[50%] xl:mx-auto bg-white p-6 rounded-xl font-medium text-lg">
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0 justify-between mb-3">
            <p className="basis-1/3">المورد : {item.clint.clint_name}</p>
            <p className="basis-1/3">الموظف : {item.user.name}</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0 justify-between mb-3">
            <p className="basis-1/3">النوع : {item.product.type}</p>
            <p className="basis-1/3">التاريخ : {item.createdAt.split("T")[0]}</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0 justify-between mb-3">
            <p className="basis-1/3">الوزن : {item.o_wieght}ك</p>
            <p className="basis-1/3">مدفوع : {item.clint.money_pay}</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0 justify-between mb-3">
            <p className="basis-1/3">المقاس : {item.size_o}</p>
            <p className="basis-1/3">باقي : {item.clint.money_on}</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-0 justify-between mb-3">
            <p className="basis-1/3">السعر : {item.price_allQuantity}</p>
          </div>
          <div className="flex flex-col sm:flex-row-reverse justify-start gap-3">
            <button className="bg-navyColor text-white py-2 px-8 rounded-xl">مسح</button>
            <button className="bg-navyColor text-white py-2 px-8 rounded-xl">مرتجع</button>
            <button className="bg-navyColor text-white py-2 px-8 rounded-xl">
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default OutgoingStockItem;
