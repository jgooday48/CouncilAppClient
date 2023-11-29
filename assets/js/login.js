document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const form = new FormData(e.target);
    
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: form.get("email"),
            password: form.get("password")
        })
    }

    const response = await fetch("http://localhost:3000/users/login", options);
    const data = await response.json();

    if (response.status === 200){
        localStorage.setItem("token", data.token)
        localStorage.setItem("user_id", data.user_id)
        console.log(data.user_id)
        window.alert('You are logged in')
        window.location.assign("index.html")
    } else {
        alert(data.error);
    }
})




