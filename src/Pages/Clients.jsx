import { useEffect, useState } from "react";
import { getData } from "../Services/apiCalls";

import Loading from "../Components/Loading";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      const response = await getData("clints", localStorage.getItem("token"));
      console.log(response);
      if (response.data) {
        setClients(response.data);
        setFilteredClients(response.data);
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  useEffect(() => {
    let temp = clients.filter((client) => client.clint_name.includes(search));
    setFilteredClients(temp);
  }, [search]);

  return (
    <section className="grow pb-6 pt-[70px] px-4 minHeight">
      {loading && <Loading />}
      {!loading && clients.length === 0 && <h2 className="text-2xl text-center">No Clients Found</h2>}
      {!loading && clients.length > 0 && (
        <>
          <div className="flex justify-center mb-8 md:mb-16">
            <input onChange={(e) => setSearch(e.target.value)} className="bg-[#BCBABA] py-1 w-[250px] outline-none text-right px-2 text-lg rounded-lg placeholder:text-black" type="text" placeholder="اسم العميل" />
          </div>
          <div className="xl:w-[50%] xl:mx-auto">
            {filteredClients.map((client) => (
              <div dir="rtl" key={client._id} className="flex justify-between p-4 rounded-lg bg-white font-medium mb-6 text-lg">
                <div className="flex flex-wrap gap-4">
                  <p className="text-lg">عميل: {client.clint_name}</p>
                  <p className="text-lg">الدين: {client.money_on}</p>
                  <p className="text-lg">تم دفع: {client.money_pay}</p>
                  <p className="text-lg">الاجمالي: {client.money_pay}</p>
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

export default Clients;
