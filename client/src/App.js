// import logo from './logo.svg';
import "./App.css";
import Graph from "./components/Graph";
import Labels from "./components/Labels";
import Form from "./components/Form";
import Calculator from "./components/Calc/Calculator";

import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
function App() {
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
                <div className="grid md:grid-cols-2 gap-4">
                  <Graph />
                  <Form />
                </div>
              }
            />
            <Route path="/login" element={<></>} />
            <Route path="/calc" element={<Calculator />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
