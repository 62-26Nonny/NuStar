var menus = document.querySelector('.menus');
var menuList = Array.from(menus.children);

menuList.forEach(menu => {
    menu.addEventListener('click', e => {
        var link = menu.getAttribute('href');
        var targetMenu = document.querySelector(link);
        var currentMenu = document.querySelector('.current_active');
        var selectedMenu = document.querySelector('.selected');

        changePage(targetMenu, currentMenu, selectedMenu, menu);
    });
    
});

function changePage(targetMenu, currentMenu, selectedMenu, menu){
    currentMenu.classList.remove("current_active");
    targetMenu.classList.add("current_active");
    selectedMenu.classList.remove("selected");
    menu.classList.add("selected");
}