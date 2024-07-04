const BASE_URL = "https://v6.exchangerate-api.com/v6/API_KEY/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const amountInput = document.querySelector(".amount input");

//   for (code in countryList) {
//     console.log(code, countryList[code]);
//   }

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerHTML = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (event) => {
        updateFlag(event.target);
    });
}

const updateExchangeRate = async () => {
    let amtVal = amountInput.value;
    if (amtVal === "" || isNaN(amtVal) || amtVal < 1) {
        amtVal = 1;
        amountInput.value = "1";
    }

    const URL = `${BASE_URL}/${fromCurr.value}`;

    let response = await fetch(URL);
    let data = await response.json();

    let rate = data.conversion_rates[toCurr.value];
    // console.log(rate);

    let finalAmt = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt.toFixed(2)} ${toCurr.value}`;     // 2 specifies decimal spaces to be rounded off
};

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

amountInput.addEventListener("input", (event) => {
    let value = event.target.value;
    if (isNaN(value) || value.includes(" ")) {
        event.target.value = value.slice(0, -1);
    }
});

btn.addEventListener("click", (event) => {
    event.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});