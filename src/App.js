import axios from "axios";
import "./App.css";
import RouterConfig from "./navigations/RouterConfig";
import { AXIOS_URL } from "./constants/constant";
import { ToastContainer } from "react-toastify";

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
