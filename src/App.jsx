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
import AddEmployee from "./Pages/AddEmployee";
import Stock from "./Pages/Stock";
import Permissions from "./Pages/Permissions";
import IncomingStockItem from "./Pages/IncomingStockItem";
import Report from "./Pages/Report";
import OutgoingStockItem from "./Pages/OutgoingStockItem";
import Suppliers from "./Pages/Suppliers";
import Clients from "./Pages/Clients";

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
            <Route path="/add-employee" element={<AddEmployee />} />
            <Route path="/stock/view" element={<Stock />} />
            <Route path="/permissions" element={<Permissions />} />
            <Route path="/incoming-stock/:id" element={<IncomingStockItem />} />
            <Route path="/outgoing-stock/:id" element={<OutgoingStockItem />} />
            <Route path="/report" element={<Report />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/clients" element={<Clients />} />
          </Routes>
        </main>
      </Router>
      <ToastContainer autoClose={2000} theme="dark" newestOnTop={true} />
    </>
  );
}

export default App;
