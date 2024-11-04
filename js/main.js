document.querySelector('.btn__buy').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('menu').scrollIntoView({
        behavior: 'smooth'
    });
});

let modalMain = document.getElementById("modalMain");
let btn = document.querySelector(".btn__buy__btn");
let span = modalMain.getElementsByClassName("close")[0];

btn.onclick = function(e) {
    e.preventDefault();
    modalMain.style.display = "block";
}

span.onclick = function() {
    modalMain.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === modalMain) {
        modalMain.style.display = "none";
    }
}

document.getElementById('deliveryForm').onsubmit = function(e) {
    e.preventDefault();
    this.reset();
    modalMain.style.display = "none";
}

const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
});

