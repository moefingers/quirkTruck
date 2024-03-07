import trucksJSON from "../data/trucks.json" assert { type: "json" };
const trucks = trucksJSON.trucks;
import "./css/style1.css";

import TruckCard from "./components/TruckCard";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Let's get quirky</h1>
      </header>
      <main>
        <div class="search">
          <input type="text" id="inputSearch" placeholder="Search..."></input>
        </div>
        <div id="truckCardsContainer">

        </div>
      </main>
    </div>
  );
}

export default App;
