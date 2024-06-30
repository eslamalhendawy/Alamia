import { useState } from "react";

import WarehouseIncoming from "../Components/WarehouseIncoming";
import WarehouseOutgoing from "../Components/WarehouseOutgoing";
import Warehouse from "../Components/Warehouse";

const ManageStock = () => {
  const [page, setPage] = useState("incoming");
  return (
    <section className="grow py-6 px-4 minHeight">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
        <button onClick={() => setPage("incoming")} className={`hover:bg-goldColor duration-200 text-white py-3 text-lg font-medium w-[150px] md:w-[200px] rounded-lg ${page === "incoming" ? "bg-goldColor" : "bg-lightGreen"}`}>
          المخزون الوارد
        </button>
        <button onClick={() => setPage("outgoing")} className={`hover:bg-goldColor duration-200 text-white py-3 text-lg font-medium w-[150px] md:w-[200px] rounded-lg ${page === "outgoing" ? "bg-goldColor" : "bg-lightGreen"}`}>
          المخزون الخارج
        </button>
        <button onClick={() => setPage("warehouse")} className={`hover:bg-goldColor duration-200 text-white py-3 text-lg font-medium w-[150px] md:w-[200px] rounded-lg ${page === "warehouse" ? "bg-goldColor" : "bg-lightGreen"}`}>
          مخزن
        </button>
      </div>
      {page === "incoming" && <WarehouseIncoming />}
      {page === "outgoing" && <WarehouseOutgoing />}
      {page === "warehouse" && <Warehouse />}
    </section>
  );
};

export default ManageStock;
