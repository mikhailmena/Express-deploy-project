// const { response } = require("express");
let ApiURL = ENV == "dev" ? "http://localhost:8000" : "https://express-ui-0iip.onrender.com";
$.get(`${ApiURL}/api/comments`), (data) => {
    console.log(data)
    // let $newDiv ' $'
    for (let i =0; i < data.length; i++){
        $('#display').prepend(data[i].description)
    }
     //prepends data from get call to display ---- I need to make a for loop to display all of it
});

const formSub = document.querySelector('.form'); //selects the form and puts it in a variable

// post from submit form
formSub.addEventListener('submit', event => { //adds event listener
    event.preventDefault(); 
    const formData = new FormData(formSub); //takes all data from form
    const formInput = Object.fromEntries(formData); //puts that dat into a 
    
    fetch(`${ApiURL}/api/comments`, {method: 'POST', headers: {'Content-Type':'application/json'}
    ,body: JSON.stringify(formInput)}) //turns the form data into a string
    .then(response => {
    $('#display').append(formInput.description) //appends stringified form data to display div
    
    console.log(formInput)
    // location.reload()
})
    

})

