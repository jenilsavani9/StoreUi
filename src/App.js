import { ToastContainer } from "react-toastify";
import axios from "axios";
import "./App.css";
import { AXIOS_URL } from "./constants/constant.js";
import RouterConfig from "./routes/RouterConfig.jsx";

function App() {

    axios.defaults.baseURL = AXIOS_URL;

    return (
        <div className="App">
            <ToastContainer />
            <RouterConfig />
        </div>
    );
}

export default App;
