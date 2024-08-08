import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import {Provider} from "react-redux";
import store from "./redux/store/Store";
import {DarkModeContextProvider} from "./context/darkModeContext";
import {AuthContextProvider} from "./context/authContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <DarkModeContextProvider>
            <AuthContextProvider>

                <App/>
                <ToastContainer/>
            </AuthContextProvider>
        </DarkModeContextProvider>
    </Provider>
);
