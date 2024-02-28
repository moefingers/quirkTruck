import trucksJSON from "/assets/data/trucks.json" assert { type: "json" };
const trucks = trucksJSON.trucks;

function renderCards(truckKeyArray) {
document.getElementById("truckCardsContainer").innerHTML = "";
  truckKeyArray.forEach((truckKey) => {
    console.log(truckKey);
    console.log(trucks[truckKey]);

    const truckCard = document.createElement("div");
    truckCard.id = `truckCard${truckKey}`;
    truckCard.classList.add("truckCard");

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