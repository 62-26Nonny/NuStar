var open_button = document.getElementById('open');
open_button.addEventListener('click', displayForm);
var cancel_button = document.getElementById('cancel');
cancel_button.addEventListener('click', hiddenForm);

function displayForm(){
    var form = document.getElementById('profile_form');
    form.style.display = "flex";
}

function hiddenForm(){
    var form = document.getElementById('profile_form');
    form.style.display = "none";
}