import React from 'react';
//import { StrictMode } from 'react';
//import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import NuevoVideo from './pages/NuevoVideo';
import GlobalContextProvider from './Context/GlobalContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/nuevo-video" element={<NuevoVideo />} />
      </Routes>
    </BrowserRouter>
    </GlobalContextProvider>
  </React.StrictMode>
);



