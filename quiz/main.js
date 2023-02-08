const submitButton = document.getElementById("submit");

const checkAnswers = () => {
    let score = 0;
    const anonymat = document.querySelector('.anonymat:checked');
    if (anonymat && anonymat.value === "private") {
        score++;
    } 
    const port = document.querySelector('.port:checked');
    if (port && port.value === "22") {
        score++;
    }
    const cybersecurity = document.querySelector('.cyber:checked');
    if (cybersecurity && cybersecurity.value === "protection") {
        score++;
    }
    const tool = document.querySelector('.tool:checked');
    if (tool && tool.value === "nmap") {
        score++;
    }
    alert("Your score is " + score + "/4");
}

submitButton.addEventListener("click", checkAnswers);