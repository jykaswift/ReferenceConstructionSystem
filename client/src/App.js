import "./styles/app.scss";
import React from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Main from "./pages/main";
import Find from "./pages/find/find";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/search" element={<Find />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
