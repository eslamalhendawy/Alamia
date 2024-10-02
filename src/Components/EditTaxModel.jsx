import { useState, useEffect } from "react";
import { useAppContext } from "../Context/AppContext";
import { useLocation, useParams } from "react-router-dom";
import { putData } from "../Services/apiCalls";

import Modal from "@mui/material/Modal";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditTaxModel = ({ data }) => {
  const { userData } = useAppContext();
  const [open, setOpen] = useState(false);
  const [billNumber, setBillNumber] = useState(data?.billNumber);
  const [taxPercentage, setTaxPercentage] = useState(data?.taxPercentage);
  const [discountPercentage, setDiscountPercentage] = useState(data?.discountPercentage);
  const [amount, setAmount] = useState(data?.amount);
  const handleOpenModal = () => {
    if (userData.role !== "admin") {
      return toast.error("غير مسموح لك بالتعديل");
    }
    setOpen(true);
  };

  const handleEdit = async () => {}

  return (
    <>
      <button onClick={handleOpenModal} className="bg-navyColor hover:bg-[#234863] duration-200 text-white py-2 px-8 rounded-xl">
        <i className="fa-solid fa-pen-to-square"></i>
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-white p-4 sm:p-12 rounded-xl w-[300px] sm:w-[450px] md:w-[550px]">
            <div className={`flex items-center justify-end mb-4`}>
              <button onClick={() => setOpen(false)}>
                <i className="fa-solid fa-x text-2xl text-[#a3aab5] hover:text-black duration-300 cursor-pointer"></i>
              </button>
            </div>
            <div className="flex flex-col gap-3 text-right mb-6">
              <label className="font-medium text-lg" htmlFor="weight">
                رقم الفاتورة
              </label>
              <input value={billNumber} onChange={(e) => setBillNumber(e.target.value)} className="bg-greyColor p-2 outline-none rounded-lg text-lg w-full text-right" type="number" id="payed" />
            </div>
            <div className="flex flex-col gap-3 text-right mb-6">
              <label className="font-medium text-lg" htmlFor="weight">
                نسبة الضريبة
              </label>
              <input value={taxPercentage} onChange={(e) => setTaxPercentage(e.target.value)} className="bg-greyColor p-2 outline-none rounded-lg text-lg w-full text-right" type="number" id="payed" />
            </div>
            <div className="flex flex-col gap-3 text-right mb-6">
              <label className="font-medium text-lg" htmlFor="weight">
                نسبة الخصم
              </label>
              <input value={discountPercentage} onChange={(e) => setDiscountPercentage(e.target.value)} className="bg-greyColor p-2 outline-none rounded-lg text-lg w-full text-right" type="number" id="payed" />
            </div>
            <div className="flex flex-col gap-3 text-right mb-6">
              <label className="font-medium text-lg" htmlFor="weight">
                المبلغ
              </label>
              <input value={amount} onChange={(e) => setAmount(e.target.value)} className="bg-greyColor p-2 outline-none rounded-lg text-lg w-full text-right" type="number" id="payed" />
            </div>
            <div className="flex justify-center">
              <button onClick={handleEdit} className="bg-navyColor hover:bg-[#234863] duration-200 text-white text-xl py-3 px-8 rounded-lg">
                حفظ
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditTaxModel;
