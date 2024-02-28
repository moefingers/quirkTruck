import trucksJSON from "/assets/data/trucks.json" assert { type: "json" };
const trucks = trucksJSON.trucks;

let page = {
    expandedTruck: "",
};

function renderCards(truckKeyArray) {
document.getElementById("truckCardsContainer").innerHTML = "";
  truckKeyArray.forEach((truckKey) => {

    // create card 
    const truckCard = document.createElement("div");
    truckCard.id = `truckCard${truckKey}`;
    truckCard.classList.add("truckCard");

    // card content
    truckCard.innerHTML = `
        <h1>${trucks[truckKey].name}</h1>
        <img src="${trucks[truckKey].images[0]}">
        <p>${trucks[truckKey].description}</p>
        <p>Used For</p>
        <ul>
        ${
        trucks[truckKey].usedFor
            ? trucks[truckKey].usedFor
                .map((usedFor) => `<li>${usedFor}</li>`)
                .join("")
            : ""
        }
        </ul>
    `;
    // expanded contents (not appended by default)
    let expandedContents = document.createElement("div")
    expandedContents.classList = "expandedContents hidden"
    expandedContents.innerHTML = `
    ${
        trucks[truckKey].preTrip
            ? `<h2>Pre Trip</h2>
            <ul>
            ${Object.values(trucks[truckKey].preTrip)
                .map((preTrip) => `<li>${preTrip}</li>`)
                .join("")}
            </ul>`
            : ""
    }
    `
    truckCard.appendChild(expandedContents);


    // expand button
    const expandButton = document.createElement("button")
    expandButton.textContent = "Expand"
    expandButton.addEventListener("click", () => {
        if (page.expandedTruck == truckKey) { //already expanded this truck, so collapse and remove status
            page.expandedTruck = ""
            document.getElementById(`truckCard${truckKey}`).classList.remove("expanded")
            document.querySelector(`#truckCard${truckKey} .expandedContents`).classList.add("hidden")
            expandButton.textContent = "Expand"
            page.expandedTruck = ""
        } else if (page.expandedTruck != truckKey) { //if toggling different than self, expand
            if (page.expandedTruck != "") { // if different than self exists, collapse that one
                document.getElementById(`truckCard${page.expandedTruck}`).classList.remove("expanded")
                document.querySelector(`#truckCard${page.expandedTruck} button`).textContent = "Expand"
                document.querySelector(`#truckCard${page.expandedTruck} .expandedContents`).classList.add("hidden")
            } 
            // then expand this one
            document.getElementById(`truckCard${truckKey}`).classList.add("expanded")
            expandButton.textContent = "Collapse"
            document.querySelector(`#truckCard${truckKey} .expandedContents`).classList.remove("hidden")
            page.expandedTruck = truckKey
        }
        page.expanded = truckKey
    })
    truckCard.append(expandButton)


    // append finished card
    document.getElementById("truckCardsContainer").append(truckCard);
  });
}


//search on change event
document.getElementById("inputSearch").addEventListener("input", (e) => {
  let query = e.target.value.toLowerCase()
  let keyList = Object.keys(trucks);

  const filteredTrucks = keyList.filter((key) => {
    return trucks[key].name.toLowerCase().includes(query) // returns true or false if contains or not
  })
  renderCards(filteredTrucks);
})
renderCards(Object.keys(trucks));