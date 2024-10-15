
 const buttons = document.querySelectorAll('section button');

 let clickedButton = '';

 const scrollAmount = 300;

 // Agrega un event listener a cada botón
 buttons.forEach(button => {
     button.addEventListener('click', (event) => {
         // Obtiene el botón que fue clickeado
         clickedButton = event.currentTarget;

          
          if (clickedButton.classList.contains('flecha-izq')) {
            clickedButton.addEventListener('click', () => handleScroll('left'));
            
        } else if (clickedButton.classList.contains('flecha-der')) {
            clickedButton.addEventListener('click', () => handleScroll('right'));
        }   
     });
 });

function handleScroll(direction) {
    let cardContainer = clickedButton.parentElement; // Obtener el contenedor padre del botón
    let carrousel = cardContainer.querySelector('.carrousel-flexbox'); // Busca el contenedor del carrusel dentro del contenedor padre

    // Desplazar el carrusel
    carrousel.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
    });

    let cards = carrousel.getElementsByClassName('card');
    // Añadir clase de transición dependiendo de la dirección
    Array.from(cards).forEach(card => {
        card.classList.add(direction === 'right' ? 'transicion-der' : 'transicion-izq');
    });

    // Remover clase de transición después de un tiempo
    isScrolling = setTimeout(() => {
        Array.from(cards).forEach(card => {
            card.classList.remove(direction === 'right' ? 'transicion-der' : 'transicion-izq');
        });
    }, 300);
}


