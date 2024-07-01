import { useState } from "react";
import { postData } from "../Services/apiCalls";

const Report = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <section className="minHeight grow py-6 px-4">
      <div className="flex flex-col sm:flex-row-reverse justify-start items-center gap-4 md:gap-8 pt-[50px]">
        <input onChange={(e) => setStartDate(e.target.value)} className="bg-[#bcbaba] text-white outline-none p-2 lg:w-[250px]" type="date" />
        <span className="text-lg text-navyColor font-medium">الى</span>
        <input onChange={(e) => setEndDate(e.target.value)} className="bg-[#bcbaba] text-white outline-none p-2 lg:w-[250px]" type="date" />
        <button className="bg-navyColor hover:bg-[#234863] duration-200 text-white text-xl size-[40px] flex justify-center items-center rounded-lg">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </section>
  );
};

export default Report;
