const yourShip         = document.querySelector('.player-shooter');
const playArea         = document.querySelector('#main-play-area');
const instructionsText = document.querySelector('.game-instructions');
const description      = document.querySelector('.description-mission');
const startButton      = document.querySelector('.start-button');
const placar           = document.getElementById('placar');

const UP    = 0;
const DOWN  = 1;
const RIGHT = 2;
const LEFT  = 3;

var kmValue, abatidos, missionNum, yearValue, imgObj;
var introMusic, musicMission, musicFinish;

let alienInterval, initMission;

let pressJ    = false;

let aliensPassed = 0;
let alienDead = 0;
let years     = 0;
let distancy  = 0;
let indexDir  = 0;

let life = 100;
let gameOverString;
let personDirection = "right";

const direction = [
    'flying-down',
    'flying-up',
    'flying-right',
    'flying-left'
];

const aliensImg = [
    'img/nave-monstro-1.png', 
    'img/nave-monstro-2.png', 
    'img/nave-monstro-3.png'
];

const horrorAliens = [
    'img/alien0.png', 
    'img/alien1.png', 
    'img/alien2.png'
];


let missions = {
    step1 : {
        msg: '1ª missão: Elimine os 100 alienígenas até 200 Anos-luz ' 
          + 'ao norte do espaço e encontre o planeta Axius!',
        running: false,
        year: 0
    },
    step2 : {
        msg: '2ª missão: Elimine os 300 alienígenas voando até 500km e ' 
          + 'encontre a nave mãe de Axius!',
        running: false,
        km: 0
    },
    step3 : {
        msg: '3ª missão: Extermine os 500 aliens monstruosos para liberar entrada ' 
          + 'na nave mãe!',
        running: false
    },

    mission: 1
}; 

instructionsText.innerHTML = `${missions.step1.msg}`;


//movimento e tiro da nave
function flyShip(event) {
    if(event.key === 'ArrowUp') {
        if(missions.step1.running) 
            changeDirectionSpace(UP);
        else if(missions.mission >= 3){
            yourShip.src = 'img/shooter/player_' + personDirection + '_up.png';
        }
               
    } else if(event.key === 'ArrowDown') {
        if(missions.step1.running) 
            changeDirectionSpace(DOWN);
    } else if(event.key === 'ArrowRight'){
        if(missions.step2.running) 
            changeDirectionSpace(RIGHT);
         else if(missions.mission >= 3){
            personDirection = "right";
            yourShip.src = 'img/shooter/player_' + personDirection + '.png';
        }
    } else if(event.key === 'ArrowLeft'){
        if(missions.step2.running) 
            changeDirectionSpace(LEFT);
        else if(missions.mission >= 3){
            personDirection = "left";
            yourShip.src = 'img/shooter/player_' + personDirection + '.png';
        }
    }else if(event.key === 'w'){
            if(missions.mission < 3) 
                moveUp();
    }else if(event.key === 's'){
            if(missions.mission < 3) 
                moveDown();
    }else if(event.key === 'a'){
        moveLeft();
    }else if(event.key === 'd'){
        moveRight();
    }else if(event.key === " ") {
        fireLaser();
    }else if(event.key === 'j'){
            if(pressJ)
                if(missions.mission < 4)
                    flyIntoPlanet();
                else
                    walkToMotherShip();

    }else if(event.keyCode === 17){
        yourShip.src = 'img/shooter/player_' + personDirection + '_diag.png';
    }
}

//função de subir
function moveUp() {
    let topPosition = parseInt(getComputedStyle(yourShip).getPropertyValue('top'));
    if(topPosition < 60) {
        return
    } else {
        let position = topPosition;
        position -= 20;
        yourShip.style.top = `${position}px`;
    }
}

//função de descer
function moveDown() {
    let topPosition = parseInt(getComputedStyle(yourShip).getPropertyValue('top'));
    let sizeArea = parseInt(playArea.getBoundingClientRect().height) - 20;
    if(topPosition > sizeArea){
        return
    } else {
        let position = topPosition;
        position += 20;
        yourShip.style.top = `${position}px`;
    }
}

//função de ir para esquerda
function moveLeft() {
    let leftPosition = parseInt(getComputedStyle(yourShip).getPropertyValue('left'));

    if(leftPosition < 140){
        return
    } else {
        let position = leftPosition;
        position -= 20;
        yourShip.style.left = `${position}px`;
    }
}

//função de ir para direita
function moveRight() {
    let leftPosition = parseInt(getComputedStyle(yourShip).getPropertyValue('left'));
    let sizeArea = parseInt(playArea.getBoundingClientRect().width) - 20;
    if(leftPosition > sizeArea){
        return
    } else {
        let position = leftPosition;
        position += 20;
        yourShip.style.left = `${position}px`;
    }
}


// Altera direção de viagem no espaço
function changeDirectionSpace(index){
    playArea.classList.remove(direction[indexDir]);
    indexDir = index;
    playArea.classList.add(direction[indexDir]);
}

//funcionalidade de tiro
function fireLaser() {
    let laser = createLaserElement();
    playArea.appendChild(laser);
    moveLaser(laser);
}

function createLaserElement() {
    let xPosition = parseInt(getComputedStyle(yourShip).getPropertyValue('left'));
    let yPosition = parseInt(getComputedStyle(yourShip).getPropertyValue('top'));
    let newLaser = document.createElement('img');
    newLaser.src = 'img/shoot.png';
    newLaser.classList.add('laser');
    newLaser.style.left = `${xPosition}px`;
    newLaser.style.top = `${yPosition - 10}px`;
    return newLaser;
}

function moveLaser(laser) {
    let laserInterval = setInterval(() => {
        let xPosition = parseInt(laser.style.left);
        let yPosition = parseInt(laser.style.top);
        let aliens = document.querySelectorAll('.alien');
        let sizeAreaX = parseInt(playArea.getBoundingClientRect().width) - 20;
        let sizeAreaY = parseInt(playArea.getBoundingClientRect().height) - 20;

        aliens.forEach((alien) => { //comparando se cada alien foi atingido, se sim, troca o src da imagem
            if(checkLaserCollision(laser, alien)) {
                alien.src = 'img/explosion.png';
                alien.classList.remove('alien');
                alien.classList.add('dead-alien');
                alienDead++;
                clearInterval(laserInterval);
            }
        })

        if(missions.step1.running){
            (yPosition < 0) ? laser.remove() : laser.style.top = `${yPosition - 8}px`;
        }else{
            (xPosition > sizeAreaX+300) ? laser.remove() : laser.style.left = `${xPosition + 8}px`;
        }

        abatidos.innerText = alienDead;

    }, 10);
}

//função para criar inimigos aleatórios
function createAliens() {
    let newAlien = document.createElement('img');
    let sizeAreaY = parseInt(playArea.getBoundingClientRect().height) - 20;
    let sizeAreaX = parseInt(playArea.getBoundingClientRect().width) - 20;
    let alienSprite = aliensImg[Math.floor(Math.random() * aliensImg.length)]; //sorteio de imagens
    newAlien.src = alienSprite;
    newAlien.classList.add('alien');
    newAlien.classList.add('alien-transition');
    let indexImg = 0;

    if(missions.step1.running){
        newAlien.style.left = `${Math.floor(Math.random() * (sizeAreaX - 150)) + 150}px`;
        newAlien.style.top = `40px`;
    }else if(missions.step2.running){
        newAlien.style.left = `${sizeAreaX}px`;
        newAlien.style.top = `${Math.floor(Math.random() * (sizeAreaY - 100)) + 100}px`;
    }else if(missions.step3.running){
        indexImg = Math.floor(Math.random() * horrorAliens.length);
        let positionAlien = parseInt(window.getComputedStyle(imgObj).getPropertyValue('left'));
        newAlien.src = horrorAliens[indexImg];
        newAlien.style.left = `${positionAlien}px`;
        if(indexImg === 1){
            newAlien.style.top = `${parseInt(getComputedStyle(yourShip).getPropertyValue('top')) - 120}px`;
        }else{
            newAlien.style.top = `${parseInt(getComputedStyle(yourShip).getPropertyValue('top'))}px`;
        }
    }

    playArea.appendChild(newAlien);
    moveAlien(newAlien, indexImg);
}

//função para movimentar os inimigos
function moveAlien(alien, indexImg) {
    let moveAlienInterval = setInterval(() => {
        if(missions.step1.running){
            let yPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('top'));
            let sizeAreaY = parseInt(playArea.getBoundingClientRect().height) - 20;
            if(yPosition >= sizeAreaY) {
                if(Array.from(alien.classList).includes('dead-alien')) {
                    playArea.removeChild(alien); //alien.remove();
                    clearInterval(moveAlienInterval);
                } else {
                    aliensPassed++;
                    playArea.removeChild(alien); //alien.remove();
                    clearInterval(moveAlienInterval);
                    if(aliensPassed === 10)
                        gameOver('' + aliensPassed + ' aliens passaram a fronteira...\nMissão falhada!');
                }
            } else {
                alien.style.top = `${yPosition + 4}px`;
            }
        }else{
            if(missions.mission !== 3){
                let xPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'));

                if(xPosition <= 140) {
                    if(Array.from(alien.classList).includes('dead-alien')) {
                        playArea.removeChild(alien); //alien.remove();
                        clearInterval(moveAlienInterval);
                    } else {
                        aliensPassed++;
                        playArea.removeChild(alien); //alien.remove();
                        clearInterval(moveAlienInterval);
                        if(aliensPassed === 10)
                            gameOver('' + aliensPassed + ' aliens passaram a fronteira...\nMissão falhada!');
                    }
                } else {
                    alien.style.left = `${xPosition - 4}px`;
                }
            }else{
                let alienX = parseInt(window.getComputedStyle(alien).getPropertyValue('left'));
                let alienY = parseInt(window.getComputedStyle(alien).getPropertyValue('top'));
                let heroX = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'));
                let heroY = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'));

                if(indexImg === 2){
                    
                    if(alienX <= heroX + 50){
                         if(alienY <= heroY){
                            alien.style.top = `${alienY + 4}px`;
                         }else{
                            alien.src = 'img/alien2.png';
                            alien.style.left = `${heroX + 200}px`;
                            life -= 2;
                            lifeLevel.innerHTML = life;
                         }
                    }else{
                        alien.src = 'img/alien4.png';
                        alien.style.left = `${alienX - 4}px`;
                        alien.style.top = `${alienY - 2}px`;
                    }
                }else{
                    if(alienX <= heroX){
                        if(alienY <= heroY){
                            alien.style.top = `${alienY + 4}px`;
                        }else{
                            alien.style.top = `${alienY - 100}px`;
                            life--;
                            lifeLevel.innerHTML = life;
                        }
                    }else{
                        alien.style.left = `${alienX - 4}px`;
                    }
                }
            }
        }

        if(life <= 0){
            life = 0;
            clearInterval(moveAlienInterval);
        }

    }, 30);

    if(life <= 0)
        gameOver(' Você foi morto pelos aliens!');
}

//função para  colisão
function checkLaserCollision(laser, alien) {
        let laserTop = parseInt(laser.style.top);
        let laserLeft = parseInt(laser.style.left);
        let laserBottom = laserTop - 20;
        let alienTop = parseInt(alien.style.top);
        let alienLeft = parseInt(alien.style.left);
        let alienBottom = alienTop - 30;
        let alienRight = alienLeft + 150;
        if(laserLeft + 40 >= alienLeft && laserLeft <= alienRight) {
            if(laserTop <= alienTop && laserTop >= alienBottom) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
        
}

//inicio do jogo
startButton.addEventListener('click', (event) => {
    playGame();
})

function playGame() {
    if(pressJ === false){
        clearInterval(loadMusic);
        introMusic.pause();
        musicMission.play();

        startButton.style.display = 'none';
        instructionsText.style.display = 'none';
        description.style.display = 'none';
        yourShip.style.left = "40%";
        yourShip.style.top = "75%";
        window.addEventListener('keydown', flyShip);

        life = 100;

        runMission();

        if(missions.step1.running || missions.step2.running){
            playArea.classList.add(direction[indexDir]);
        }
        else if(missions.step3.running){
            insertGoalObject('img/mother-ship.png', 'img-mother-ship');
        }
        

        alienInterval = setInterval(() => {
            createAliens();
        }, 2000);
    }

}

//função de game over
function gameOver(gameOverString) {
    finishGame();

    setTimeout(() => {
        alert('game over! ' + gameOverString);
        yourShip.style.top = "250px";
        startButton.style.display = "block";
        instructionsText.style.display = "block";
        description.style.display = "block";
        playArea.classList.remove('back-animate');
        playArea.classList.add('back-default');
        distancy = 0;
        alienDead = 0;
        aliensPassed = 0;
    });
}

// Função que processa a primeira missão do jogo
function firstMission(){
        yearValue = document.getElementById('year-light');
        abatidos = document.getElementById('abatidos');
        missionNum = document.getElementById('the-mission');
        if(missions.step1.year < 1){      

            if(indexDir === 0){
                missions.step1.year++;
                yearValue.style.color = 'yellow';
            }
            else{
                missions.step1.year--;
                yearValue.style.color = 'red';
            }
        }else{
            if(alienDead >= 1){
                musicMission.pause();
                musicFinish.play();

                yearValue.style.color = 'lightblue';
                years = 0;

                insertGoalObject('img/planeta-1.png', 'img-planet-axius');

                finishGame();

                setTimeout(() => {
                    alert('Você chegou no Planeta Axius!\nViage até o planeta pressionando J');
                    pressJ = true;
                    window.addEventListener('keydown', flyShip);
                });
                
                missions.step1.running = false;
                years = 0;
                alienDead = 0;
                indexDir = 2;
                missions.mission++;
                instructionsText.innerHTML = `${missions.step2.msg}`;
            }
        }

        years = missions.step1.year;
        yearValue.innerText = years;
}

// Função que processa a segunda missão do jogo
function secondMission() {
    kmValue = document.getElementById('km-value');
    abatidos = document.getElementById('abatidos');
    missionNum = document.getElementById('the-mission');
        if(missions.step2.km < 1){      

            if(indexDir === 2){
                missions.step2.km++;
                kmValue.style.color = 'yellow';
            }
            else{
                missions.step2.km--;
                kmValue.style.color = 'red';
            }
        }else{
            if(alienDead >= 1){
                musicMission.pause();
                musicFinish.play();

                kmValue.style.color = 'lightblue';
                kmValue.innerText = distancy + "km";
                distancy = 0;

                insertGoalObject('img/mother-ship.png', 'img-mother-ship');


                finishGame();

                setTimeout(() => {
                    alert('Você encontrou a nave mãe em Axius! Algo te espera...');
                    yourShip.style.top = "250px";
                    startButton.style.display = "block";
                    instructionsText.style.display = "block";
                    description.style.display = "block";
                    playArea.classList.remove('back-animate2');
                    playArea.classList.add('back-default');
                    playArea.removeChild(imgObj);
                    musicFinish.pause();
                    introMusic.play();
                });

                missions.step2.running = false;
                distancy = 0;
                alienDead = 0;
                missions.mission++;
                instructionsText.innerHTML = `${missions.step3.msg}`;
            }
        }

        distancy = missions.step2.km;
        kmValue.innerText = distancy + "km";
}

function thirdMission(){
    abatidos = document.getElementById('abatidos');
    lifeLevel = document.getElementById('life');

    if(alienDead >= 1){
        musicMission.pause();
        musicFinish.play();

        finishGame();

        alert('A entrada está liberada!\nVá até a nave-mãe e pressione J...');
        pressJ = true;
        window.addEventListener('keydown', flyShip);
        

        alienDead = 0;
        missions.mission++;
        missions.step3.running = false;
       // instructionsText.innerHTML = `${missions.step4.msg}`;

    }
}

// Função que escolhe qual missão  executar em order 
function runMission(){
    switch(missions.mission){
        case 1: placar.innerHTML = "<h2> Abatidos: <label id='abatidos'>" + alienDead + "</label> | "
                        + "Anos-Luz: <label id='year-light'>" + years + "</label>"
                        +" | Missão: <label id='the-mission'>" + missions.mission + "</label> | Vida: <label id='life'>" + life +"</label></h2>";
                initMission = setInterval(firstMission, 500);
                playArea.classList.remove('back-default');
                playArea.classList.add('back-animate');
                missions.step1.running = true;
                break;
        case 2: placar.innerHTML = "<h2> Abatidos: <label id='abatidos'>" + alienDead + "</label> | "
                        + "Distância: <label id='km-value'>" + distancy + "km</label>"
                        +" | Missão: <label id='the-mission'>" + missions.mission + "</label> | Vida: <label id='life'>" + life +"</label></h2>";
                initMission = setInterval(secondMission, 500);
                playArea.classList.remove('back-default');
                playArea.classList.add('back-animate2');
                missions.step2.running = true;
                break;
        case 3: placar.innerHTML = "<h2> Abatidos: <label id='abatidos'>" + alienDead + "</label> | "
                        + " | Missão: <label id='the-mission'>" + missions.mission + "</label> | Vida: <label id='life'>" + life +"</label></h2>";
                initMission = setInterval(thirdMission, 500);
                playArea.classList.remove('back-default');
                playArea.classList.add('back-animate2');
                missions.step3.running = true;
                yourShip.src = 'img/shooter/player_' + personDirection + '.png';
                yourShip.style.width = '200px';
                yourShip.style.height = '200px';
                yourShip.style.top = '380px';
                break;
    }
}
 
// Função para finalizar jogo tanto no gameover quanto nas missões
function finishGame(){ 
    window.removeEventListener('keydown', flyShip); 
    clearInterval(initMission);
    initMission = null;
    clearInterval(alienInterval);
    let aliens = document.querySelectorAll('.alien');
    aliens.forEach((alien) => alien.remove());
    let lasers = document.querySelectorAll('.laser');
    lasers.forEach((laser) => laser.remove());
    playArea.classList.remove(direction[indexDir]);
}

// Inserir objeto do propósito da missão seria criar um planeta Axius para a missão 1
// Ou criar a nave mãe da missão 2
function insertGoalObject(path, classObj){
    imgObj = document.createElement('img');
    imgObj.src = path;
    if(classObj === 'img-planet-axius'){
        imgObj.style.top = '70px';
        imgObj.style.left = '200px';
    }
    imgObj.classList.add(classObj);
    playArea.appendChild(imgObj);
}

// Faz o planeta Axius dar zoom se pressionar J, como se tivesse voando
// até lá
function flyIntoPlanet(){
    let shipTop = parseInt(yourShip.style.top);
    let shipBottom = shipTop + 80;
    let shipLeft = parseInt(yourShip.style.left);
    let shipRight = shipLeft + 150;
    let planetTop = parseInt(imgObj.style.top);
    let planetBottom = planetTop + 500;
    let planetLeft = parseInt(imgObj.style.left);
    let planetRight = planetLeft + 500;

    if(shipTop >= planetTop && shipBottom <= planetBottom &&
        shipLeft >= planetLeft && shipRight <= planetRight){

        let traveling = setInterval(() => {
            let shipWidth = parseInt(yourShip.style.width);
            let shipHeight = parseInt(yourShip.style.height);

            if(shipWidth >= 0 || shipHeight >= 0){
                shipWidth--;
                shipHeight--;
                yourShip.style.width = `${shipWidth}px`;
                yourShip.style.height = `${shipHeight}px`;
            }else{
                playArea.removeChild(imgObj);
                yourShip.style.top = "250px";
                startButton.style.display = "block";
                instructionsText.style.display = "block";
                description.style.display = "block";
                playArea.classList.remove('back-animate');
                playArea.classList.add('back-default');
                pressJ = false;
                clearInterval(traveling);
                musicFinish.pause();
                introMusic.play();
            }

        }, 125);

        imgObj.classList.add('img-planet-effect');

    }else{
        alert('Você não está na coordenada do planeta Axius!\nVoe até o planeta com W, A, S ou D');
    }
}

function walkToMotherShip(){
    let motherShipX = parseInt(getComputedStyle(imgObj).getPropertyValue('left'));
    let heroX = parseInt(getComputedStyle(yourShip).getPropertyValue('left'))

    if(heroX >= motherShipX){
        playArea.removeChild(imgObj);
        yourShip.style.top = "250px";
        startButton.style.display = "block";
        instructionsText.style.display = "block";
        description.style.display = "block";
        playArea.classList.remove('back-animate2');
        playArea.classList.add('back-default');
        pressJ = false;
        musicFinish.pause();
        introMusic.play();        
    }else{
        alert('Você não está próximo a nave!\nCaminhe até a nave digitando D');
    }
}


let initMusic = () => {
    introMusic = document.getElementById('intro-music-menu');
    musicMission = document.getElementById('music-mission');
    musicFinish = document.getElementById('music-mission-finish');

    introMusic.addEventListener("ended", function(){ 
        introMusic.currentTime = 0; 
        introMusic.play(); 
    }, false);

    introMusic.play();
}

let loadMusic = setInterval(initMusic, 20);