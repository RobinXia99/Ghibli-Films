const dropdown_btn = document.getElementById('nav_dropdown_btn');

const dropdown_menu = document.getElementById('nav_dropdown');

const dropdown_close = document.getElementById('nav_dropdown_close');

dropdown_btn.addEventListener('click', function() {

    dropdown_menu.classList.add('nav_dropdown_active')
    dropdown_menu.style.display = 'flex';

    console.log('dropdown clicked')

})

dropdown_close.addEventListener('click', function() {

    dropdown_menu.style = 'none';
    dropdown_menu.classList.remove('nav_dropdown_active')

})
