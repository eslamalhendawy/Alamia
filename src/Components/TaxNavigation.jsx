import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const TaxNavigation = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("" || location.pathname.split("/")[0]);

  useEffect(() => {
    setCurrentPage(location.pathname.split("/")[1]);
  }, [location, currentPage]);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
      <Link to="/exit-tax/add" className={` hover:bg-goldColor duration-200 text-white py-3 text-lg font-medium w-[150px] md:w-[200px] rounded-lg text-center ${currentPage === "exit-tax" ? "bg-goldColor" : "bg-lightGreen"}`}>
        ضريبة خروج
      </Link>
      <Link to="/enter-tax/add" className={` hover:bg-goldColor duration-200 text-white py-3 text-lg font-medium w-[150px] md:w-[200px] rounded-lg text-center ${currentPage === "enter-tax" ? "bg-goldColor" : "bg-lightGreen"}`}>
        ضريبة دخول
      </Link>
    </div>
  );
};

export default TaxNavigation;
