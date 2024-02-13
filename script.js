const BASE_URL = 'https://openexchangerates.org/api';
const CODES_URL = `${BASE_URL}/currencies.json`;
const EXCHANGE_RATE_URL = `${BASE_URL}/latest.json?app_id=8689a7e521d044feac7d5d5e9a7c3c7f`;
const dropdowns = document.querySelectorAll(".dropdown select");
const amountInput = document.querySelector(".amount input");
const fromSelect = document.querySelector("select[name='from']");
const toSelect = document.querySelector("select[name='to']");
const msgDiv = document.querySelector(".msg");

// fetching API 
// select menu - currency list

fetch(CODES_URL)
    .then(response => {
        return response.json();
    })
    .then(data => {
        handleSelect(fromSelect, data);
        handleSelect(toSelect, data);
        updateExchangeRate();
    });

function handleSelect(selectElement, codes) {
    for (let code in codes) {
        const option = document.createElement("option");
        option.value = code;
        option.text = `${code} - ${codes[code]}`;
        selectElement.appendChild(option);
    }
}

//Exchange rate calculation

amountInput.addEventListener('input', updateExchangeRate);
fromSelect.addEventListener('change', updateExchangeRate);
toSelect.addEventListener('change', updateExchangeRate);

function updateExchangeRate() {
const amount = parseFloat(amountInput.value);
const fromAmount = fromSelect.value;
const toAmount = toSelect.value;

fetch(EXCHANGE_RATE_URL)
    .then(response => response.json())
    .then(data => {
        const exchangeRate = data.rates[toAmount] / data.rates[fromAmount];
        const convertedAmount = amount * exchangeRate;
    msgDiv.innerText = `${amount} ${fromAmount} = ${convertedAmount.toFixed(2)} ${toAmount}`;
        })
}



