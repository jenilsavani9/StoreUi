import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
// state context 
import { StateProvider }from './Components/Context/StateProvider';
import reducer, { initialState } from './Components/Context/Reducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <StateProvider initialState={initialState} reducer={reducer}>
            <App />
        </StateProvider>
    </BrowserRouter>
);


