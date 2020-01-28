const mainButtons =
    `
    <a href="#" class="btn-orange__up">Sing Up</a>
    <a href="#" class="btn-orange__in">Log In</a>
    `;
const navTamplate =
    ` 
    <nav class="nav-list hidden">
        <ul>
            <li class="nav-list-item "><a class="link-setting" href="#">Account settings</a></li>
            <li class="nav-list-item "><a class="link-out" href="#">Log out</a></li>
        </ul>
    </nav>
    <h1>To do list</h1>
    `;
const formSignUp =
    `<span class="modal-overlay-close">&times;</span>
     <section class="container form-box">
        <form class="singup" action="#" method="post">
            <h3>Sign Up</h3>
            <label for="fname">First Name:</label>
            <input id="fname" type="text" required placeholder="Enter your first name">
            <br>
            <label for="lname">Last Name:</label>
            <input id="lname" type="text" required placeholder="Enter your last name">
            <br>
            <label for="email">Email:</label>
            <input id="email" type="email" required placeholder="email">
            <br>
            <label for="pass">Password:</label>
            <input id="pass" type="password" required placeholder="Create your password">
            <br>
            <label for="terms"> <input type="checkbox" checked required name="use" id="terms"> I agree to the Terms of use</label>
            <br>
            <button class="btn btn-primary" type="submit">Sign UP</button>
        </form>
     </section>
`;
const formSingIn =
    `<span class="modal-overlay-close">&times;</span>
    <section class="container form-box">
       <form  class="singin" action="#" method="post" novalidate>
        <h3>Sign In</h3>
        <label for="inemail">Email:</label>
        <input id="inemail" type="email" required placeholder="Enter your email">
        <br>
        <label for="inpass">Password:</label>
        <input id="inpass" type="password" required placeholder="Enter your password">
        <br>
        <button id ="inbtn" class="btn btn-primary" type="submit">Sign In</button>
        <p class="error hidden"></p>
       </form>
</section>
    `;
let users ;
const logIn = false;
//Create header
const body = document.querySelector("body");
const header = document.createElement("header");
const contHeader =document.createElement("div");
contHeader.className += "container";
contHeader.innerHTML = navTamplate;
header.appendChild(contHeader);
body.appendChild(header);
//Create main buttons
const contMain = document.createElement("div");
contMain.className += "container container-flex";
contMain.innerHTML = mainButtons;
body.appendChild(contMain);
//Create modal container
const contModal = document.createElement("div");
contModal.className += "modal-overlay hidden";
body.appendChild(contModal);
console.log(contModal);
//Event fot main buttons
const modal = document.querySelector(".modal-overlay");
const btnSignUp = document.querySelector(".btn-orange__up");
const btnSignIn = document.querySelector(".btn-orange__in");
const nav = document.querySelector(".nav-list");
const onPopupEscPress =  (e) => {
    if (e.key === "Escape" || e.key === "Esc") {
        closePopUp();
    }
};
const setUserStorage = (data) => {
    let sUsers = JSON.stringify(data);
    console.log (sUsers);
    localStorage.setItem('users' , sUsers);
};
const closePopUp = () => {
    modal.classList.add("hidden");
    document.removeEventListener('keydown', onPopupEscPress);
};

const popUp = (e) => {
    e.preventDefault();
    modal.classList.remove("hidden");
    if(e.target === btnSignUp) {
        modal.innerHTML = formSignUp;
        const closeModal = document.querySelector(".modal-overlay-close");
        closeModal.addEventListener('click', closePopUp);
        document.addEventListener('keydown',onPopupEscPress);
        const formUp = document.querySelector(".singup");
        const firstNameForm = document.getElementById("fname");
        const lastNameForm = document.getElementById("lname");
        const emailUpForm = document.getElementById("email");
        const passForm = document.getElementById("pass");

        formUp.addEventListener("submit", function (e) {
            e.preventDefault();
           let user = {
               firstName: firstNameForm.value,
               lastName: lastNameForm.value,
               email: emailUpForm.value,
               password: passForm.value
           };
           users = JSON.parse(localStorage.getItem('users'));
           if (!users){
               users = [];
               users.push(user);
               console.log("not users");
               setUserStorage(users);
               closePopUp();
           } else {
               users = JSON.parse(localStorage.getItem('users'));
            users.push(user);
            setUserStorage(users);
            closePopUp();
            console.log (JSON.parse(localStorage.getItem('users')));
            console.log("user exist");

           }

        });
       // console.log(errorMsg);
    } else if (e.target === btnSignIn){
        modal.innerHTML = formSingIn;
        const closeModal = document.querySelector(".modal-overlay-close");
        closeModal.addEventListener('click', closePopUp);
        document.addEventListener('keydown',onPopupEscPress);
        const formIn = document.querySelector(".singin");
        const emailIn = document.getElementById("inemail");
        const passIn = document.getElementById("inpass");
        const btnIn =document.getElementById("inbtn");
        const err = document.querySelector(".error");
        const closeErr = () => {
            err.innerHTML = "";
            err.className ="error hidden";

        };
        btnIn.addEventListener("click", function (e) {
            e.preventDefault();
            let usersData = JSON.parse(localStorage.getItem('users'));
            emailIn.addEventListener("input",closeErr);
            passIn.addEventListener("input", closeErr);
            for(const u of usersData){
                console.log(u);
                if ( emailIn.value === u.email) {
                    if (u.email === emailIn.value && u.password === passIn.value){
                        console.log("email is right");

                        closePopUp();
                    }else if (u.email === emailIn.value && u.password !== passIn.value) {
                        err.innerHTML = "Enter current password";
                        err.className ="error";
                        console.log("bad password");

                    }

                }else{
                    if (emailIn.value !== u.email ) {
                        err.innerHTML = "This user is not registered";
                        err.className ="error";
                        console.log("not user");

                    }else if (!emailIn.validity.valid){

                        err.innerHTML = "Enter current email";
                        err.className ="error";
                        console.log("bad email");

                    }else if (!passIn.validity.valid){
                        err.innerHTML = "Enter current password";
                        err.className ="error";
                        console.log("bad password");

                    }else {
                        err.innerHTML = "Enter current data";
                        err.className ="error";
                        console.log("bad data");
                    }

                }

            }



        } );

        formIn.addEventListener("submit", function (e) {

            e.preventDefault();



             closePopUp();
            });












    }
};
if(logIn){
    nav.classList.remove("hidden");
}
btnSignUp.addEventListener('click', popUp);
btnSignIn.addEventListener('click', popUp);

