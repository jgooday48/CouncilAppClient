document.getElementById('log-out').addEventListener("click", async () => {
    fetch('http://localhost:3000/tokens/' + localStorage.getItem("token"), {// token is stored locally so the entire token is added to the fetch request
        method: 'DELETE',
    })
        .then(result => result.text())
        .then(result => console.log(result))

    localStorage.removeItem("token")

})
