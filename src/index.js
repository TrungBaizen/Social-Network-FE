import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import {Provider} from "react-redux";
import store from "./redux/store/Store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
            <ToastContainer/>
        </BrowserRouter>
    </Provider>
);
