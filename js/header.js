let menu_hamburguesa = document.getElementById('menu-hamburguesa');
let perfil_menu = document.getElementById('perfil');

document.getElementById('boton-menu-hamburguesa').addEventListener("click", () => {
    
    menu_hamburguesa.classList.toggle("visible");
    menu_hamburguesa.classList.toggle("invisible");

    let children = document.querySelectorAll('.linea');

    children[0].classList.toggle('rotar-arriba');
    children[1].classList.toggle('desaparecer');
    children[2].classList.toggle('rotar-abajo');
})

document.getElementById('boton-perfil').addEventListener("click", () => {
    perfil_menu.classList.toggle("visible");
    perfil_menu.classList.toggle("invisible");
});

document.querySelectorAll('.boton-header').forEach(button => {
    button.addEventListener('click', function() {
        this.classList.add('pulse-badge');
        
        // Remover la clase después de 1 segundo (duración de la animación)
        setTimeout(() => {
            this.classList.remove('pulse-badge');
        }, 1000); 
    });
});
