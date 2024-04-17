const btnaddtask = document.querySelector('.app__button--add-task')
const formaddtask = document.querySelector('.app__form-add-task')
const textarea = document.querySelector('.app__form-textarea')
const descriptiontask = document.querySelector('.app__section-active-task-description')
const ultarefas = document.querySelector('.app__section-task-list')
const btncanceltask = document.querySelector('.app__form-footer__button--cancel')
const btndeletedtask = document.querySelector('.app__form-footer__button--delete')
const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
let taskativ = null

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
                fill="#01080E"></path>
        </svg>
    `
    const paragrafo = document.createElement('p')
    paragrafo.textContent = tarefa.descricao
    paragrafo.classList.add('app__section-task-list-item-description')

    const botao = document.createElement('button')
    botao.classList.add('app_button-edit')
    botao.onclick = () => {
        const novatarefa = prompt("qual é o nome da nova tarefa?")
        if (novatarefa){
            paragrafo.textContent = novatarefa
            tarefa.descricao = novatarefa
            upgradetask()
            return
        }      
    }

    const imagemBotao = document.createElement('img')
    imagemBotao.setAttribute('src', '/imagens/icons/edit.png')
    botao.append(imagemBotao)

    li.append(svg)
    li.append(paragrafo)
    li.append(botao)

    li.onclick = () => {
        document.querySelectorAll('.app-task-item-activo')
        .forEach(elemento =>{
            elemento.classList.remove('app-task-item-activo')
        })
        if (taskativ == tarefa){
            descriptiontask.textContent = ''
            taskativ = null
            return
        }
        descriptiontask.textContent = tarefa.descricao
        taskativ = tarefa
        li.classList.add('app-task-item-activo')
    }
    return li
}   

function upgradetask () {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

btnaddtask.addEventListener('click', () => {
    formaddtask.classList.toggle('hidden');
})

formaddtask.addEventListener('submit', (event) => {
    event.preventDefault();
    const tarefa = {
        descricao: textarea.value
    }
    tarefas.push(tarefa)
    const elementoTarefa = criarElementoTarefa(tarefa)
    ultarefas.append(elementoTarefa)
    upgradetask()
    textarea.value = ''
    formaddtask.classList.add('hidden')
})

tarefas.forEach(tarefa => {
    const elementotarefa = criarElementoTarefa(tarefa)
    ultarefas.append(elementotarefa)
});

btncanceltask.addEventListener('click', () => {
    formaddtask.classList.toggle('hidden');
})

btndeletedtask.addEventListener('click', () => {
    textarea.value = ''
    formaddtask.classList.add('hidden')
})