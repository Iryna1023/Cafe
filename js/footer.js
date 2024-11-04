const modalFooter = document.getElementById("modalFooter");
const deliveryLink = document.getElementById("deliveryLink");
const spanFooter = modalFooter.getElementsByClassName("close")[0];

deliveryLink.onclick = function(e) {
    e.preventDefault();
    modalFooter.style.display = "block";
}

spanFooter.onclick = function() {
    modalFooter.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === modalFooter) {
        modalFooter.style.display = "none";
    }
}

document.getElementById('deliveryFormFooter').onsubmit = function(e) {
    e.preventDefault();
    this.reset();
    modalFooter.style.display = "none";
}

document.getElementById('contactToggle').addEventListener('click', function() {
    if (window.innerWidth <= 670) { 
        const contactDetails = document.querySelector('.contact__details');
        contactDetails.style.display = contactDetails.style.display === 'block' ? 'none' : 'block';
    }
});

document.getElementById('workToggle').addEventListener('click', function() {
    if (window.innerWidth <= 670) { 
        const workDetails = document.querySelector('.work__details');
        workDetails.style.display = workDetails.style.display === 'block' ? 'none' : 'block';
    }
});


