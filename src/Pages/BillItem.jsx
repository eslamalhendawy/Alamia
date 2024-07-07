import { useState, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { getData, deleteData, postData } from "../Services/apiCalls";

import Loading from "../Components/Loading";
import BillsNavigation from "../Components/BillsNavigation";
import EditBillModal from "../Components/EditBillModal";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BillItem = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(location.pathname.split("/")[1]);
    if (location.pathname.split("/")[1] === "receive-bill") {
      setType("sell_bell");
    } else {
      setType("buy_bell");
    } 
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      if (type === "sell_bell") {
        const response = await getData(`sell_bell/${id}`, localStorage.getItem("token"));
        setData({ client: response.data.clint.clint_name, employee: response.data.user.name, payed: response.data.payBell, date: response.data.updatedAt, debt: response.data.clint.money_on, total: response.data.clint.total_monye, paymentMethod: response.data.paymentMethod, checkNumber: response.data.checkNumber, checkDate: response.data.checkDate, allPayed: response.data.clint.money_pay, clientID: response.data.clint._id });
        setLoading(false);
      } else if (type === "buy_bell") {
        const response = await getData(`buy_bell/${id}`, localStorage.getItem("token"));
        console.log(response.data);
        setData({ client: response.data.supplayr?.supplayr_name, employee: response.data.user.name, payed: response.data.pay_bell, date: response.data.updatedAt, debt: response.data.supplayr.price_on, total: response.data.supplayr.total_price, paymentMethod: response.data.payment_method, allPayed: response.data.supplayr.price_pay, checkNumber: response.data.check_number, checkDate: response.data.check_date });
        setLoading(false);
      }
    };
    fetchData();
  }, [type]);

  const handleDelete = async () => {
    if (type === "sell_bell") {
      const response = await deleteData(`sell_bell/${id}`, localStorage.getItem("token"));
      if (response === "") {
        toast.success("تم الحذف بنجاح");
        navigate("/receive-bill/report");
      }
    } else if (type === "buy_bell") {
      const response = await deleteData(`buy_bell/${id}`, localStorage.getItem("token"));
      if (response === "") {
        toast.success("تم الحذف بنجاح");
        navigate("/pay-bill/report");
      }
    }
  };

  const handleReturn = async () => {
    let temp = new Date();
    const date = `${temp.getFullYear()}-${temp.getMonth() + 1}-${temp.getDate()}`;
    const response = await postData(`return_check`, { clint: data.clientID, amount: data.payed, date }, localStorage.getItem("token"));
    console.log(response);
    if(response.data) {
      toast.success("تم اضافة المرتجع بنجاح");
      navigate("/receive-bill/report");
    }
  };

  return (
    <section className="grow pb-6 pt-[70px] px-4 minHeight">
      <BillsNavigation />
      <div className="flex justify-center gap-8 mb-6">
        <Link to={currentPage === "receive-bill" ? "/receive-bill/add" : "/pay-bill/add"} className={`text-lg font-medium text-darkGreen hover:text-white duration-200`}>
          اضافة
        </Link>
        <Link to={currentPage === "receive-bill" ? "/receive-bill/report" : "/pay-bill/report"} className={`text-lg font-medium text-darkGreen hover:text-white duration-200`}>
          تقرير
        </Link>
      </div>
      {loading && <Loading />}
      {!loading && (
        <div dir="rtl" className="xl:w-[70%] 2xl:w-[50%] xl:mx-auto bg-white p-6 rounded-xl font-medium text-lg">
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0 justify-between mb-3">
            <p className="basis-1/3">
              {type === "sell_bell" ? "العميل" : "المورد"} : {data.client}
            </p>
            <p className="basis-1/3">الموظف : {data.employee}</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0 justify-between mb-3">
            <p className="basis-1/3">مبلغ الفاتورة : {data.payed}</p>
            <p className="basis-1/3">الباقي : {data.debt}</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0 justify-between mb-3">
            <p className="basis-1/3">السعر : {data.total}</p>
            <p className="basis-1/3">المبلغ المدفوع : {data.allPayed}</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0 justify-between mb-3">
            <p className="basis-1/2">طريقة الدفع : {data.paymentMethod}</p>
            {data.paymentMethod === "check" && (
              <>
                <p className="basis-1/3">رقم الشيك : {data.checkNumber}</p>
              </>
            )}
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0 justify-between mb-6">
            {data.paymentMethod === "check" && (
              <>
                <p className="basis-1/3">تاريخ الشيك : {data.checkDate}</p>
              </>
            )}
            <p className="basis-1/3">التاريخ : {data.date.split("T")[0]}</p>
          </div>
          <div>
            <div className="flex flex-col sm:flex-row-reverse justify-start gap-3">
              <button onClick={handleDelete} className="bg-navyColor hover:bg-[#234863] duration-200 text-white py-2 px-8 rounded-xl">
                مسح
              </button>
              {data.paymentMethod === "check" && type === "sell_bell" && (
                <button onClick={handleReturn} className="bg-navyColor hover:bg-[#234863] duration-200 text-white py-2 px-8 rounded-xl">
                  مرتجع
                </button>
              )}
              <EditBillModal data={data} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BillItem;
