
// OPEN UP POPUP
const openButtons = document.querySelectorAll('.openButton')
openButtons.forEach(openBtn => {
    openBtn.addEventListener('click', (e) =>{
        e.preventDefault()
        let buttonClicked = e.target.id
        switch(buttonClicked){
            case 'myAccount':
                console.log('MyAccount button pressed')
                document.querySelector('.popupContainer#login').style.display = 'flex'
                break
            case 'openRegister':
                console.log('openRegister button pressed')
                document.querySelector('.popupContainer#register').style.display = 'flex'
                break
        }
    })
})

// CLOSE DOWN POPUP
const exitButtons = document.querySelectorAll('.exitButton')
exitButtons.forEach(exitBtn => {
    exitBtn.addEventListener('click', (e) =>{
        e.preventDefault()
        document.querySelector(`.popupContainer#${e.target.parentNode.id}`).style.display = 'none'
    })
});
