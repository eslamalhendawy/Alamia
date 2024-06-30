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

function App() {
  const loggedIn = Boolean(localStorage.getItem("token"));
  const { setUserData } = useAppContext();

  useEffect(() => {
    if (loggedIn) {
      setUserData({
        loggedIn: true,
        name: "Eslam",
        email: "eslammoh16@outlook.com",
        phone: "01000000000",
        avatar: "https://avatars.githubusercontent.com/u/47273077?v=4",
        role: "admin",
      });
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
