// Scripts para o jogo do dinossauro

/* Constantes do D.O.M e Variáveis Globais */
// -------------------------------------------------

const dino = document.querySelector('.div-dino');
let isJumping = false;

// -------------------------------------------------

/* Eventos do teclado */
// -------------------------------------------------

let identKeyUp = (event) => {
	if(event.keyCode === 32)
		if(!isJumping) jumpDino();
}

document.addEventListener('keyup', identKeyUp);

// -------------------------------------------------


/* Funções do jogo */
// -------------------------------------------------

function jumpDino(){
	let position = 0;
	isJumping = true;

	// dinossauro subindo
	let upInterval = setInterval(() => {
		if(position >= 150){
			clearInterval(upInterval);

			// dinossauro descendo
			let downInterval = setInterval(() => {
				if(position <= 0){
					clearInterval(downInterval);
					isJumping = false
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
