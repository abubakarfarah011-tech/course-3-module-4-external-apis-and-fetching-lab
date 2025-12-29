// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
const fetchButton = document.getElementById("fetch-alerts");
const stateInput = document.getElementById("state-input");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

// Fetch weather alerts for a state
async function fetchWeatherAlerts(state) {
  try {
    const response = await fetch(
      `https://api.weather.gov/alerts/active?area=${state}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather alerts. Please try again.");
    }

    const data = await response.json();
    console.log(data); // for testing

    displayAlerts(data, state);
  } catch (error) {
    showError(error.message);
  }
}

// Display alerts on the page
function displayAlerts(data, state) {
  clearUI();

  const alertCount = data.features.length;

  const summary = document.createElement("h3");
  summary.textContent = `Weather Alerts: ${alertCount}`;
  alertsDisplay.appendChild(summary);

  if (alertCount === 0) {
    const noAlerts = document.createElement("p");
    noAlerts.textContent = "No active alerts for this state.";
    alertsDisplay.appendChild(noAlerts);
    return;
  }

  const ul = document.createElement("ul");

  data.features.forEach(alert => {
    const li = document.createElement("li");
    li.textContent = alert.properties.headline;
    ul.appendChild(li);
  });

  alertsDisplay.appendChild(ul);
}

// Clear UI before new request
function clearUI() {
  alertsDisplay.innerHTML = "";
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");
  stateInput.value = "";
}

// Show error message
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

// Button click handler
fetchButton.addEventListener("click", () => {
  const state = stateInput.value.trim().toUpperCase();

  if (!/^[A-Z]{2}$/.test(state)) {
    showError("Please enter a valid two-letter U.S. state code (e.g., CA, TX).");
    return;
  }

  fetchWeatherAlerts(state);
});

