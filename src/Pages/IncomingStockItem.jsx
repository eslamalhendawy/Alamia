import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../Services/apiCalls";

import Loading from "../Components/Loading";
import StockNavigation from "../Components/StockNavigation";

const IncomingStockItem = () => {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchItem = async () => {
      const response = await getData(`buys/${id}`, localStorage.getItem("token"));
      console.log(response);
      if (response.data) {
        setItem(response.data);
        setLoading(false);
      }
    };
    fetchItem();
  }, []);

  return (
    <div>IncomingStockItem</div>
  )
}

export default IncomingStockItem