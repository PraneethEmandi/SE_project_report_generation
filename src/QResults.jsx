import profileImg from "./assets/profile-user.png";
import barchartImg from "./assets/download.png";
import './QResult.css';
import { useState } from "react";

function QResults(props) {
    const [logoutVisibility, setLogoutVisibility] = useState(false);

  return (
    <div className="container">
      <div className="platform">
        <h2>Student Platform</h2>
        <div className="profile">
            <img src={profileImg} alt="Profile" id="userimage" onClick={()=>setLogoutVisibility(!logoutVisibility)}/>
            <button className="logout" style={{visibility:`${logoutVisibility?"visible":"hidden"}`}}>logout</button>
        </div>
      </div>

      <div className="content-container">
        <aside className="sidebar">
          <ul>
            <li>Home</li>
            <li>Reports</li>
            <li>Query Builder</li>
            <li>Placement Data</li>
            <li>Events Data</li>
            <li>Administration Data</li>
          </ul>
        </aside>

        <main className="content">
          <h2>Query Results</h2>
          <div className="charts">
            {/* Placeholder for Bar Chart Image */}
            <div className="chart-placeholder">
              <img src={barchartImg} alt="Bar Chart" className="chart-image" />
            </div>
          </div>

          <div className="export-buttons">
            <button>Export as PDF</button>
            <button>Export as Excel</button>
            <button>Export as PNG</button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default QResults;

