import { useState } from "react";
import { postData } from "../Services/apiCalls";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import image from "/assets/addEmployeeBG.png";
import logo from "/assets/addEmployeeLogo.png";

const AddEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [role, setRole] = useState("");

  const regEmail = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

  const handleClick = async () => {
    if(!name || !email || !password || !passwordConfirm || !role) {
      toast.error("برجاء ملئ جميع الحقول");
      return;
    }
    if(!regEmail.test(email)) {
      toast.error("برجاء ادخال بريد الكتروني صحيح");
      return;
    }
    if(password !== passwordConfirm) {
      toast.error("كلمة المرور غير متطابقة");
      return;
    }
    toast.info("جاري اضافة الموظف");
    const response = await postData("auth/signup", { name, email, password, passwordConfirm, role });
    if(response.token){
      toast.success("تم اضافة الموظف بنجاح");
      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
      setRole("");
    }else{
      toast.error("حدث خطأ ما");
    }
  };

  return (
    <section className="grow py-6 px-4 flex items-center justify-center minHeight">
      <div className="bg-cover bg-center p-4 w-full xl:w-[70%] 2xl:w-[50%] flex flex-col items-center gap-4" style={{ backgroundImage: `url(${image})` }}>
        <div>
          <img src={logo} alt="" />
        </div>
        <div className="flex flex-row-reverse w-full lg:w-[70%] 2xl:w-[60%] rounded-xl overflow-hidden">
          <div className="bg-[#f3f3f3] py-3 w-[30px] md:w-[50px] flex justify-center items-center text-lg text-lightGreen">
            <i className="fa-solid fa-users"></i>
          </div>
          <input value={name} onChange={(e) => setName(e.target.value)} className="grow px-2 outline-none text-lg text-right" type="text" placeholder="الاسم" />
        </div>
        <div className="flex flex-row-reverse w-full lg:w-[70%] 2xl:w-[60%] rounded-xl overflow-hidden">
          <div className="bg-[#f3f3f3] py-3 w-[30px] md:w-[50px] flex justify-center items-center text-lg text-lightGreen">
            <i className="fa-solid fa-envelope"></i>
          </div>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="grow px-2 outline-none text-lg text-right" type="text" placeholder="الايميل" />
        </div>
        <div className="flex flex-row-reverse w-full lg:w-[70%] 2xl:w-[60%] rounded-xl overflow-hidden">
          <div className="bg-[#f3f3f3] py-3 w-[30px] md:w-[50px] flex justify-center items-center text-lg text-lightGreen">
            <i className="fa-solid fa-users"></i>
          </div>
          <input value={role} onChange={(e) => setRole(e.target.value)} className="grow px-2 outline-none text-lg text-right" type="text" placeholder="الصلاحية" />
        </div>
        <div className="flex flex-row-reverse w-full lg:w-[70%] 2xl:w-[60%] rounded-xl overflow-hidden">
          <div className="bg-[#f3f3f3] py-3 w-[30px] md:w-[50px] flex justify-center items-center text-lg text-lightGreen">
            <i className="fa-solid fa-lock"></i>
          </div>
          <input value={password} onChange={(e) => setPassword(e.target.value)} className="grow px-2 outline-none text-lg text-right" type="password" placeholder="كلمة المرور" />
        </div>
        <div className="flex flex-row-reverse w-full lg:w-[70%] 2xl:w-[60%] rounded-xl overflow-hidden mb-8">
          <div className="bg-[#f3f3f3] py-3 w-[30px] md:w-[50px] flex justify-center items-center text-lg text-lightGreen">
            <i className="fa-solid fa-lock"></i>
          </div>
          <input value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} className="grow px-2 outline-none text-lg text-right" type="password" placeholder="تأكيد كلمة المرور" />
        </div>
        <button onClick={handleClick} className="text-white outline-none hover:text-lightGreen hover:text-greenColor hover:bg-white duration-200 text-medium text-lg border-[3px] border-white py-2 px-12 rounded-lg">
          تسجيل
        </button>
      </div>
    </section>
  );
};

export default AddEmployee;
