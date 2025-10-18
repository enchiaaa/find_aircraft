import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { IconContext } from "react-icons";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <IconContext.Provider value={{ size: 20 }}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </IconContext.Provider>,
);


