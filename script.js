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
const formNote = `
   <h2>My To-Do Lists</h2>
   <button class="btn btn-primary" type="button" id="note-create-button">Create notes</button>
   <div id="form-container">
        <form id="form" class="hidden" autocomplete="off">
          <input id="note-title" placeholder="Title" type="text">
          <input id="note-text" placeholder="Take a note..." type="text">
          <div id="form-buttons">
            <button  class="btn btn-primary" type="submit" id="submit-button">Save</button>
            <button class="btn btn-primary" type="button" id="form-close-button">Close</button>
          </div>
        </form>
      </div>
      <div id="notes"></div>
`;
// data
let users = JSON.parse(localStorage.getItem('users')) || [];
let logIn = false;
let notes = JSON.parse(localStorage.getItem('notes')) || [];
let notesTitle = "";
let notesText = "";
let notesId = "";
let userId;
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
           //users = JSON.parse(localStorage.getItem('users'));
           if (users.length === 0) {
               user.id = 0;
               users.push(user);
               setUserStorage(users);
               closePopUp();
           } else {
               //users = JSON.parse(localStorage.getItem('users'));
               user.id = users.length;
            users.push(user);
            setUserStorage(users);
            closePopUp();
            console.log (JSON.parse(localStorage.getItem('users')));
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
       // const btnIn =document.getElementById("inbtn");
        const err = document.querySelector(".error");
        const closeErr = () => {
            err.innerHTML = "";
            err.className ="error hidden";
        };
        emailIn.addEventListener("input",closeErr);
        passIn.addEventListener("input", closeErr);
        formIn.addEventListener("submit", function (e) {

            e.preventDefault();
            let usersData = JSON.parse(localStorage.getItem('users'));
            if (!emailIn.validity.valid){

                err.innerHTML = "Enter current email";
                err.className ="error";
                console.log("bad email");

            } else {
                for (const u of usersData) {
                    console.log(u);
                    if (emailIn.value === u.email) {
                        if (u.email === emailIn.value && u.password === passIn.value) {
                            console.log("email is right");
                            closePopUp();
                            logIn = true;
                            userId = u.id;
                            onLogged();
                            createDashboard();
                            contMain.classList.add("hidden");
                            //isUserLoged();
                            break;

                        } else if (u.email === emailIn.value && u.password !== passIn.value) {
                            err.innerHTML = "Enter current password";
                            err.className = "error";
                            console.log("bad password");
                            break;
                        }
                    } else {
                        err.innerHTML = "This user is not registered";
                        err.className = "error";
                        console.log("not user");
                    }
                }
            }
            });

    }
};
function onLogged () {
    if(logIn){
        nav.classList.remove("hidden");
    }
}
// create Dashboard
function createDashboard () {
    const containerDashboard = document.createElement("div");
    containerDashboard.id = "dash-container";
    containerDashboard.className += "container";
    containerDashboard.innerHTML += formNote;
    body.appendChild(containerDashboard);
    const addNote = document.getElementById("note-create-button");
    const formForAddNote = document.getElementById("form");
    const closeFormNote = document.getElementById("form-close-button");
    const saveFormNote = document.getElementById("submit-button");
    addNote.addEventListener("click", function (e) {
        e.preventDefault();
        formForAddNote.classList.remove("hidden");
    });
    closeFormNote.addEventListener("click", function (e) {
        e.preventDefault();
        formForAddNote.classList.add("hidden");
    });
    saveFormNote.addEventListener("click", function (e) {
        e.preventDefault();
        isUserLoged();
        formForAddNote.classList.add("hidden");
    })
}
// delete Dashboard
function deleteDashboard () {
    const dashboard = document.getElementById("dash-container");
    dashboard.remove();
}
btnSignUp.addEventListener('click', popUp);
btnSignIn.addEventListener('click', popUp);
if(nav){
    const linkOut = document.querySelector(".link-out");
    linkOut.addEventListener("click", function (e) {
     e.preventDefault();
     nav.classList.add("hidden");
     deleteDashboard();
     contMain.classList.remove("hidden");
     logIn = false;
    });

}
//console.log (notes, notesId, notesText, notesTitle);
function isUserLoged () {


        const $notes = document.getElementById("notes");
        const userNotes = {
            title: notesTitle,
            text : notesText,
            idnotes: notesId
        };
        const newNote = {
            idNotesUsers : userId,
            listUserNotes: []
        };
        const hasNotes = notes.length > 0;
        if(hasNotes){
            console.log(hasNotes);
        } else{
            console.log(newNote, userNotes);
            saveNotes();
            $notes.innerHTML = `console.log(${newNote})`
        }
}
function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes))
}