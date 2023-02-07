const money = (event) => {
    event.preventDefault(); // prevent the form from submitting, which means the page will not reload
    let amount = parseFloat(document.getElementById("amount").value);
    let select1 = document.getElementById("from");
    let select2 = document.getElementById("to");
    let result = document.getElementById("result");

    if ((select1.value == "USD") && (select2.value == "EUR")) {
        result.innerHTML = `The amount is ${(amount * 0.7003).toFixed(2)} EUR`
    } else if ((select1.value == "EUR") && (select2.value == "USD")) {
        result.value = (amount * 1.4283).toFixed(2);
        result.innerHTML = `The amount is ${(amount * 1.4283).toFixed(2)} USD`
    } else {
        result.value = (amount)
    }
}

document.querySelector('form').addEventListener('submit', money);