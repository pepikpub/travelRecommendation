const btnSearch = document.getElementById('searchBtn');
const btnReset = document.getElementById('resetBtn');
const resultDiv = document.getElementById('results-container');

function searchCondition() {
    const input = document.getElementById('conditionInput').value.toLowerCase().trim();
    resultDiv.innerHTML = ''; 


    if (!input) {
        alert("Please enter a keyword");
        return;
    }

    fetch('./travel_recommendation_api.json')
        .then(res => res.json())
        .then(data => {
            let found = [];

            
            if (input === 'beach' || input === 'beaches') {
                found = data.beaches;
            } 
            
            else if (input === 'temple' || input === 'temples') {
                found = data.temples;
            } 
            
            else {
                const country = data.countries.find(c => c.name.toLowerCase() === input);
                if (country) {
                    found = country.cities;
                }
            }

            if (found.length > 0) {
                displayResults(found);
            } else {
                resultDiv.innerHTML = '<p style="color:white; padding:20px;">No results found. Try "beach", "temple", or "Japan".</p>';
            }
        })
        .catch(err => console.error("Error fetching data:", err));
}

function displayResults(items) {
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'result-card';
        card.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}">
            <div class="card-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <button class="visit-btn">Visit</button>
            </div>
        `;
        resultDiv.appendChild(card);
    });
}

function clearResults() {
    const inputField = document.getElementById('conditionInput');
    inputField.value = ''; 
    resultDiv.innerHTML = ''; 
    console.log('Search and results cleared'); 
}

btnReset.addEventListener('click', clearResults);

btnSearch.addEventListener('click', searchCondition);


