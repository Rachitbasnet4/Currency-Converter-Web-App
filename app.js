const baseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdownS = document.querySelectorAll(".dropdown select");

const btn = document.querySelector(".button")
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");

for(let select of dropdownS){
    for(currCode in countryList){
        let newOption =  document.createElement("option");
        newOption.innerHTML = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode==="USD"){
            newOption.selected="selected";
        } else if(select.name === "to" && currCode==="NPR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change",(eve)=>{
        updateFlag(eve.target);
    })
}

const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrcLink = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrcLink;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount =  document.querySelector("#amount")
    let amtValue = amount.value;
    if (amtValue === "" || amtValue <1){
        amtValue = 1;
        amount.value = "1";
    }

    const from = fromCurrency.value.toLowerCase();
    const to = toCurrency.value.toLowerCase();

    const URl = `${baseUrl}/${from}.json`;
    
    try{
        let response = await fetch(URl);
        if (!response.ok) throw new Error("Failed to fetch exchange rate");
        const data = await response.json();
        const rate = data[from][to];
        const convertedAmount = (amtValue * rate).toFixed(2);
        document.querySelector(".msg").innerText = `${amtValue} ${fromCurrency.value} = ${convertedAmount} ${toCurrency.value}`;
    }catch(error){
        console.error("Error fetching conversion rate:", error);
        document.querySelector(".result").innerText = "Failed to fetch exchange rate.";
    }
});