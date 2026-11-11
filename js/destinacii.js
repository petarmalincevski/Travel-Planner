var destinations = [
    {
        id: "resen",
        name: "Resen",
        description: "A peaceful town known for its apples, beautiful nature, and proximity to Lake Prespa.",
        image: "sliki/resen.jpg",
        category: "Nature",
        budget: "Low",
        city: "resen"
    },

    {
        id: "bitola",
        name: "Bitola",
        description: "A historic city famous for its beautiful architecture and lively Shirok Sokak street.",
        image: "sliki/bitola.jpg",
        category: "Culture",
        budget: "Medium",
        city: "bitola"
    },

    {
        id: "ohrid",
        name: "Ohrid",
        description: "One of Macedonia’s most beautiful cities, known for Lake Ohrid, historic churches, and rich cultural heritage.",
        image: "sliki/ohrid.jpg",
        category: "Nature",
        budget: "High",
        city: "ohrid"
    },

    {
        id: "skopje",
        name: "Skopje",
        description: "The capital and largest city of Macedonia, known for its vibrant culture, historical sites, and modern architecture.",
        image: "sliki/skopje.jpg",
        category: "City",
        budget: "Medium",
        city: "skopje"
    },

    {
        id: "struga",
        name: "Struga",
        description: "A charming lakeside town known for Lake Ohrid, the Black Drin River, and its poetry traditions.",
        image: "sliki/struga.jpg",
        category: "Culture",
        budget: "Low",
        city: "struga"
    }
];

var savedDestinations = JSON.parse(localStorage.getItem("customDestinations"));

if (savedDestinations) {
    destinations = destinations.concat(savedDestinations);
}

var deletedDestinations = JSON.parse(localStorage.getItem("deletedDestinations"));

if (deletedDestinations == null) {
    deletedDestinations = [];
}

function displayDestinations() {

    var list = document.getElementById("destinations-list");

    var category = document.getElementById("category-filter").value;
    var budget = document.getElementById("budget-filter").value;

    list.innerHTML = "";

    var count = 0;

    for (var i = 0; i < destinations.length; i++) {

        var destination = destinations[i];
        if (deletedDestinations.includes(destination.id)) {
            continue;
        }

        if (category != "all" && destination.category != category) {
            continue;
        }
        if (budget != "all" && destination.budget != budget) {
            continue;
        }

        count++;

        var exploreButton = "";
        if (destination.city) {
            exploreButton = `
                <a href="grad.html?city=${destination.city}"
                   class="btn btn-primary">
                   Explore
                </a>
            `;
        }

        list.innerHTML += `
            <div class="col-md-6 col-lg-4 mb-4">

                <div class="card h-100 destination-card">

                    <img src="${escapeHTML(destination.image)}"
                         class="card-img-top"
                         alt="${escapeHTML(destination.name)}">

                    <div class="card-body">

                        <h4 class="card-title">
                            ${escapeHTML(destination.name)}
                        </h4>

                        <p class="card-text">
                            ${escapeHTML(destination.description)}
                        </p>

                        <p>Category: ${escapeHTML(destination.category)}</p>

                        <p>Budget: ${escapeHTML(destination.budget)}</p>

                        ${exploreButton}

                        <button class="btn btn-danger mt-2"
                                onclick="deleteDestination('${destination.id}')">
                            Delete
                        </button>

                    </div>

                </div>

            </div>
        `;
    }

    if (count == 0) {
        list.innerHTML = "<p class='col-12 text-center'>No destinations found.</p>";
    }
}

document.getElementById("destination-form").addEventListener("submit", function(event) {

    event.preventDefault();

    var name = document.getElementById("destination-name").value.trim();
    var description = document.getElementById("destination-description").value.trim();
    var image = document.getElementById("destination-image").value.trim();
    var category = document.getElementById("destination-category").value;
    var budget = document.getElementById("destination-budget").value;

    if (name == "" || description == "" || image == "") {
        return;
    }
    var newDestination = {
        id: "custom_" + Date.now(),
        name: name,
        description: description,
        image: image,
        category: category,
        budget: budget,
        city: null
    };

    destinations.push(newDestination);

    var customDestinations = destinations.filter(function(destination) {
        return destination.id.startsWith("custom_");
    });

    localStorage.setItem("customDestinations", JSON.stringify(customDestinations));

    displayDestinations();

    document.getElementById("destination-form").reset();

    document.getElementById("destination-message").textContent =
        "Destination added successfully!";
});

function deleteDestination(id) {

    if (!confirm("Are you sure you want to delete this destination?")) {
        return;
    }

    if (!deletedDestinations.includes(id)) {
        deletedDestinations.push(id);
    }

    localStorage.setItem("deletedDestinations", JSON.stringify(deletedDestinations));

    displayDestinations();
}

document.getElementById("category-filter").addEventListener("change", displayDestinations);
document.getElementById("budget-filter").addEventListener("change", displayDestinations);
document.getElementById("travel-form").addEventListener("submit", function(event) {

    event.preventDefault();

    var distance = parseFloat(document.getElementById("distance").value);
    var consumption = parseFloat(document.getElementById("consumption").value);
    var fuelPrice = parseFloat(document.getElementById("fuel-price").value);
    var passengers = parseInt(document.getElementById("passengers").value);
    var fuelNeeded = (distance * consumption) / 100;
    var totalCost = fuelNeeded * fuelPrice;
    var costPerPerson = totalCost / passengers;

    document.getElementById("travel-result").innerHTML =
        "Fuel needed: " + fuelNeeded.toFixed(2) + " liters<br>" +
        "Total travel cost: " + totalCost.toFixed(2) + " MKD<br>" +
        "Cost per passenger: " + costPerPerson.toFixed(2) + " MKD";
});

function escapeHTML(text) {

    return String(text).replace(/[&<>"']/g, function(character) {

        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[character];

    });
}

displayDestinations();
