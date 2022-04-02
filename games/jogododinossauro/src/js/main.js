// Scripts para o jogo do dinossauro

/* Constantes do D.O.M */
// -------------------------------------------------

const dino = document.querySelector('.div-dino');

// -------------------------------------------------

/* Eventos do teclado */

let identKeyUp = (event) => {
	if(event.keyCode === 32)
		console.log('Pressionou espaço');
}

document.addEventListener('keyup', identKeyUp);
