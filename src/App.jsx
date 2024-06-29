import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAppContext } from "./Context/AppContext";
import { useEffect } from "react";
import { getData } from "./Services/apiCalls";

import Onboarding from "./Pages/Onboarding";

function App() {
  const loggedIn = Boolean(localStorage.getItem("token"));
  const { setUserData } = useAppContext();

  return (
    <>
     <Router>
        <Routes>
          <Route path="/" element={<Onboarding />} />
        </Routes>
     </Router>   
    </>
  )
}

export default App
