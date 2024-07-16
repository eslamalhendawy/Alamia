import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";
import { getData } from "../Services/apiCalls";

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

const Suppliers = () => {
  const { userData } = useAppContext();
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [supplierData, setSupplierData] = useState({});
  const [loading, setLoading] = useState(true);
  const [hidden, setHidden] = useState(true);
  const [authorized, setAuthorized] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData.role === "storage_employee" || userData.role === "bill_employee") {
      setLoading(false);
      setAuthorized(false);
    }
  }, []);

  const handleClick = () => {
    if (userData.role === "storage_employee" || userData.role === "bill_employee") {
      return toast.error("غير مسموح لك بالاضافة");
    } else {
      navigate("/add-supplier");
    }
  };

  useEffect(() => {
    const fetchSuppliers = async () => {
      const response = await getData("Supplayrs", localStorage.getItem("token"));
      if (response.data) {
        let temp = response.data.map((item) => {
          return { value: item._id, label: item.supplayr_name };
        });
        setSuppliers(temp);
      }
    };
    fetchSuppliers();
  }, []);

  useEffect(() => {
    if (selectedSupplier !== "" && authorized) {
      setHidden(false);
      setLoading(true);
      const fetchClientData = async () => {
        const response = await getData(`buys?supplayr=${selectedSupplier}`, localStorage.getItem("token"));
        if (response.data) {
          setSupplierData(response.data.reverse());
          setLoading(false);
        }
      };
      fetchClientData();
    }
  }, [selectedSupplier]);

  return (
    <section className="grow pb-6 pt-[70px] px-4 minHeight">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8 md:mb-24">
        <button onClick={handleClick} to="/add-supplier" className=" items-center justify-center bg-navyColor hover:bg-[#234863] duration-200 text-white text-lg py-2 px-6 rounded-lg">
          اضافة مورد
        </button>
        <Select onChange={(e) => setSelectedSupplier(e.value)} className="w-[250px]" styles={customStyles} options={suppliers} placeholder="اسم المورد" />
      </div>
      {loading && !hidden && <Loading />}
      {!loading && supplierData.length === 0 && <h2 className="text-2xl text-center">No Records Found</h2>}
      {!loading && supplierData.length > 0 && (
        <>
          <div className="xl:w-[50%] xl:mx-auto mb-8 md:mb-24">
            {supplierData.map((item) => (
              <div dir="rtl" key={item._id} className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-lg font-medium text-lg mb-6">
                <p className="text-lg">مورد: {item.supplayr?.supplayr_name}</p>
                <p className="text-lg">النوع: {item.product?.type}</p>
                <p className="text-lg">الوزن: {item.E_wieght}ك</p>
                <p className="text-lg">المقاس: {item.size}</p>
                <p className="text-lg">الموظف: {item.user?.name}</p>
                <p className="text-lg">التاريخ: {item.updatedAt.split("T")[0]}</p>
                <p className="text-lg">السعر الاجمالي: {item.price_all}</p>
              </div>
            ))}
          </div>
          <div dir="rtl" className="flex flex-col md:flex-row md:justify-center gap-12 xl:gap-24">
            <div dir="rtl" className="flex flex-col gap-3 justify-start lg:pr-12 text-xl font-medium">
              {/* <span>وارد</span> */}
              <p>مدفوع : {supplierData[0].supplayr.price_pay}</p>
              <p>باقي : {supplierData[0].supplayr.price_on}</p>
              <p>اجمالي المبلغ : {supplierData[0].supplayr.total_price}</p>
            </div>
            {/* <div dir="rtl" className="flex flex-col gap-3 justify-start lg:pr-12 text-xl font-medium">
              <span>صادر</span>
              <p>المتبقي : {supplierData[0].supplayr.priceOn_sell}</p>
              <p>الدين : {supplierData[0].supplayr.moneyOn_me}</p>
              <p>المستحق : {supplierData[0].supplayr.moneyFor_me}</p>
            </div> */}
          </div>
        </>
      )}
    </section>
  );
};

export default Suppliers;
