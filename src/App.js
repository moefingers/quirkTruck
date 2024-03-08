import React, { useEffect, useState } from "react";
import TruckCard from "./components/TruckCard";
import "./css/style1.css";
import trucksJSON from "./data/trucks"
const trucks = trucksJSON.trucks;





function App() {
  let [truckQuery, setTruckQuery] = useState("");

  let [expandedTruck, setExpandedTruck] = useState("");

  return (
    <div className="App">
      <header>
        <h1>Click a <span className="truckTitle unselected-title">Title</span> to expand or collapse</h1>
      </header>
      <main>
        <div className="search">
          <input onChange={(e) => setTruckQuery(e.target.value)} type="text" placeholder="Search Trucks..."></input>
        </div>
        <div id="truckCardsContainer">

          {Object.keys(trucks).map((truckKey) => (
            <TruckCard
              key={truckKey}

              truckQuery={truckQuery}
              truckKey={truckKey}

              expandedTruck={expandedTruck}
              setExpandedTruck={setExpandedTruck}

              truckObject={trucks[truckKey]}
            />
          ))}

        </div>
      </main>
    </div>
  );
}

export default App;
