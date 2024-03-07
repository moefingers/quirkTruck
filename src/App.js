import React, { useEffect, useState } from "react";
import TruckCard from "./components/TruckCard";
import "./css/style1.css";
import trucksJSON from "./data/trucks"
const trucks = trucksJSON.trucks;





function App() {
  let [truckQuery, setTruckQuery] = useState("");

  let [expandedTruck, setExpandedTruck] = useState("");

  useEffect(() => {
    console.log(expandedTruck)
  }, [expandedTruck]);

  return (
    <div className="App">
      <header>
        <h1>Click a <span className="truckTitle unselected-title">Title</span> to expand or collapse</h1>
      </header>
      <main>
        <div className="search">
          <input onChange={(e) => setTruckQuery(e.target.value)} type="text" placeholder="Search..."></input>
        </div>
        <div id="truckCardsContainer">

          {Object.keys(trucks).map((truckKey) => (
            <TruckCard
              truckQuery={truckQuery}
              key={truckKey}
              truckKey={truckKey}
              truckObject={trucks[truckKey]}
              name={trucks[truckKey].name}
              images={trucks[truckKey].images}
              description={trucks[truckKey].description}
              usedFor={trucks[truckKey].usedFor}

              expandedTruck={expandedTruck}
              setExpandedTruck={setExpandedTruck}
            />
          ))}

        </div>
      </main>
    </div>
  );
}

export default App;
