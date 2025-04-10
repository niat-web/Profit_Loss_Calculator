// script.js

// Dark Mode Functionality
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
    darkModeToggle.innerHTML = body.dataset.theme === 'dark' ? '<i class="fas fa-sun"></i> Light Mode' : '<i class="fas fa-moon"></i> Dark Mode';
});

// Input Form Elements
const transactionForm = document.getElementById('transactionForm');
const costPriceInput = document.getElementById('costPrice');
const sellingPriceInput = document.getElementById('sellingPrice');
const quantityInput = document.getElementById('quantity');
const clearButton = document.getElementById('clearButton');

// Result Display Elements
const profitLossElement = document.getElementById('profitLoss');
const profitLossPercentageElement = document.getElementById('profitLossPercentage');

// Transaction History Elements
const transactionTableBody = document.getElementById('transactionTableBody');

// Summary Elements
const totalProfitLossElement = document.getElementById('totalProfitLoss');
const overallProfitLossPercentageElement = document.getElementById('overallProfitLossPercentage');

// Download Report Button
const downloadReportButton = document.getElementById('downloadReportButton');

// Transaction History Array
let transactionHistory = [];

// Function to calculate profit/loss
function calculateProfitLoss(costPrice, sellingPrice, quantity) {
    const profitLoss = (sellingPrice - costPrice) * quantity;
    const profitLossPercentage = (profitLoss / (costPrice * quantity)) * 100;
    return { profitLoss, profitLossPercentage };
}

// Function to display calculation results
function displayResults(profitLoss, profitLossPercentage) {
    profitLossElement.textContent = profitLoss.toFixed(2);
    profitLossPercentageElement.textContent = profitLossPercentage.toFixed(2) + '%';
}

// Function to add transaction to history
function addTransactionToHistory(costPrice, sellingPrice, quantity, profitLoss, profitLossPercentage) {
    transactionHistory.push({ costPrice, sellingPrice, quantity, profitLoss, profitLossPercentage });

    // Update transaction history table
    const row = transactionTableBody.insertRow();
    row.insertCell().textContent = costPrice.toFixed(2);
    row.insertCell().textContent = sellingPrice.toFixed(2);
    row.insertCell().textContent = quantity;
    row.insertCell().textContent = profitLoss.toFixed(2);
    row.insertCell().textContent = profitLossPercentage.toFixed(2) + '%';

    // Update summary
    updateSummary();
}

// Function to update summary
function updateSummary() {
    let totalProfitLoss = 0;
    transactionHistory.forEach(transaction => {
        totalProfitLoss += transaction.profitLoss;
    });

    let totalCost = 0;
    transactionHistory.forEach(transaction => {
        totalCost += (transaction.costPrice* transaction.quantity);
    });
  
    const overallProfitLossPercentage = (totalProfitLoss / totalCost) * 100;

    totalProfitLossElement.textContent = totalProfitLoss.toFixed(2);
    overallProfitLossPercentageElement.textContent = overallProfitLossPercentage.toFixed(2) + '%';
}

// Input Validation
function validateInput(inputElement) {
    const value = parseFloat(inputElement.value);
    if (isNaN(value) || value <= 0) {
        inputElement.classList.add('is-invalid');
        return false;
    } else {
        inputElement.classList.remove('is-invalid');
        return true;
    }
}

// Event Listener for Form Submission
transactionForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    const costPrice = parseFloat(costPriceInput.value);
    const sellingPrice = parseFloat(sellingPriceInput.value);
    const quantity = parseInt(quantityInput.value);

    const isCostPriceValid = validateInput(costPriceInput);
    const isSellingPriceValid = validateInput(sellingPriceInput);
    const isQuantityValid = validateInput(quantityInput);

    if (isCostPriceValid && isSellingPriceValid && isQuantityValid) {
        const { profitLoss, profitLossPercentage } = calculateProfitLoss(costPrice, sellingPrice, quantity);
        displayResults(profitLoss, profitLossPercentage);
        addTransactionToHistory(costPrice, sellingPrice, quantity, profitLoss, profitLossPercentage);

        // Clear input fields after calculation
        costPriceInput.value = '';
        sellingPriceInput.value = '';
        quantityInput.value = '';
    }
});

// Event Listener for Clear Button
clearButton.addEventListener('click', function () {
    costPriceInput.value = '';
    sellingPriceInput.value = '';
    quantityInput.value = '';
    profitLossElement.textContent = '';
    profitLossPercentageElement.textContent = '';
});

// Event Listeners for Real-Time Validation
costPriceInput.addEventListener('input', function () {
    validateInput(costPriceInput);
});

sellingPriceInput.addEventListener('input', function () {
    validateInput(sellingPriceInput);
});

quantityInput.addEventListener('input', function () {
    validateInput(quantityInput);
});

// Function to generate CSV report
function generateCSVReport() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Cost Price,Selling Price,Quantity,Profit/Loss,Profit/Loss Percentage\r\n";

    transactionHistory.forEach(transaction => {
        csvContent += `${transaction.costPrice},${transaction.sellingPrice},${transaction.quantity},${transaction.profitLoss},${transaction.profitLossPercentage}\r\n`;
    });

    // Add total profit/loss
    let totalProfitLoss = 0;
    transactionHistory.forEach(transaction => {
        totalProfitLoss += transaction.profitLoss;
    });
    csvContent += `,,Total Profit/Loss,${totalProfitLoss.toFixed(2)}\r\n`;

    // Add overall profit/loss percentage
    let totalCost = 0;
    transactionHistory.forEach(transaction => {
        totalCost += (transaction.costPrice* transaction.quantity);
    });

    let overallProfitLossPercentage = (totalProfitLoss / totalCost) * 100;

    csvContent += `,,Overall Profit/Loss Percentage,${overallProfitLossPercentage.toFixed(2)}%\r\n`;

    return csvContent;
}
// Event Listener for Download Report Button
// downloadReportButton.addEventListener('click', function () {
//     const csvData = generateCSVReport();
//     const encodedUri = encodeURI(csvData);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "transaction_report.csv");
//     document.body.appendChild(link); // Required for FF

//     link.click(); // This will download the data file named "transaction_report.csv".
// });

//Async API functions
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    } else {
      const proxyUrl = `https://api.allorigins.win/raw?url=${url}`;
      const proxyResponse = await fetch(proxyUrl);
      if (proxyResponse.ok) {
        return await proxyResponse.json();
      } else {
        return null;
      }
    }
  } catch (error) {
    const proxyUrl = `https://api.allorigins.win/raw?url=${url}`;
    const proxyResponse = await fetch(proxyUrl);
    if (proxyResponse.ok) {
      return await proxyResponse.json();
    } else {
      return null;
    }
  }
}

async function displayProductData() {
  const productDataContainer = document.getElementById("productData");
  productDataContainer.innerHTML = "<p>Loading product data...</p>";

  const apiUrl = "https://freetestapi.com/api/v1/products";
  const data = await fetchData(apiUrl);

  if (data && data.length > 0) {
    const shuffledData = data.sort(() => Math.random() - 0.5); // Shuffle the data

    let productInfo = `
      <p><strong>Name:</strong> ${shuffledData[0].name}</p>
      <p><strong>Description:</strong> ${shuffledData[0].description}</p>
      <p><strong>Price:</strong> $${shuffledData[0].price}</p>
      <p><strong>Brand:</strong> ${shuffledData[0].brand}</p>
    `;
    productDataContainer.innerHTML = productInfo;
  } else {
    productDataContainer.innerHTML = "<p>Failed to fetch product data.</p>";
  }
}

// Refresh button functionality
document.getElementById("refreshButton").addEventListener("click", displayProductData);

// Call displayProductData() on page load
displayProductData();