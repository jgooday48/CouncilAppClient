document.getElementById("registrationForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
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
    }

    try {
        const response = await fetch("http://localhost:3000/users/register", options);

        // Check if the response status is 201 (Created)
        if (response.status === 201) {
            window.location.assign("index.html");
        } else {
            // Try to parse response as JSON if possible
            let data;
            try {
                data = await response.json();
            } catch (jsonError) {
                console.error("Error parsing JSON:", jsonError);
            }

            // Check if the response contains JSON with an error property
            if (data && data.error) {
                alert(data.error);
            } else {
                console.error("Unexpected response format:", response);
            }
        }
    } catch (error) {
        console.error("Error:", error);
    }
});
