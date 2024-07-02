import { useEffect, useState } from "react";
import { getData } from "../Services/apiCalls";

import Loading from "../Components/Loading";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchSuppliers = async () => {
      const response = await getData("Supplayrs", localStorage.getItem("token"));
      console.log(response);
      if (response.data) {
        setSuppliers(response.data);
        setFilteredSuppliers(response.data);
        setLoading(false);
      }
    };
    fetchSuppliers();
  }, []);

  useEffect(() => {
    let temp = suppliers.filter((client) => client.clint_name.includes(search));
    setFilteredSuppliers(temp);
  }, [search]);

  return (
    <section className="grow pb-6 pt-[70px] px-4 minHeight">
      {loading && <Loading />}
      {!loading && suppliers.length === 0 && <h2 className="text-2xl text-center">No Clients Found</h2>}
      {!loading && suppliers.length > 0 && (
        <>
          <div className="flex justify-center mb-8 md:mb-16">
            <input onChange={(e) => setSearch(e.target.value)} className="bg-[#BCBABA] py-1 w-[250px] outline-none text-right px-2 text-lg rounded-lg placeholder:text-black" type="text" placeholder="اسم العميل" />
          </div>
          <div className="xl:w-[50%] xl:mx-auto">
            {filteredSuppliers.map((client) => (
              <div dir="rtl" key={client._id} className="flex justify-between p-4 rounded-lg bg-white font-medium mb-6 text-lg">
                <div className="flex flex-wrap gap-4">
                  <p className="text-lg">مورد: {client.supplayr_name}</p>
                  <p className="text-lg">الدين: {client.price_on}</p>
                  <p className="text-lg">تم دفع: {client.money_pay}</p>
                  <p className="text-lg">الاجمالي: {client.total_price}</p>
                  <p className="text-lg">التاريخ: {client.createdAt.split("T")[0]}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Suppliers;