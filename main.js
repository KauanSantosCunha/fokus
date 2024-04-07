const html = document.querySelector('html');
const displayTempo = document.querySelector('#timer');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botaoIniciar = document.querySelector('.app__card-primary-button');
const focobt = document.querySelector('.app__card-button--foco')
const curtobt = document.querySelector('.app__card-button--curto')
const longobt = document.querySelector('.app__card-button--longo')
const botoes = document.querySelectorAll('.app__card-button')
const startbt = document.querySelector('#start-pause')
const iconstartbt = document.querySelector('#start-pause img')
const startpausebt = document.querySelector('#start-pause span')
const inputmusica = document.querySelector('#alternar-musica')
const tempoNaTela = document.querySelector('#timer')
const musica = new Audio ('sons/luna-rise-part-one.mp3')
const play = new Audio ('sons/play.wav')
const pause = new Audio ('sons/pause.mp3')
const beep = new Audio ('sons/beep.mp3')
musica.loop = true
let intervalo = null
const duracaoFoco = 1500; 
const duracaoDescansoCurto = 300; 
const duracaoDescansoLongo = 900; 
let tempoDecorridoEmSegundos = 1500


inputmusica.addEventListener('change', () =>{
    if (musica.paused){
        musica.play()
    } else {
        musica.pause()
    }
})

focobt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    mudanca('foco');
    focobt.classList.add('active');
    // html.setAttribute('data-contexto', 'foco');
    // banner.setAttribute('src', 'imagens/foco.png');
});

curtobt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    mudanca('descanso-curto');
    curtobt.classList.add('active');
    // html.setAttribute('data-contexto', 'descanso-curto');
    // banner.setAttribute('src', 'imagens/descanso-curto.png');
});

longobt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    mudanca('descanso-longo');
    longobt.classList.add('active');
    // html.setAttribute('data-contexto', 'descanso-longo');
    // banner.setAttribute('src', 'imagens/descanso-longo.png');
});

function mudanca(contexto){
    showtime()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada?<br> 
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
            case "descanso-longo":
                titulo.innerHTML = `
                Hora de voltar à superfície.<br> 
                    <strong class="app__title-strong"> Faça uma pausa longa.</strong>
                `
                break;
        default:
            break;
    }
}

const contagem = () => {
    if (tempoDecorridoEmSegundos <= 0){
        clearInterval(intervalo)
        intervalo = null
        tempoDecorridoEmSegundos = 5
        beep.play()
        alert('oks')
        startpausebt.textContent ='Começar';
        iconstartbt.setAttribute('src', 'imagens/play_arrow.png');
        return    
    } else {
        tempoDecorridoEmSegundos -= 1;
        showtime()
    }
}

startbt.addEventListener ('click' , (iniciar))

function iniciar () {
    if(intervalo){
        clearInterval(intervalo)
        intervalo = null
        startpausebt.textContent ='Começar';
        iconstartbt.setAttribute('src', 'imagens/play_arrow.png');
        pause.play()
        return
    }
    play.play()
    intervalo = setInterval(contagem, 1000)
    startpausebt.textContent ='Pausar';
    iconstartbt.setAttribute('src', 'imagens/pause.png');
}

function showtime () {
    const tempo = new Date(tempoDecorridoEmSegundos *1000)
    const tempoformatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = (`${tempoformatado}`)
}

showtime()

// titulo.innerHTML += `` se colocar o sinal de + antes do sinal de =, ele adiciona mai um texto na string ja existente na pagina, permitindo assim
// a criação de varias hipoteses comom uma lista 
// Alternando uma classe
// const element = document.getElementById('meuElemento');
// element.classList.toggle('minhaClasse');
