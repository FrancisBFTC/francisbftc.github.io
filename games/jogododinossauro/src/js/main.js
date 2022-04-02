// Scripts para o jogo do dinossauro

/* Constantes do D.O.M e Variáveis Globais */
// -------------------------------------------------

const dino = document.querySelector('.div-dino');
const background = document.querySelector('.div-background');
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

// Função de salto do dinossauro
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

// Função que cria um cactus
function createCactus(){
	const cactus = document.createElement('div');
	let cactusPos = 1000;

	cactus.classList.add('div-cactus');
	cactus.style.left = `${1000}px`;
	background.appendChild(cactus);
}

// Função que cria um passáro
function createBird(){
	const bird = document.createElement('div');
	let birdPosX = 1000;
	let birdPosY = Math.floor(Math.random() * 200);
	if(birdPosY <= 70) birdPosY = 70;

	bird.classList.add('div-bird');
	bird.style.left = `${1000}px`;
	bird.style.bottom = `${birdPosY}px`;
	background.appendChild(bird);
}

// -------------------------------------------------


/* Chamada das funções principais do jogo */
// -------------------------------------------------
createCactus();
createBird();
// -------------------------------------------------

