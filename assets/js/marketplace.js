function createPostElement (data) {
    const post = document.createElement("div");
    post.className = "post";
    post.setAttribute('id', `${data["post_id"]}`);


    const image = document.createElement("div");
    image.className = "image"
    post.appendChild(image);

    const price = document.createElement("div");
    price.className = "text"
    price.textContent = `£${data["price"]}`;
    image.appendChild(price);
    

    const title = document.createElement("div");
    title.className = "title"
    title.textContent = data["post_name"];
    post.appendChild(title);

    const description = document.createElement("div");
    description.textContent = data["description"];
    post.appendChild(description);

    return post;
}




async function postBoard(){
    // const data = await fetch("http://localhost:3000/post/")
    const response = await fetch("http://localhost:3000/post/");

    if (response.status == 200) {
        const posts = await response.json();
    
        const container = document.getElementById("post-board");

        posts.forEach(p => {
            const elem = createPostElement(p);
            container.appendChild(elem);
        })
    } 
}

postBoard()