import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Page";
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import Register from "./pages/Register/Page";
import View from "./pages/View/Page";

const App: React.FC = () => {
    return (
        <>
            <ToastContainer theme="colored" closeOnClick autoClose={5000} />
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/cadastro" element={<Register />} />
                        <Route path="/empresa/:id" element={<View />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </>
    );
};

export default App;
