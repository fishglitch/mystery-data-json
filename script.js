function checkFor94110(button) {
  // button.style.display = "none"; // hide button

  fetch("evictions.json") // get eviction data
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((evictions) => {
      console.log("all data", evictions);

      // Filter evictions for zip code 94110
      const zip94110 = evictions.filter((zip) => zip.zip == "94110");
      console.log("94110 zip data", zip94110);

      // Update the Message for 94110
      const statusElement = document.getElementById("status");
      statusElement.innerHTML = `Whoa there are ${zip94110.length} evictions in 94110 rn!!`;

      // Update visualization
      updateVisualization(zip94110.length); 
    })
    .catch((error) => {
      console.error("Error loading JSON:", error);
    });
}

function howMany2025(button) {
  // button.style.display = "none"; // hide button

  fetch("evictions.json") // get eviction data
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((evictions) => {
      console.log("all data", evictions);

      // Filter evictions for the year 2025
      const howMany2025 = evictions.filter((eviction) => {
        const year = new Date(eviction.file_date).getFullYear();
        return year === 2025;
      });
      console.log("2025 evictions data", howMany2025);

      // Update the Message for evictions in 2025
      const statusElement = document.getElementById("status");
      statusElement.innerHTML = `Whoa there are ${howMany2025.length} evictions across Frisco in 2025 rn!!`;

      // Update visualization
      updateVisualization(howMany2025.length);
    })
    .catch((error) => {
      console.error("Error loading JSON:", error);
    });
}

let allAsterisks = [];
// Create asterisk rows in the visualization div
function createAsteriskRows() {
  const visualizationDiv = document.getElementById("visualization");

  // Loop to create 20 rows of 50 asterisks each
  for (let i = 0; i < 20; i++) {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("asterisk-row");
    //rowDiv.textContent = "⌂".repeat(50); // 50 asterisks
    for (let j = 0; j < 50; j++) {
      const asteriskSpan = document.createElement("span");
      asteriskSpan.textContent = "🏠";
      asteriskSpan.classList.add("asterisk");
      rowDiv.appendChild(asteriskSpan);
    }
    visualizationDiv.appendChild(rowDiv);
  }

  allAsterisks = visualizationDiv.querySelectorAll(".asterisk");
}

// Update the asterisks visualization based on the count
function updateVisualization(count) {
    allAsterisks.forEach((asterisk) => {
        asterisk.classList.remove("highlighted");
    });

    // for (let i = 0; i < count; i++) {
    //     allAsterisks[i].classList.add("highlighted");
    // }

      // Function to highlight asterisks one at a time
  const highlightAsterisks = (i) => {
    if (i < count) {
      allAsterisks[i].classList.add("highlighted");
      setTimeout(() => highlightAsterisks(i + 1), 5);  // Delay of 500ms between highlights
    }
  };

  highlightAsterisks(0);  // Start highlighting from the 0th index
}

// Call to create asterisk rows on page load
document.addEventListener("DOMContentLoaded", createAsteriskRows);