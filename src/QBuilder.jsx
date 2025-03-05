import profileImg from "./assets/profile-user.png";
import './QBuilder.css'
import { useState } from "react";

function QBuilder(props){
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
          <div className="query-section">
            <h2>Build Your Query</h2>
            <div className="query-box">
              <label htmlFor="queryInput">What can I help with?</label>
              <textarea
                id="queryInput"
                placeholder="Students with CGPA greater than 8.0"
                maxLength={50}
              ></textarea>
              <button onClick={()=>props.setRoute("QResult")}>Run Query</button>
            </div>
          </div>
        </main>
      </div>

      {/* Profile Icon */}
      
    </div>
    );
}

export default QBuilder