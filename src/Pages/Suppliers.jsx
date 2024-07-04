import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getData } from "../Services/apiCalls";

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

const Suppliers = () => {
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [supplierData, setSupplierData] = useState({});
  const [loading, setLoading] = useState(true);
  const [hidden, setHidden] = useState(true);

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
    if (selectedSupplier !== "") {
      setHidden(false);
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
      <div className="flex justify-center gap-4 mb-8 md:mb-16">
        <Link to="/add-supplier" className=" items-center justify-center bg-navyColor hover:bg-[#234863] duration-200 text-white text-lg py-2 px-6 rounded-lg">
          اضافة مورد
        </Link>
        <Select onChange={(e) => setSelectedSupplier(e.value)} className="w-[250px]" styles={customStyles} options={suppliers} placeholder="اسم المورد" />
      </div>
      {loading && !hidden && <Loading />}
      {!loading && supplierData.length === 0 && <h2 className="text-2xl text-center">No Records Found</h2>}
      {!loading && supplierData.length > 0 && (
        <>
          <div className="flex justify-center mb-8 md:mb-16"></div>
          <div className="xl:w-[50%] xl:mx-auto">
            {supplierData.map((item) => (
              <div dir="rtl" key={item._id} className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-lg font-medium text-lg">
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
        </>
      )}
    </section>
  );
};

export default Suppliers;
