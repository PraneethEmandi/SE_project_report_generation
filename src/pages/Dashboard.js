import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Dashboard.css";

// Import images correctly
import chartIcon from "../chart-icon.png";
import graphIcon from "../graph-icon.png";
import vIcon from "../gpatrends-icon.png";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="dashboard">
        <aside className="sidebar">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/reports">Reports</Link>
            <Link to="/query-builder">Query Builder</Link>
            <Link to="/placement-data">Placement Data</Link>
            <Link to="/events-data">Events Data</Link>
            <Link to="/admin-data">Administration Data</Link>
          </nav>
        </aside>

        <main className="main-content">
          <div className="stats-container">
            <div className="stats-box">Total Placements: 120</div>
            <div className="stats-box">Event Participation: 300</div>
            <div className="stats-box">GPA Trends: 3.5</div>
          </div>

          <div className="charts-container">
            <div className="chart-box">
              <img src={chartIcon} alt="Placement Trends" />
              <p>Placement Trends</p>
            </div>
            <div className="chart-box">
              <img src={graphIcon} alt="Event Participation" />
              <p>Event Participation</p>
            </div>
            <div className="chart-box">
              <img src={vIcon} alt="GPA Distribution" />
              <p>GPA Distribution</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
