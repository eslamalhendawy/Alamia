import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAppContext } from "./Context/AppContext";
import { useEffect } from "react";
import { getData } from "./Services/apiCalls";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Onboarding from "./Pages/Onboarding";
import Login from "./Pages/Login";
import HomePage from "./Pages/HomePage";
import SideMenu from "./Components/SideMenu";
import ManageStock from "./Pages/ManageStock";
import NotAuthorized from "./Pages/NotAuthorized";

function App() {
  const loggedIn = Boolean(localStorage.getItem("token"));
  const { setUserData } = useAppContext();

  useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem("token");
      const fetchUserData = async () => {
        const response = await getData("users", token);
        console.log(response);
        if (response.data) {
          setUserData({
            loggedIn: true,
            name: response.data.name,
            email: response.data.email,
            role: response.data.role,
          });
        } else {
          setUserData({});
          localStorage.removeItem("token");
        }
      };
      fetchUserData();
    }
  }, []);

  return (
    <>
      <Router>
        <main className={loggedIn ? "flex lg:gap-[40px] bg-greyColor" : ""}>
          {loggedIn && <SideMenu />}
          <Routes>
            <Route path="/" element={loggedIn ? <HomePage /> : <Onboarding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/manage-stock" element={<ManageStock />} />
          </Routes>
        </main>
      </Router>
      <ToastContainer autoClose={2000} theme="dark" newestOnTop={true} />
    </>
  );
}

export default App;
