import trucksJSON from "../data/trucks.json" assert { type: "json" };
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
        ${trucks[truckKey].images ? trucks[truckKey].images.map((image) => `<img src="${image}">`).join("") : ""}
        <p>${trucks[truckKey].description}</p>
        <p>Used For</p>
        <ul>
        ${
        trucks[truckKey].usedFor
            ? trucks[truckKey].usedFor
                .map((usedFor) => `<li class="badge">${usedFor}</li>`)
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
            <div class="preTripSection">
            ${
                Object.keys(trucks[truckKey].preTrip)
                .filter((preTripKey) => {return preTripKey != "lights"})
                .map((preTripKey) => 
                    `<strong>${trucks[truckKey].preTrip[preTripKey].name}</strong>` +
                    `${
                        trucks[truckKey].preTrip[preTripKey].images
                        ?  trucks[truckKey].preTrip[preTripKey].images.map((image) => `<img src="${image}">`).join("")
                        : ""
                    }` +
                    Object.keys(trucks[truckKey].preTrip[preTripKey])
                    .filter((preTripKey) => {return preTripKey != "name" && preTripKey != "images" })
                    .map((preTripItemKey) =>
                        `${trucks[truckKey].preTrip[preTripKey][preTripItemKey]}`)
                    .join("|")
                    )
                    
                .join("<br>") + 
                `<div class="lightsSection">
                <strong>Lights</strong>
                <br>
                ${
                    Object.keys(trucks[truckKey].preTrip.lights)
                    .filter((lightsKey) => {return lightsKey != "name"})
                    .map((lightsItemKey) =>
                        `${
                            trucks[truckKey].preTrip.lights[lightsItemKey].name
                            + trucks[truckKey].preTrip.lights[lightsItemKey].images.map((image) => `<img src="${image}">`).join("")
                            + trucks[truckKey].preTrip.lights[lightsItemKey].notes
                        }`
                    ).join("<br>")

                }
                <div>`
            }
            </div>
            `
            : ""
    }
    ${
        trucks[truckKey].postTrip
            ? `<h2>Post Trip</h2>
            <div class="postTripSection">
            ${
                Object.keys(trucks[truckKey].postTrip)
                .filter((postTripKey) => {return postTripKey != "lights"})
                .map((postTripKey) => 
                    `<strong>${trucks[truckKey].postTrip[postTripKey].name}</strong>` +
                    `${
                        trucks[truckKey].postTrip[postTripKey].images
                        ?  trucks[truckKey].postTrip[postTripKey].images.map((image) => `<img src="${image}">`).join("")
                        : ""
                    }` +
                    Object.keys(trucks[truckKey].postTrip[postTripKey])
                    .filter((postTripKey) => {return postTripKey != "name" && postTripKey != "images"})
                    .map((postTripItemKey) =>
                        `${trucks[truckKey].postTrip[postTripKey][postTripItemKey]}`)
                    .join("|")
                    )
                    
                .join("<br>")
            }
            </div>
            `
            : ""
    }
    ${
        trucks[truckKey].quirks
            ? `<h2>Quirks</h2>
            <div class="quirksSection">
            ${
                Object.keys(trucks[truckKey].quirks)
                .map((quirksKey) => 
                    `<strong>${trucks[truckKey].quirks[quirksKey].name}</strong>` +
                    `${
                        trucks[truckKey].quirks[quirksKey].images
                        ?  trucks[truckKey].quirks[quirksKey].images.map((image) => `<img src="${image}">`).join("")
                        : ""
                    }` +
                    Object.keys(trucks[truckKey].quirks[quirksKey])
                    .filter((quirksKey) => {return quirksKey != "name" && quirksKey != "images" && quirksKey != "tags" })
                    .map((quirksItemKey) =>
                        `${trucks[truckKey].quirks[quirksKey][quirksItemKey]}`)
                    .join("|")  + "<br>" +
                    `${trucks[truckKey].quirks[quirksKey].tags.includes("operation") ? "<li class='quirkTag'>Affects <strong>operation</strong>.</li>" : ""}` +
                    `${trucks[truckKey].quirks[quirksKey].tags.includes("prevention") ? "<li class='quirkTag'>Prevents <strong>damage</strong> to equipment.</li>" : ""}` +
                    `${trucks[truckKey].quirks[quirksKey].tags.includes("safety") ? "<li class='quirkTag'><strong>Safety Warning</strong></li>" : ""}`

                    )
                    
                .join("<br>")
            }
            </div>
            `
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