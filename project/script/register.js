// Membership data object
const membershipPlans = {
  basic: {
    name: 'Basic',
    price: 50,
    features: ['Access to forums', 'Monthly newsletter', 'Basic resources'],
    color: '#4CAF50'
  },
  premium: {
    name: 'Premium',
    price: 100,
    features: ['All basic features', 'Expert consultations', 'Premium resources', 'Priority support'],
    color: '#2196F3'
  }
};

// Array to store registered members
let registeredMembers = JSON.parse(localStorage.getItem('greenHarvestMembers')) || [];

// Array of tips for random display
const farmingTips = [
  'Rotate your crops to maintain soil health',
  'Use companion planting to naturally repel pests',
  'Test your soil pH regularly for optimal growth',
  'Implement water conservation techniques',
  'Keep detailed records of your farming activities'
];

// DOM elements
const form = document.getElementById('membershipForm');
const successMessage = document.getElementById('successMessage');
const welcomeText = document.getElementById('welcomeText');
const statsContainer = document.getElementById('statsContainer');

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  updateFooterInfo();
  displayRegistrationStats();
  setupFormValidation();
});

// Function to update footer information
function updateFooterInfo() {
  const yearSpan = document.getElementById('currentyear');
  const lastModParagraph = document.getElementById('lastmodified');

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  if (lastModParagraph) {
    lastModParagraph.textContent = `Last modified: ${document.lastModified}`;
  }
}

// Function to validate form data
function validateFormData(formData) {
  const errors = [];

  // Conditional branching for validation
  if (!formData.firstName || formData.firstName.trim().length < 2) {
    errors.push('First name must be at least 2 characters long');
  }

  if (!formData.lastName || formData.lastName.trim().length < 2) {
    errors.push('Last name must be at least 2 characters long');
  }

  if (!formData.email || !isValidEmail(formData.email)) {
    errors.push('Please enter a valid email address');
  }

  if (!formData.membershipType) {
    errors.push('Please select a membership type');
  }

  return errors;
}

// Function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to collect form data
function collectFormData(form) {
  const formData = new FormData(form);
  const data = {};
  
  // Get regular form fields
  for (let [key, value] of formData.entries()) {
    if (key === 'interests') {
      // Handle multiple checkboxes
      if (!data.interests) data.interests = [];
      data.interests.push(value);
    } else {
      data[key] = value;
    }
  }

  // Add timestamp and ID
  data.registrationDate = new Date().toISOString();
  data.id = Date.now().toString();

  return data;
}

// Function to handle form submission
function handleFormSubmission(event) {
  event.preventDefault();
  
  const formData = collectFormData(form);
  const validationErrors = validateFormData(formData);

  // Conditional branching based on validation
  if (validationErrors.length > 0) {
    displayErrors(validationErrors);
    return;
  }

  // Save to localStorage
  registeredMembers.push(formData);
  localStorage.setItem('greenHarvestMembers', JSON.stringify(registeredMembers));

  // Display success message
  displaySuccessMessage(formData);
  
  // Update stats
  displayRegistrationStats();

  // Reset form
  form.reset();
}

// Function to display validation errors
function displayErrors(errors) {
  const errorHtml = errors.map(error => `<p class="error">${error}</p>`).join('');
  
  // Remove existing error messages
  const existingErrors = document.querySelectorAll('.error-container');
  existingErrors.forEach(error => error.remove());

  // Add new error container
  const errorContainer = document.createElement('div');
  errorContainer.className = 'error-container';
  errorContainer.innerHTML = errorHtml;
  
  form.insertBefore(errorContainer, form.firstChild);
}

// Function to display success message
function displaySuccessMessage(memberData) {
  const selectedPlan = membershipPlans[memberData.membershipType];
  const randomTip = getRandomTip();
  
  // Using template literals for string manipulation
  welcomeText.innerHTML = `
    <p>Welcome to Green Harvest Network, ${memberData.firstName} ${memberData.lastName}!</p>
    <p>You've selected the <strong>${selectedPlan.name}</strong> plan ($${selectedPlan.price}/year).</p>
    <p>Registration ID: <strong>${memberData.id}</strong></p>
    <p><em>Tip: ${randomTip}</em></p>
  `;

  form.style.display = 'none';
  successMessage.style.display = 'block';
}

// Function to get random farming tip
function getRandomTip() {
  const randomIndex = Math.floor(Math.random() * farmingTips.length);
  return farmingTips[randomIndex];
}

// Function to display registration statistics
function displayRegistrationStats() {
  const stats = calculateStats();
  
  const statsHtml = `
    <div class="stats-grid">
      <div class="stat-card">
        <h3>${stats.totalMembers}</h3>
        <p>Total Members</p>
      </div>
      <div class="stat-card">
        <h3>${stats.basicMembers}</h3>
        <p>Basic Members</p>
      </div>
      <div class="stat-card">
        <h3>${stats.premiumMembers}</h3>
        <p>Premium Members</p>
      </div>
      <div class="stat-card">
        <h3>$${stats.totalRevenue}</h3>
        <p>Total Revenue</p>
      </div>
    </div>
    <div class="recent-members">
      <h3>Recent Registrations</h3>
      <ul>${stats.recentMembers}</ul>
    </div>
  `;

  statsContainer.innerHTML = statsHtml;
}

// Function to calculate statistics using array methods
function calculateStats() {
  const totalMembers = registeredMembers.length;
  
  // Using filter array method
  const basicMembers = registeredMembers.filter(member => member.membershipType === 'basic').length;
  const premiumMembers = registeredMembers.filter(member => member.membershipType === 'premium').length;
  
  // Using reduce array method to calculate total revenue
  const totalRevenue = registeredMembers.reduce((total, member) => {
    const plan = membershipPlans[member.membershipType];
    return total + (plan ? plan.price : 0);
  }, 0);

  // Using slice and map array methods for recent members
  const recentMembers = registeredMembers
    .slice(-5) // Get last 5 members
    .reverse() // Most recent first
    .map(member => `<li>${member.firstName} ${member.lastName} - ${membershipPlans[member.membershipType]?.name || 'Unknown'}</li>`)
    .join('');

  return {
    totalMembers,
    basicMembers,
    premiumMembers,
    totalRevenue,
    recentMembers: recentMembers
  }
} 
