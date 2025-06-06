document.addEventListener("DOMContentLoaded", () => {
    const yearSpan = document.getElementById("currentyear");
    const lastModParagraph = document.getElementById("lastmodified"); // Fixed ID

    const today = new Date();
    yearSpan.textContent = today.getFullYear();

    lastModParagraph.textContent = `Last modified: ${document.lastModified}`; // Fixed template literal
});