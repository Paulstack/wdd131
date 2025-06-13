// membership.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("membership-form");
  const successMessage = document.getElementById("success-message");

    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent actual form submission

      // Get form values
      const fullName = document.getElementById("fullName").value.trim();
      const email = document.getElementById("email").value.trim();
      const location = document.getElementById("location").value.trim();

      // Conditional branching for validation
      if (!fullName || !email || !location) {
        successMessage.style.color = "red";
        successMessage.textContent = "Please fill in all fields.";
        return;
      }

      // Create object to store user input
      const newMember = {
        name: fullName,
        email: email,
        location: location,
        joined: new Date().toISOString()
      };

      // Store to localStorage
      let members = JSON.parse(localStorage.getItem("members")) || [];
      members.push(newMember);
      localStorage.setItem("members", JSON.stringify(members));

      // Output success message using template literal
      successMessage.style.color = "green";
      successMessage.textContent = `Thank you, ${fullName}, for joining Green Harvest Network!`;

      // Reset form
      form.reset();
    });});