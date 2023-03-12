import React from "react";
import Menu from "../../Components/Menu";
import Welcome from "./components/Welcome";
import Functions from "./components/Functions";
import About from "./components/About";
import Advantages from "./components/Advantages";
import Guide from "./components/Guide";

function Main() {
  return (
    <div className="content">
      <Menu />
      <Welcome />
      <Functions />
      <About />
      <Advantages />
      <Guide />
    </div>
  );
}

export default Main;
