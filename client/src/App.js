// import logo from './logo.svg';
import "./App.css";
import Graph from "./components/Graph";
import Login from "./components/Login";
import Form from "./components/Form";
import Calculator from "./components/Calculator";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";

function App() {
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem("userEmail") || ""
  );
  const Logout = () => {
    localStorage.setItem("userEmail", "");
    setUserEmail("");
  };

  const RequireAuth = ({ children }) => {
    console.log("here 1-App()-RequrieAuth", userEmail);
    if (userEmail == "") {
      return <Login passUserEmail={setUserEmail} />;
    }
    console.log("here 2-App()-RequrieAuth", userEmail);
    return children;
  };
  return (
    <BrowserRouter>
      <div className="App">
        <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
          <h1 className="text-4xl py-8 mb-10 bg-slate-800 text-white rounded">
            Expense Tracker
          </h1>

          {/* grid columns */}
          <Routes>
            <Route
              index
              element={
                <RequireAuth>
                  <p>Welcome, {userEmail}</p>
                  <button className="button" onClick={Logout}>
                    Logout
                  </button>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Graph />
                    <Form />
                  </div>
                </RequireAuth>
              }
            />
            <Route path="/login" element={<></>} />
            <Route path="/calculator" element={<Calculator />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
