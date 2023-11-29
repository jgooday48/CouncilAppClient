document.getElementById("registrationForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const registrationOptions = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: form.get("name"),
            surname: form.get("surname"),
            email: form.get("email"),
            password: form.get("password")
        })
    };

    try {
        const registrationResponse = await fetch("http://localhost:3000/users/register", registrationOptions);

        // Check if the registration response status is 201 (Created)
        if (registrationResponse.status === 201) {
            // Now that the user is registered, log in immediately
            const loginOptions = {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: form.get("email"),
                    password: form.get("password")
                })
            };

            const loginResponse = await fetch("http://localhost:3000/users/login", loginOptions);
            const loginData = await loginResponse.json();

            if (loginResponse.status === 200) {
                // Successfully logged in, store the token or user information as needed
                localStorage.setItem("token", loginData.token);
                localStorage.setItem("user_id", loginData.user_id);
                console.log(loginData.user_id);
                
                // Redirect to the desired page after successful login
                window.location.assign("index.html");
                alert('You are logged in. To return to the home page, click the logo in the top right corner.')
            } else {
                alert(loginData.error);
            }
        } else {
            let registrationData;
            try {
                registrationData = await registrationResponse.json();
            } catch (jsonError) {
                console.error("Error parsing JSON:", jsonError);
            }

            if (registrationData && registrationData.error) {
                alert(registrationData.error);
            } else {
                console.error("Unexpected registration response format:", registrationResponse);
            }
        }
    } catch (error) {
        console.error("Error during registration:", error);
    }
});
