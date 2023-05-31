import "./App.css";
import { Routes, Route } from "react-router-dom";
import Services from "./Components/Services";
import Store from "./Components/Store";
import Users from "./Components/Users";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Components/Login";



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<><Navbar /></>}>
          <Route path="/" element={<Store />} />
          <Route path="services" element={<Services />} />
          <Route path="Users" element={<Users />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
