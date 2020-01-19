let modal = document.querySelector(".modal-overlay");
const btnSignUp = document.querySelector(".btn-orange__up");
const btnSignIn = document.querySelector(".btn-orange__in");
const logIn = true;
const nav = document.querySelector(".nav-list");
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
            <label for="terms"> <input type="checkbox" required name="use" id="terms"> I agree to the Terms of use</label>
            <br>
            <button class="btn btn-primary" type="submit">Sign UP</button>
        </form>
     </section>
`;
const formSingIn =
    `<span class="modal-overlay-close">&times;</span>
    <section class="container form-box">
       <form  class="singin" action="#" method="post">
        <h3>Sign In</h3>
        <label for="inemail">Email:</label>
        <input id="inemail" type="email" required placeholder="email">
        <br>
        <label for="inpass">Password:</label>
        <input id="inpass" type="password" required placeholder="Enter your first name">
        <br>
        <button class="btn btn-primary" type="submit">Sign In</button>
       </form>
</section>
    `;
const onPopupEscPress =  (e) => {
    if (e.key === "Escape" || e.key === "Esc") {
        closePopUp();
    }
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
    } else if (e.target === btnSignIn){
        modal.innerHTML = formSingIn;
        const closeModal = document.querySelector(".modal-overlay-close");
        closeModal.addEventListener('click', closePopUp);
        document.addEventListener('keydown',onPopupEscPress);
    }
};
if(logIn){
    nav.classList.remove("hidden");
}
btnSignUp.addEventListener('click', popUp);
btnSignIn.addEventListener('click', popUp);

