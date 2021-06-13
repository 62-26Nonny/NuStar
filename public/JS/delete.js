var del_button = document.querySelector('.del_button');
del_button.addEventListener('click', getDeleteItem());

function getDeleteItem(){
    var link = document.querySelector('#del_form').action 
    link = link + del_button.value + '/delete';
}