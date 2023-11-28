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

// let data = {
//     title: 'U-Turn',
//     text: 'We are stopping recycling'
// }

// function createInitiative(data){
//     const initiative = document.createElement('div');
//     initiative.className ='initiative'
//     const title = document.createElement("h2")
//     title.textContent = data.title
//     const text = document.createElement("p")
//     text.textContent = data.text

//     initiative.appendChild(title)
//     initiative.appendChild(text)
//     return initiative
// }

// async function loadInitiatives(){
//     const container = document.getElementById('initiatives')

//     const ini = createInitiative(data)
//     container.appendChild(ini)
// }


// loadInitiatives()
