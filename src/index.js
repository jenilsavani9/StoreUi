import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import './index.css';
// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
// state context 
import reducer, { initialState } from './contexts/Reducer';
import { StateProvider } from './contexts/StateProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <StateProvider initialState={initialState} reducer={reducer}>
            <App />
        </StateProvider>
    </BrowserRouter>
);


