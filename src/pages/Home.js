import React from "react";
import Navbar from "../components/Navbar-home";
import "./Home.css"; 
import chartIcon from "../chart-icon.png";
import graphIcon from "../graph-icon.png";
import vIcon from "../visualization-icon.png";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home-container">
        <h1>Welcome to the Student Reporting and Visualization Platform</h1>
        <p>Dynamic reports and insights at your fingertips.</p>
        
        <div className="features">
          <div className="feature">
          <img src={chartIcon} alt="Charts" />
            <h3>Sample Charts</h3>
            <p>Visualize data effortlessly with interactive charts.</p>
          </div>
          <div className="feature">
            <img src={graphIcon} alt="Graphs" />
            <h3>Sample Graphs</h3>
            <p>Discover actionable insights through dynamic graphs.</p>
          </div>
          <div className="feature">
            <img src={vIcon} alt="Visualization" />
            <h3>Visualization</h3>
            <p>Transform complex data into clear insights.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
