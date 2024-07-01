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
import IncomingStockAdd from "./Pages/IncomingStockAdd";
import IncomingStockReport from "./Pages/IncomingStockReport";
import OutgoingStockAdd from "./Pages/OutgoingStockAdd";
import OutgoingStockReport from "./Pages/OutgoingStockReport";
import NotAuthorized from "./Pages/NotAuthorized";

function App() {
  const loggedIn = Boolean(localStorage.getItem("token"));
  const { setUserData } = useAppContext();

  useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem("token");
      const fetchUserData = async () => {
        const response = await getData("auth/me", token);
        if (response.data) {
          setUserData({
            loggedIn: true,
            name: response.data.name,
            email: response.data.email,
            id: response.data._id,
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
            <Route path="/incoming-stock/add" element={<IncomingStockAdd />} />
            <Route path="/incoming-stock/report" element={<IncomingStockReport />} />
            <Route path="/outgoing-stock/add" element={<OutgoingStockAdd />} />
            <Route path="/outgoing-stock/report" element={<OutgoingStockReport />} />
          </Routes>
        </main>
      </Router>
      <ToastContainer autoClose={2000} theme="dark" newestOnTop={true} />
    </>
  );
}

export default App;
