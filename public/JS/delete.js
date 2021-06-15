var del_buttons = document.querySelectorAll('.del_button');
del_buttons.forEach(del_button => {
    del_button.addEventListener('click', getDeleteItem);
})

function getDeleteItem(){
    var link = document.querySelector('#del_form').action;
    console.log(this.value);
    link = link + this.value + '/delete';
    document.querySelector('#del_form').action = link;
}