document.getElementById("menu-btn").addEventListener("click", function(event) {
    event.preventDefault();
    const header = document.querySelector(".header");
    header.classList.toggle("active");
});


window.addEventListener("resize", function() {
    const header = document.querySelector(".header");
    const menuContainer = document.getElementById("menu-container");

    if (window.innerWidth > 768) {
        header.classList.remove("active"); 
        menuContainer.style.display = "none"; 
    } else {
        menuContainer.style.display = "none";
    }
});



document.getElementById('contacts-link').addEventListener('click', function(event) {
    event.preventDefault();
    const contactInfo = document.getElementById('contact-info');
    
    contactInfo.classList.toggle('show');
});


