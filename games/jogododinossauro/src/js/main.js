// Scripts para o jogo do dinossauro

/* Constantes do D.O.M */
// -------------------------------------------------

const dino = document.querySelector('.div-dino');

// -------------------------------------------------

/* Eventos do teclado */
// -------------------------------------------------

let identKeyUp = (event) => {
	if(event.keyCode === 32)
		jumpDino();
}

document.addEventListener('keyup', identKeyUp);

// -------------------------------------------------


/* Funções do jogo */
// -------------------------------------------------

function jumpDino(){
	let position = 0;
	
	// dinossauro subindo
	let upInterval = setInterval(() => {
		if(position >= 150){
			clearInterval(upInterval);

			// dinossauro descendo
			let downInterval = setInterval(() => {
				if(position <= 0){
					clearInterval(downInterval);
				}else{
					position -= 20;
					dino.style.bottom = `${position}px`;
				}
			}, 20);

		}else{
			position += 20;
			dino.style.bottom = `${position}px`;
		}
	}, 20);

}

// -------------------------------------------------
