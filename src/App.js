import "./App.css";
import { Routes, Route } from "react-router-dom";
import Services from "./Components/Services";
import Store from "./Components/Store";
import Users from "./Components/Users";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Store />} />
        <Route path="services" element={<Services />} />
        <Route path="Users" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
