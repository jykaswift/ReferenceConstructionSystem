import React from "react";
import Menu from "../Components/Menu";
import Welcome from "./main/components/Welcome";
import Functions from "./main/components/Functions";
import About from "./main/components/About";
import Advantages from "./main/components/Advantages";
import Guide from "./main/components/Guide";

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
