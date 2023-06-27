import axios from "axios";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { AXIOS_URL } from "./constants/constant";
import RouterConfig from "./navigations/RouterConfig";

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
