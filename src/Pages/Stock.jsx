import { useEffect, useState } from "react";
import { getData } from "../Services/apiCalls";

import StockNavigation from "../Components/StockNavigation";

const Stock = () => {
  return (
    <section className="grow py-6 px-4 minHeight">
      <StockNavigation />
    </section>
  )
}

export default Stock