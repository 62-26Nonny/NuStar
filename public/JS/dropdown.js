var dropdown_btns = document.querySelectorAll('.dropdown_button');

function openDropdown(dropdownContent, dropdown_btn){
    if(checkOpened()){
        var currentDropdown = document.querySelector('.open');
        var currentDropdownContent = currentDropdown.nextElementSibling;
        closeDropdown(currentDropdownContent, currentDropdown);
    }
    dropdown_btn.classList.add("open");
    var dropdownMenus = Array.from(dropdownContent.children);    
    dropdownMenus.forEach(menu => {
        menu.addEventListener('click', e => {
            var value = menu.innerHTML;
            var selectedForm = dropdown_btn.classList.item(1);

            selectMenu(value, selectedForm, dropdownContent, dropdown_btn);
        });
    });
    dropdown_btn.addEventListener('click', e => {
        closeDropdown(dropdownContent, dropdown_btn);
    });
}

function closeDropdown(dropdownContent, dropdown_btn){
    dropdown_btn.classList.remove("open");
    dropdown_btn.addEventListener('click', e => {
        openDropdown(dropdownContent, dropdown_btn);
    });
}

function selectMenu(value, selectedForm, dropdownContent, dropdown_btn){
    var form = document.getElementById(selectedForm);
    form.innerHTML = value;
    closeDropdown(dropdownContent, dropdown_btn);
}

function checkOpened(){
    var openedDropdown = document.querySelector('.open');
    if(openedDropdown == null)
        return false;
    return true;
}

dropdown_btns.forEach(dropdown_btn => {
    dropdown_btn.addEventListener('click', e => {
        var dropdownContent = dropdown_btn.nextElementSibling;

        openDropdown(dropdownContent, dropdown_btn);
    });
})