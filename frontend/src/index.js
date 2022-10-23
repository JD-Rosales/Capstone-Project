import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./app/store"
import { Provider } from 'react-redux';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
        <BrowserRouter>
          <Provider store={store}>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
            
            <ToastContainer
                position="top-right"
                autoClose={2000}
                limit={5}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
                theme="dark"
              />
          </Provider>
        </BrowserRouter>
  </React.StrictMode>
);