import trucksJSON from "/assets/data/trucks.json" assert { type: "json" };
const trucks = trucksJSON.trucks;

const test = Object.keys(trucks);
console.log(test.length);
console.log(test[0]);

// the following does not return the key for the object value IE 801: {object} ... 801 is lost
// Object.values(trucks).forEach(truck => console.log(truck))

// for (let count = 0; count < trucks.length)

// const truckCard = document.createElement("div")
// truckCard.innerHTML = `
// <div id="truckCard${count}"></div>
// `

// gets key of each truck object and iterates on each truck object using the key name

Object.keys(trucks).forEach((truckKey) => {
  console.log(truckKey);
  console.log(trucks[truckKey]);

  const truckCard = document.createElement("div");
  truckCard.id = `truckCard${truckKey}`
  truckCard.classList.add("truckCard");

  truckCard.innerHTML = `
    <h1>${trucks[truckKey].name}</h1>
    <img src="${trucks[truckKey].images[0]}">
    <p>${trucks[truckKey].description}</p>
    <p>Used For</p>
    <ul>
    ${trucks[truckKey].usedFor ? trucks[truckKey].usedFor.map(usedFor => `<li>${usedFor}</li>`).join('') : ""}
    </ul>
  `;
  document.getElementById("truckCardsContainer").append(truckCard);
});


