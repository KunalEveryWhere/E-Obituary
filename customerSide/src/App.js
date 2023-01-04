import 'react-quill/dist/quill.snow.css';
import './index.css';

import React, { useState, useEffect } from 'react'

import Home from "./routes/home";
import PageNotFound from "./routes/pagenotfound";
import GeneratedSite from "./routes/generatedSite";

import Loader from "./components/loader";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { HelmetProvider } from 'react-helmet-async';

function App() {

  const [loading, setLoading] = useState(false);




    useEffect(() => {
      setLoading(true);

      setLoading(false);
    }, [])

  return (
    <React.Fragment>
      <HelmetProvider>
      {loading ? <Loader /> : ''}
      <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/:uuid" element={<GeneratedSite />} />
                

                {/* 404 - Page Not Found */}
                <Route path='/*' element={<PageNotFound />} />
              </Routes>
        </BrowserRouter>
        </HelmetProvider>
    </React.Fragment>
  );
}

export default App;
