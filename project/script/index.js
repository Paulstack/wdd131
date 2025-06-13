// index.js

// Array of farming tips
const farmingTips = [
  "Water crops early in the morning to reduce evaporation.",
  "Use organic compost to enrich your soil naturally.",
  "Rotate your crops each season to avoid depleting soil nutrients.",
  "Introduce beneficial insects like ladybugs to control pests.",
  "Mulch your plants to retain moisture and control weeds.",
  "Keep tools clean to avoid spreading plant diseases."
];

// Display random farming tip using template literal
const tipElement = document.getElementById("tip");
const randomIndex = Math.floor(Math.random() * farmingTips.length);
const tip = farmingTips[randomIndex];
tipElement.textContent = ` Tip of the Day: ${tip}`;

// Save and display last visit using localStorage
const welcomeElement = document.getElementById("welcome");
const lastVisit = localStorage.getItem("lastVisit");

if (lastVisit) {
  welcomeElement.textContent = `Welcome back! You last visited on ${lastVisit}`;
} else {  welcomeElement.textContent = " Welcome to Green Harvest Network!";
}

localStorage.setItem("lastVisit", new Date().toLocaleString());