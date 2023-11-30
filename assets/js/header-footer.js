class Navbar extends HTMLElement {
    connectedCallback(){
        this.innerHTML = 
        `
        <nav class="navBar">
            <img class="navLogo" src="./assets/images/Florin County Logo.png" alt="Florin county council logo">
            <ul class="itemList">
                <li class="navItem"><a href="index.html">Home</a></li>
                <li class="navItem"><a href="marketplace.html">Marketplace</a></li>
                <li class="navItem"><a href="blog.html">Skills</a></li>
                <li class="navItem"><a href="library.html">Library</a></li>
                <li class="navItem"><button class="openButton" id="myAccount">MyAccount</button></li>
            </ul>
        </nav>
        `
    }
}

class MyAccount extends HTMLElement {
    connectedCallback(){
        this.innerHTML =
        `
        <div class="popupContainer" id="login">
                <button class="exitButton">&times;</button>
                <form id="loginForm">
                    <h3>Log in</h3>
                    <label for="email">Email</label><br>
                    <input type="text" id="email" name="email" placeholder="email"><br>

                    <label for="password">Password</label><br>
                    <input type="password" id="password" name="password" placeholder="password"><br>
                    
                    <input type="submit" value="Sign in">
                    <button id="logOut"><a href="./index.html">Log out</a></button>
                    <button class="openButton" id="openRegister">Register</button>
                </form>
        </div>

        <div class="popupContainer" id="register">
                <button class="exitButton">&times;</button>
                <form id="registrationForm">
                    <h3>Name</h3>
                    <label for="name">Firstname</label>
                    <input type="text" id="name" name="name" placeholder="name"> <br>
                    <label for="surname">Surname</label>
                    <input type="text" id="surname" name="surname" placeholder="surname"> <br>

                    <h3>Details</h3>
                    <label for="email">Email</label>
                    <input type="text" id="registerEmail" name="email" placeholder="email"><br>
                    <label for="password">Password</label>
                    <input type="password" id="registerPassword" name="password" placeholder="password"><br>

                    <input type="submit" value="Confirm">
                </form>
        </div>
        `
    }
}

class Footer extends HTMLElement {
    connectedCallback(){
        this.innerHTML =
        `
        <div class="mediaIcons">
            <a href="https://rb.gy/1fi856"><i class="fa-brands fa-twitter"></i></a>
            <a href="https://rb.gy/1fi856"><i class="fa-brands fa-instagram"></i></a>
            <a href="https://rb.gy/1fi856"><i class="fa-brands fa-facebook"></i></a>
            <a href="https://rb.gy/1fi856"><i class="fa-brands fa-youtube"></i></a>
        </div>
        <div class="footerNavBar">
            <ul>
                <li><a href="https://rb.gy/1fi856">Contact Us</a></li>
                <li><a href="https://rb.gy/1fi856">Privacy</a></li>
                <li><a href="https://rb.gy/1fi856">Cookies</a></li>
                <li><a href="https://rb.gy/1fi856">Site Map</a></li>
            </ul>
        </div>
        <div class="footerBottom">
            <p>Copyright 2023 &copy; Florin Council</p>
        </div>
        `
    }
}


customElements.define('app-navbar', Navbar);
customElements.define('app-myaccount', MyAccount);
customElements.define('app-footer', Footer);