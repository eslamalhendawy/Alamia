import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getData, deleteData, postData } from "../Services/apiCalls";

import Loading from "../Components/Loading";
import BillsNavigation from "../Components/BillsNavigation";

const BillItem = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setCurrentPage(location.pathname.split("/")[1]);
    if (location.pathname.split("/")[1] === "receive-bill") {
      setType("sell_bell");
    } else {
      setType("buy_bell");
    }
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      if (type === "sell_bell") {
        const response = await getData(`sell_bell/${id}`, localStorage.getItem("token"));
        console.log(response);
      }
    };
    fetchData();
  }, [type]);

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
    </section>
  );
};

export default BillItem;
