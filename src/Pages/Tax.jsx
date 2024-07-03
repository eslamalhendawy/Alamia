import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

import TaxNavigation from "../Components/TaxNavigation";

const Tax = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    setCurrentPage(location.pathname.split("/")[1]);
  }, [location]);

  return (
    <section className="grow pb-6 pt-[70px] px-4 minHeight">
      <TaxNavigation />
      <div className="flex justify-center gap-8 mb-6">
        <Link to={currentPage === "exit-tax" ? "/exit-tax/add" : "/enter-tax/add"} className={`text-lg font-medium text-darkGreen hover:text-white duration-200`}>
          اضافة
        </Link>
        <Link to={currentPage === "exit-tax" ? "/exit-tax/report" : "/enter-tax/report"} className={`text-lg font-medium text-darkGreen hover:text-white duration-200`}>
          تقرير
        </Link>
      </div>
      
    </section>
  );
};

export default Tax;
