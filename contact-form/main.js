// check if the username form contains only letters and numbers
const checkUsername = () => {
    let input = document.getElementById('name');
    let message = document.getElementById('message');
    let regex = /^[a-z0-9]+$/i;

    if (!regex.test(input.value)) { // test the regex to check if it's correspond or not
        message.innerHTML = 'Please enter a valid username'
    } else {
        message.innerHTML = 'Good username'
    }
}

document.getElementById('name').addEventListener('input', checkUsername);


// ^         Start of string
// [a-z0-9]  a or b or c or ... z or 0 or 1 or ... 9
// +         one or more times (change to * to allow empty string)
// $         end of string    
// /i        case-insensitive
