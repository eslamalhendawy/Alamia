import { useEffect, useState } from "react";
import { getData } from "../Services/apiCalls";
import { Link } from "react-router-dom";

import Select from "react-select";

import Loading from "../Components/Loading";

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#bcbaba",
    padding: "4px 8px",
    outline: "none",
    textAlign: "right",
    color: "#fff",
    margin: "0 auto",
  }),
  option: (provided) => ({
    ...provided,
    backgroundColor: "#fff",
    textAlign: "right",
    color: "black",
  }),
};

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [clientData, setClientData] = useState({});
  const [hidden, setHidden] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      const response = await getData("clints", localStorage.getItem("token"));
      if (response.data) {
        let temp = response.data.map((item) => {
          return { value: item._id, label: item.clint_name };
        });
        setClients(temp);
      }
    };
    fetchClients();
  }, []);

  useEffect(() => {
    if (selectedClient !== "") {
      setHidden(false);
      const fetchClientData = async () => {
        const response = await getData(`sells?client=${selectedClient}`, localStorage.getItem("token"));
        console.log(response);
        if (response.data) {
          setClientData(response.data.reverse());
          setLoading(false);
        }
      };
      fetchClientData();
    }
  }, [selectedClient]);

  return (
    <section className="grow pb-6 pt-[70px] px-4 minHeight">
      <div className="flex justify-center gap-4 mb-8 md:mb-16">
        <Link to="/add-client" className=" items-center justify-center bg-navyColor hover:bg-[#234863] duration-200 text-white text-lg py-2 px-6 rounded-lg">اضافة عميل</Link>
        <Select onChange={(e) => setSelectedClient(e.value)} className="w-[250px]" styles={customStyles} options={clients} placeholder="اسم العميل" />
      </div>
      {loading && !hidden && <Loading />}
      {!loading && clientData.length === 0 && <h2 className="text-2xl text-center">No Clients Found</h2>}
      {!loading && clientData.length > 0 && (
        <>
          <div className="xl:w-[50%] xl:mx-auto flex flex-col gap-6">
            {clientData.map((item, index) => (
              <div dir="rtl" key={index} className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-lg font-medium text-lg">
                <p>عميل: {item.clint.clint_name}</p>
                <p>النوع: {item.product.type}</p>
                <p>الوزن: {item.o_wieght}</p>
                <p>المقاس: {item.size_o}</p>
                <p>الموظف: {item.user.name}</p>
                <p>التاريخ: {item.updatedAt.split("T")[0]}</p>
                <p>سعر الاجمالي: {item.price_allQuantity}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Clients;
