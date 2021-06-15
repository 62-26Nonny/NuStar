// NAV BAR //
function openNav(){
    document.querySelector('.nav_bar').style.width = '250px';
}
function closeNav(){
    document.querySelector('.nav_bar').style.width = '0px';
}


// OTHER
var other_button = document.querySelector('.other_button');
other_button.addEventListener('click', openOther);


function openOther(){
    document.querySelector('.other_bar').style.display = 'block';
    other_button.removeEventListener('click', openOther);
    other_button.addEventListener('click', closeOther);
}
function closeOther(){
    document.querySelector('.other_bar').style.display = 'none';
    other_button.removeEventListener('click', closeOther);
    other_button.addEventListener('click', openOther);
}

