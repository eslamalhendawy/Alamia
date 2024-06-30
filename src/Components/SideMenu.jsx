import { useState, useEffect } from "react";
import { useAppContext } from "../Context/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

import MobileSideMenu from "./MobileSideMenu";

const linksList = [
  {
    title: "ادارة المخزون",
    url: "/manage-stock",
  },
  {
    title: "فواتير",
    url: "/bills",
  },
  {
    title: "عملاء",
    url: "/clients",
  },
  {
    title: "موردين",
    url: "/suppliers",
  },
];

const SideMenu = () => {
  const { userData, setUserData } = useAppContext();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const navigate = useNavigate();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const handleLogout = () => {
    setUserData({});
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <aside className="h-screen sticky top-0 left-0 hidden lg:flex flex-col">
        <div className="bg-darkGreen px-16 py-6 rounded-tr-xl ">
          <div className="mb-4">
            <img className="size-[80px] rounded-full " src={userData.avatar} alt="" />
          </div>
          <h5 className="text-white text-xl text-center font-medium">{userData.name}</h5>
        </div>
        <div className="grow bg-navyColor flex flex-col justify-between rounded-br-xl">
          <ul className="  rounded-br-xl pt-8 flex flex-col gap-4">
            {linksList.map((link, index) => (
              <Link to={link.url} key={index} className={activeLink === link.url ? "py-2 px-8 bg-greyColor text-navyColor text-center font-medium rounded-2xl w-[80%] mx-auto text-lg" : "py-2 px-8 hover:bg-greyColor text-goldColor text-lg hover:text-navyColor text-center font-medium rounded-2xl w-[80%] mx-auto"}>
                <li>{link.title}</li>
              </Link>
            ))}
          </ul>
          <div className="text-center py-9">
            <button onClick={handleLogout} className="border-2 border-white px-6 py-2 text-white hover:text-navyColor hover:bg-white duration-200 rounded-lg text-lg font-medium">
              تسجيل الخروج
            </button>
          </div>
        </div>
      </aside>
      <MobileSideMenu />
    </>
  );
};

export default SideMenu;
