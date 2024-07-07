import { useEffect, useState } from "react";
import { getData } from "../Services/apiCalls";
import { useAppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

import Select from "react-select";

import Loading from "../Components/Loading";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const { userData } = useAppContext();
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [clientData, setClientData] = useState({});
  const [hidden, setHidden] = useState(true);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData.role === "storage_employee" || userData.role === "bill_employee") {
      setLoading(false);
      setAuthorized(false);
    }
  }, []);

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
    if (selectedClient !== "" && authorized) {
      setHidden(false);
      setLoading(true);
      const fetchClientData = async () => {
        const response = await getData(`sells?clint=${selectedClient}`, localStorage.getItem("token"));
        if (response.data) {
          setClientData(response.data.reverse());
          setLoading(false);
        }
      };
      fetchClientData();
    }
  }, [selectedClient]);

  const handleClick = () => {
    if (userData.role === "storage_employee" || userData.role === "bill_employee") {
      return toast.error("غير مسموح لك بالاضافة");
    } else {
      navigate("/add-client");
    }
  };

  return (
    <section className="grow pb-6 pt-[70px] px-4 minHeight">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8 md:mb-24">
        <button onClick={handleClick} to="/add-client" className=" items-center justify-center bg-navyColor hover:bg-[#234863] duration-200 text-white text-lg py-2 px-6 rounded-lg">
          اضافة عميل
        </button>
        <Select onChange={(e) => setSelectedClient(e.value)} className="w-[250px]" styles={customStyles} options={clients} placeholder="اسم العميل" />
      </div>
      {loading && !hidden && <Loading />}
      {!loading && clientData.length === 0 && <h2 className="text-2xl text-center">No Records Found</h2>}
      {!loading && clientData.length > 0 && (
        <>
          <div className="xl:w-[50%] xl:mx-auto flex flex-col gap-6 mb-8 md:mb-16">
            {clientData.map((item, index) => (
              <div dir="rtl" key={index} className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-lg font-medium text-lg">
                <p>عميل: {item.clint.clint_name}</p>
                <p>النوع: {item.product.type}</p>
                <p>الوزن: {item.o_wieght}ك</p>
                <p>المقاس: {item.size_o}</p>
                <p>الموظف: {item.user.name}</p>
                <p>التاريخ: {item.updatedAt.split("T")[0]}</p>
                <p>سعر الاجمالي: {item.price_allQuantity}</p>
              </div>
            ))}
          </div>
          <div dir="rtl" className="flex flex-col md:flex-row md:justify-center gap-12 xl:gap-24">
            <div dir="rtl" className="flex flex-col gap-3 justify-start lg:pr-12 text-xl font-medium">
              <p>مدفوع : {clientData[0].clint.money_pay}</p>
              <p>باقي : {clientData[0].clint.money_on}</p>
              <p>اجمالي المبلغ : {clientData[0].clint.money_on + clientData[0].clint.money_pay}</p>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Clients;
