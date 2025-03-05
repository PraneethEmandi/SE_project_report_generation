import React from "react";
import "./App.css";
import QBuilder from "./QBuilder.jsx";
import QResults from "./QResults.jsx";
import { useState } from "react";

const App = () => {
  const [route,setRoute]=useState("QBuilder");

    if(route==="QBuilder") return <QBuilder setRoute={setRoute}/>
    else if(route === "QResult") return <QResults/>
};

export default App;
