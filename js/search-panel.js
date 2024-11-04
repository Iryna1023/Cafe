let currentSearchResults = [];
let products;

const productsURL = 'products.json';

function flattenProducts(data) {
    let flattened = {};
    for (let category in data) {
        for (let productKey in data[category]) {
            const product = data[category][productKey];
            flattened[productKey] = { ...product, category: category, key: productKey };
        }
    }
    return flattened;
}

function searchProductsByName(name__p) {
    const results = [];
    for (const key in products) {
        if (products.hasOwnProperty(key) && products[key].name__p) {
            const productName = products[key].name__p.toLowerCase();
            if (productName.includes(name__p)) {
                results.push(products[key]);
            }
        }
    }
    return results;
}

let isSearchResultsVisible = false;

function updateSearchResults(results) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';

    if (results.length > 0) {
        const resultList = document.createElement('ul');

        results.forEach(result => {
            const listItem = document.createElement('li');
            listItem.textContent = result.name__p;
            listItem.dataset.result = JSON.stringify(result);

            listItem.addEventListener('click', function () {
                const result = JSON.parse(this.dataset.result);
                navigateToProductPage(result.category);
            });

            resultList.appendChild(listItem);
        });

        resultsContainer.appendChild(resultList);
        isSearchResultsVisible = true;
    } else {
        resultsContainer.innerHTML = '<p>Немає результатів</p>';
    }
}

document.addEventListener('click', function (event) {
    const resultsContainer = document.getElementById('searchResults');
    if (isSearchResultsVisible && !resultsContainer.contains(event.target)) {
        resultsContainer.innerHTML = '';
        isSearchResultsVisible = false;
    }
});


function navigateToProductPage(category) {
    let pageUrl;

    switch (category) {
        case 'хачапурі':
            pageUrl = './hachapuri.html';
            break;
        case 'піца на вершковій основі':
            pageUrl = './pizza-on-cream.html';
            break;
        case 'піца на томатній основі':
            pageUrl = './pizza-on-tomato.html';
            break;
        case 'пироги солоні з печі на дровах':
            pageUrl = './purogy-soloni.html';
            break;
        case 'слойки':
            pageUrl = './sloyki.html';
            break;
        case 'пироги солодкі з печі на дровах':
            pageUrl = './purogi-solodki.html';
            break;
        case 'булочки здобні':
            pageUrl = './bulochki.html';
            break;
        case 'кондитерські вироби':
            pageUrl = './konduterski.html';
            break;
        case 'хліб':
            pageUrl = './hlib.html';
            break;
        case 'чай':
            pageUrl = './tea.html';
            break;
        case 'кава':
            pageUrl = './cofe.html';
            break;
        case 'сік':
            pageUrl = './juice.html';
            break;
        case 'вода':
            pageUrl = './water.html';
            break;
        case 'лаваш':
            pageUrl = './lavash.html';
            break;
        default:
            pageUrl = './default.html';
            break;
    }

    console.log('Page URL:', pageUrl);
    window.location.href = pageUrl;
}

document.addEventListener('DOMContentLoaded', function () {
    fetch(productsURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            products = flattenProducts(data);
            document.getElementById('searchButton').addEventListener('click', function () {
                const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
                if (searchTerm !== '') {
                    const searchResults = searchProductsByName(searchTerm);
                    updateSearchResults(searchResults);
                } else {
                    console.error('Invalid search term');
                }
            });

            document.getElementById('searchInput').addEventListener('input', function () {
                const searchQuery = this.value.trim().toLowerCase();
                const searchResults = searchProductsByName(searchQuery);
                updateSearchResults(searchResults);
            });

            document.getElementById('delButton').addEventListener('click', function () {
                document.getElementById('searchInput').value = '';
                document.getElementById('searchResults').innerHTML = '';
            });
        })
        .catch(error => {
            console.error('Error loading products:', error);
        });
});


