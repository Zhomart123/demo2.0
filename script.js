const apiUrl = "https://open.er-api.com/v6/latest/USD";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("converter-form");
    const currencyDropdown = document.getElementById("currency");
    const resultDiv = document.getElementById("result");
    const errorDiv = document.getElementById("error");

    const fetchExchangeRates = async () => {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error("could not find");

            const data = await response.json();
            const rates = data.rates;

            for (const currency in rates) {
                const option = document.createElement("option");
                option.value = currency;
                option.textContent = currency;
                currencyDropdown.appendChild(option);
            }
        } catch (error) {
            console.error(error)
            errorDiv.textContent = "Error fetching data";
        }

    };
fetchExchangeRates();


form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const amount = parseFloat(document.getElementById("amount").value);
    const targetCurrency = currencyDropdown.value;

    resultDiv.textContent = "";
    errorDiv.textContent = "";

    if (isNaN(amount) || amount <= 0) {
        errorDiv.textContent = "Please enter a valid amount";
        return;
    }

    if (!targetCurrency) {
        console.error(error)
        errorDiv.textContent = "Please select a currency";
        return;
    }

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch exchange rates");

        const data = await response.json();
        const rate = data.rates[targetCurrency];

        if (!rate) {
        console.error(error)
        errorDiv.textContent = "Currency not found";
        return;
    }

        const convertedAmount = (amount * rate).toFixed(2);
        resultDiv.textContent = `${amount} USD = ${convertedAmount} ${targetCurrency}`;
    } catch (error) {
        console.error(error)
        errorDiv.textContent = "Error";
    }
});
});
