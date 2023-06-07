import axios from "axios";
import "./App.css";
import RouterConfig from "./navigations/RouterConfig";
import { AXIOS_URL } from "./constants/constant";

function App() {

    axios.defaults.baseURL = AXIOS_URL;

    return (
        <div className="App">
            <RouterConfig />
        </div>
    );
}

export default App;
