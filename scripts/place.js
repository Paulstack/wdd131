// Footer year and last modified
const year = document.getElementById('year');
const lastModified = document.getElementById('lastModified');
if (year) year.textContent = new Date().getFullYear();
if (lastModified) lastModified.textContent = document.lastModified;

// Static weather values
const tempElement = document.getElementById('temp');
const speedElement = document.getElementById('speed');
const chillElement = document.getElementById('chill');

if (tempElement && speedElement && chillElement) {
  const temp = parseFloat(tempElement.textContent);
  const speed = parseFloat(speedElement.textContent);

  // Wind Chill Calculation
  function calculateWindChill(t, s) {
    return (
      35.74 +
      0.6215 * t -
      35.75 * Math.pow(s, 0.16) +
      0.4275 * t * Math.pow(s, 0.16)
    ).toFixed(1);
  }

  if (!isNaN(temp) && !isNaN(speed) && temp <= 50 && speed > 3) {
    chillElement.textContent = `${calculateWindChill(temp, speed)} °F`;
  } else {
    chillElement.textContent = "N/A";
  }
}