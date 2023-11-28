async function loadPosts() {
    const response = await fetch("http://localhost:3000/posts");

    if (response.status == 200) {
        const posts = await response.json();

        console.log("Fetched posts:", posts);

        const container = document.getElementById("posts");

        posts.forEach(p => { // posts content
            container.appendChild(p);
        });
    } else {
        console.error("Failed to fetch posts. Status:", response.status);
        window.location.assign("./index.html");
    }
}

loadPosts();
