document.getElementById('openPopUp').addEventListener('click', (e) => {
    e.preventDefault()
    document.querySelector('.register').style.display = 'none'
    document.querySelector('.login').style.display = 'flex'
})

document.getElementById('exitBtn').addEventListener('click', (e) => {
    e.preventDefault()
    document.querySelector('.login').style.display = 'none'
})
document.getElementById('exitBtn2').addEventListener('click', (e) => {
    e.preventDefault()
    document.querySelector('.register').style.display = 'none'
    document.querySelector('.login').style.display = 'flex'
})

document.getElementById('openRegister').addEventListener('click', (e) => {
    e.preventDefault()
    document.querySelector('.login').style.display = 'none'
    document.querySelector('.register').style.display = 'flex'
})

function createInitiative(){
    const initiative = document.createElement('div');
    initiative.className ='initiative'
    const title = document.createElement("h2")
    title.textContent = 'U-Turn'
    const text = document.createElement("p")
    text.textContent = 'We are stopping recyycling'

    initiative.appendChild(title)
    initiative.appendChild(text)
    return initiative
}

async function loadInitiatives(){
    const container = document.getElementById('initiatives')

    const ini = createInitiative()
    container.appendChild(ini)
}


loadInitiatives()
