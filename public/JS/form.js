var open_buttons = document.querySelectorAll('#open_button');
open_buttons.forEach(open_button => {
    open_button.addEventListener('click', displayForm);
});
var cancel_button = document.getElementById('cancel_button');
cancel_button.addEventListener('click', hiddenForm);

function displayForm(){
    var form = document.getElementById('form');
    form.style.display = "flex";
}

function hiddenForm(){
    var form = document.getElementById('form');
    form.style.display = "none";
}