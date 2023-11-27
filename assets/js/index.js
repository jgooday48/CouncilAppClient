// let loginBtn = document.getElementById('openPopUp')
// let registerBtn = document.getElementById('openRegister')
// let exitBtn = document.getElementById('exitBtn')

document.getElementById('openPopUp').addEventListener('click', () => {
    document.querySelector('.register').style.display = 'none'
    document.querySelector('.login').style.display = 'flex'
})

document.getElementById('exitBtn').addEventListener('click', () => {
    document.querySelector('.login').style.display = 'none'
})
document.getElementById('exitBtn2').addEventListener('click', () => {
    document.querySelector('.register').style.display = 'none'
    document.querySelector('.login').style.display = 'flex'
})

document.getElementById('openRegister').addEventListener('click', () => {
    document.querySelector('.login').style.display = 'none'
    document.querySelector('.register').style.display = 'flex'
})

